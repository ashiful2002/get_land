import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../../../Components/Shared/Forms/PaymentForm/PaymentForm";
import Section from "../../../../Components/Section/Section";

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
// console.log(offerInfo);

  if (isLoading) return <p>Loading...</p>;

  // ============ stripe starts ======  ======

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Section>
          <h2 className="text-xl text-center">
            Pay for:
            <span className="text-primary font-semibold">
              {offerInfo.title}
            </span>
          </h2>
          <PaymentForm offerInfo={offerInfo} />
        </Section>
      </Elements>
    </div>
  );
};
export default Payment;
