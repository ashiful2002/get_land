import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../../../Components/Shared/Forms/PaymentForm/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: offerInfo, isLoading } = useQuery({
    queryKey: ["offer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/make-offer/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  console.log(offerInfo);

  // ============ stripe starts ======  ======

  return (
    <div>
      <Elements stripe={stripePromise}>
        <h1>Pay for {offerInfo.title}</h1>
        <p>Offer amount: ${offerInfo.offerAmount}</p>
        <PaymentForm offerInfo={offerInfo} />
      </Elements>
    </div>
  );
};
export default Payment;
