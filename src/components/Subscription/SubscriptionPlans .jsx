import { useState } from "react";
import { Check, Crown, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const plans = [
  {
    name: "Silver",
    price: 9.99,
    discount: "5%",
    features: [
      "Basic discount on all services",
      "Standard customer support",
      "Monthly renewal",
    ],
    icon: <Zap className="w-10 h-10 text-gray-400" />,
    gradient: "from-gray-50 to-gray-100",
    borderColor: "border-gray-300",
    button: "bg-gray-700 hover:bg-gray-800",
    planId: "silver",
  },
  {
    name: "Gold",
    price: 19.99,
    discount: "10%",
    features: [
      "Higher discount on all services",
      "Priority support response",
      "Monthly renewal",
    ],
    icon: <Star className="w-10 h-10 text-yellow-500" />,
    gradient: "from-yellow-50 to-amber-100",
    borderColor: "border-yellow-400",
    button: "bg-yellow-500 hover:bg-yellow-600",
    planId: "gold",
    tag: "Most Popular",
  },
  {
    name: "Platinum",
    price: 39.99,
    discount: "15%",
    features: [
      "Maximum discount on all services",
      "Top-tier VIP support",
      "Exclusive premium deals",
    ],
    icon: <Crown className="w-10 h-10 text-indigo-500" />,
    gradient: "from-indigo-50 to-indigo-100",
    borderColor: "border-indigo-400",
    button: "bg-indigo-600 hover:bg-indigo-700",
    planId: "platinum",
  },
];

const SubscriptionPlans = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = async (plan) => {
    if (!user?.email) {
  navigate(`/auth/login?redirect=/subscription?plan=${plan.planId}`);
      return;
    }

    try {
      setSelectedPlan(plan.planId);

      const payload = {
        planId: plan.planId,
        name: plan.name,
        price: plan.price,     
        discount: plan.discount, 
        email: user?.email,
      };

      const res = await axiosSecure.post("/subscription/create-checkout-session", payload);
      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        setSelectedPlan(null);
        alert("Failed to create checkout session. Try again.");
      }
    } catch (err) {
      console.error("Create checkout error:", err);
      setSelectedPlan(null);
      alert("Something went wrong while creating checkout session.");
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto px-3   md:mt-6 md:px-0">
      <h1 className="text-xl md:text-4xl font-bold text-start md:mb-4 mb-2 text-gray-800">
        Choose Your <span className="text-pink-600">Plan</span>
      </h1>

      <p className="text-start text-gray-500 md:mb-12 mb-7 text-sm md:text-base">
        Unlock premium discounts and exclusive perks with our monthly memberships.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-gradient-to-br ${plan.gradient} rounded-3xl shadow-lg border ${plan.borderColor} p-6 md:p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}
          >
            {plan.tag && (
              <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                {plan.tag}
              </span>
            )}

            <div className="mb-4">{plan.icon}</div>

            <h2 className="text-xl md:text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-2xl md:text-3xl font-bold mb-1">${plan.price}</p>
            <p className="text-gray-600 mb-4 text-xs md:text-sm">per month</p>

            <div className="mb-5">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold text-xs md:text-sm shadow-md animate-pulse">
                🎉 Save {plan.discount} on all services!
              </div>
            </div>

            <ul className="space-y-2 mb-6 text-gray-700 text-xs md:text-sm">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan)}
              disabled={selectedPlan === plan.planId}
              className={`w-full py-2 md:py-3 text-white cursor-pointer rounded-xl font-semibold shadow-md text-sm md:text-base ${plan.button}`}
            >
              {selectedPlan === plan.planId ? "Redirecting..." : "Subscribe Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
