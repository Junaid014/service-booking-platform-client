import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const PaymentForm = ({ service, subtotal }) => {
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
      console.log("💰 Sending price to backend:", subtotal);


      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: subtotal,
      });

      console.log("🧾 Client secret from backend:", data);

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email || "anonymous",
          },
        },
      });

      console.log("✅ Payment result:", result);

      if (result.error) {
        Swal.fire("Error", result.error.message, "error");
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentInfo = {
          serviceId: service._id,
          serviceTitle: service.title,
          buyerEmail: user.email,
          providerEmail: service.userEmail,
          price: subtotal,
          transactionId: result.paymentIntent.id,
          date: new Date(),
         
        };

        console.log("💾 Saving payment info:", paymentInfo);

        await axiosSecure.post("/payments", paymentInfo);

        setPaid(true);
        Swal.fire("Success", "Payment completed successfully!", "success");
        navigate("/dashboard/paymentHistory");
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
      <h3 className="font-semibold roboto mb-4 text-center">
        Pay {subtotal} $
      </h3>

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

      <button
        type="submit"
        className="w-full cursor-pointer bg-[#cc3273] hover:bg-pink-700 text-white py-2 rounded font-medium"
        disabled={!stripe || processing || paid}
      >
        {processing ? "Processing..." : paid ? "Paid" : "Pay Now"}
      </button>
    </form>
  );
};


export default PaymentForm;
