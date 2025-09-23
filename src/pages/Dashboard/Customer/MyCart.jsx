import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const MyCart = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    const filtered = stored.filter((item) => item._id === id);
    setCart(filtered);
  }, [id]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-[1360px] mx-auto px-3 md:px-6 mt-20 mb-8 flex flex-col md:flex-row gap-6">
      {/* Left side - Cart Items */}
      <div className="flex-1 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">My Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border-b py-4">
              <img src={item.image} alt={item.title} className="w-20 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  ${item.price} × {item.quantity} | Date: {item.date}
                </p>
              </div>
              <p className="font-semibold text-[#cc3273]">
                ${item.price * item.quantity}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Right side - Summary */}
      <div className="w-full md:w-1/3 bg-gray-50 rounded-xl shadow p-6 h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <p className="flex justify-between text-sm mb-2">
          <span>Subtotal ({cart.length} items)</span>
          <span>${subtotal}</span>
        </p>
        <p className="flex justify-between text-sm mb-4">
          <span>Total Fee</span>
          <span>${subtotal}</span>
        </p>
        <button
          onClick={() =>
            navigate(`/payment/${id}`, { state: { subtotal, service: cart[0] } })
          }
          className="w-full py-2 cursor-pointer bg-[#cc3273] text-white rounded-lg font-medium shadow-md hover:bg-pink-700 transition-colors"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default MyCart;
