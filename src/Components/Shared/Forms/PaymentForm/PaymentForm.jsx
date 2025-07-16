import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

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
  console.log(amountInCents, propertyId);

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
      console.log("[PaymentMethod]", paymentMethod);
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
        ...offerInfo,
        transactionId: result.paymentIntent.id,
        paidAt: new Date().toISOString(),
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("payment succeeded");
          toast.success("payment successfull");
          setProcessing(false);
        }
        console.log("payment result", result);
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
