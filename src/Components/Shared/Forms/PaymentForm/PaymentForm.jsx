import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const PaymentForm = ({ offerInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  const amount = offerInfo.offerAmount;
  const amountInCents = amount * 100;
  const propertyId = offerInfo.propertyId;
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  // console.log(amountInCents, propertyId);

  // console.log(offerInfo.propertyId);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });
  // console.log(properties);

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      setError("");
      // console.log("[PaymentMethod]", paymentMethod);
      // step 2, payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        propertyId,
      });

      const clientSecret = res.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      await axiosSecure.put(`/payment/${offerInfo.propertyId}/paid`, {
        transaction_Id: result.paymentIntent.id,
        paidAt: new Date().toISOString(),
        propertyId: offerInfo.propertyId,
        title: offerInfo.title,
        agent_name: offerInfo.agent_name,
        buyerEmail: user.email,
        buyerName: user.displayName,
        offerAmount: offerInfo.offerAmount,
      });

      // await axiosSecure.patch("/properties")
      const patchRes = await axiosSecure.patch(
        `/make-offer/${offerInfo.propertyId}`,
        {
          status: "bought",
          transaction_Id: result.paymentIntent.id,
        }
      );
      // console.log(patchRes);

      if (patchRes.data.acknowledged) {
        toast.success("Status updated to bought");
      } else {
        toast.error("Failed to update offer status");
      }

      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("payment succeeded");
          toast.success("payment successfull");
          setProcessing(false);
          await axiosSecure.delete(`/make-offer/${propertyId}`);
          await axiosSecure.delete(`/wishlist/${propertyId}`);
        }
        // console.log("payment result", result);
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-6  rounded-xl shadow-xl dark:bg-gray-800">
      <form onSubmit={handleCardSubmit} className="space-y-5">
        <div className="border p-3 rounded-md shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  fontFamily: "monospace",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          className="w-full btn btn-primary py-2 px-4"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : `Pay $${offerInfo.offerAmount}`}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
