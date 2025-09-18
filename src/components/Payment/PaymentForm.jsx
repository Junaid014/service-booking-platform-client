import {  CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const PaymentForm = ({ service }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      //  Payment Intent 
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: service.price,
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email || "anonymous",
          },
        },
      });

      if (result.error) {
        Swal.fire("Error", result.error.message, "error");
      } else if (result.paymentIntent.status === "succeeded") {
        //  Payment save backend
        const paymentInfo = {
          serviceId: service._id,
          serviceTitle: service.title,
          buyerEmail: user.email,
          price: service.price,
          transactionId: result.paymentIntent.id,
          date: new Date(),
        };

        await axiosSecure.post("/payments", paymentInfo);

        setPaid(true);
        Swal.fire("Success", "Payment completed successfully!", "success");
       //  will be added route 
        navigate("/"); 
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong with payment", "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mt-10 mx-auto p-6 shadow-lg border border-gray-200 rounded bg-white"
    >
      <h2 className="text-xl font-semibold mb-2 text-center text-[#cc3273]">
        Payment for {service.title}
      </h2>
      <h3 className="text-lg font-medium mb-4 text-center">
        Pay ৳{service.price}
      </h3>

      {/* Stripe Card Input */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
        className="p-3 border border-gray-200 rounded mb-4"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#cc3273] hover:bg-pink-700 text-white py-2 rounded font-medium"
        disabled={!stripe || processing || paid}
      >
        {processing ? "Processing..." : paid ? "Paid" : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
