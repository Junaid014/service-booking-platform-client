import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PaymentForm from "./PaymentForm";
import Loading from "../../Shared/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
  const { id } = useParams();
  const location = useLocation();
  const subtotal = location.state?.subtotal; 

  const axiosSecure = useAxiosSecure();

  const { data: service, isLoading, error } = useQuery({
    queryKey: ["singleService", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (error || !service) {
    return (
      <p className="text-center text-red-500">❌ Failed to load service data</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold roboto mb-6 text-center">
        Payment for {service.title}
      </h2>

      <Elements stripe={stripePromise}>
        <PaymentForm service={service} subtotal={subtotal} />
      </Elements>
    </div>
  );
};

export default Payment;
