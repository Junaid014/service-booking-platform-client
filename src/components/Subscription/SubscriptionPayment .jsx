// import { useLocation } from "react-router";

// const SubscriptionPayment = () => {
//   const { state } = useLocation();
//   const plan = state?.plan;
//   const email = state?.email;

//   if (!plan) return <p className="text-center mt-20 text-red-500">No plan selected!</p>;

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg text-center">
//       <h1 className="text-2xl font-bold mb-4">Subscribe to {plan.name}</h1>
//       <p className="mb-2">Price: ${plan.price}</p>
//       <p className="mb-2">Discount: {plan.discount}</p>
//       <p className="mb-4">Subscriber: {email}</p>
//       <button className="bg-pink-600 text-white py-2 px-4 rounded">
//         Confirm Subscription
//       </button>
//     </div>
//   );
// };

// export default SubscriptionPayment;
