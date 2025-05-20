import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "~/redux/slice/checkoutSlice";
import PayPalButton from "./PaypalButton";
import { useEffect, useState } from "react";
import authorizedAxiosInstance from "~/utils/authorizedAxios";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart || !cart.data.books || cart.data.books.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    if (cart && cart.data.books.length > 0) {
      const response = await dispatch(
        createCheckout({
          checkoutItems: cart.data.books,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.data.totalPrice,
        }),
      );

      if (response.payload && response.payload.data._id) {
        setCheckoutId(response.payload.data._id);
      }

      console.log(response.payload.data._id);
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await authorizedAxiosInstance.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, {
        paymentStatus: "Paid",
        paymentDetails: details,
      });

      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await authorizedAxiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`);

      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 tracking-tighter lg:grid-cols-2">
      {/* Left section */}
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-6 text-2xl uppercase">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="mb-4 text-lg">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user ? user.data.user.email : ""}
              className="w-full rounded border p-2"
              disabled
            />
          </div>
          <h3 className="mb-4 text-lg">Delivery</h3>
          {/* Firstname Lastname */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full rounded border p-2"
              />
            </div>
          </div>
          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full rounded border p-2"
              required
            />
          </div>
          {/* City */}
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  city: e.target.value,
                })
              }
              className="w-full rounded border p-2"
            />
          </div>
          {/* Country */}
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full rounded border p-2"
              required
            />
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-6">
            {!checkoutId ? (
              <button type="submit" className="w-full rounded bg-black py-3 text-white">
                Continue to payment
              </button>
            ) : (
              <div>
                {/* Paypal Component */}
                <PayPalButton
                  amount={cart.data.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed. Try again")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right section */}
      <div className="rounded-lg bg-gray-50 p-6">
        <h3 className="mb-4 text-lg">Order Summary</h3>
        <div className="mb-4 border-t py-4">
          {cart?.data?.books.map((book, index) => (
            <div key={index} className="flex items-start justify-between border-b py-2">
              <div className="flex items-start">
                <img src={book.image} alt={book.name} className="mr-4 h-24 w-20 object-cover" />
                <div>
                  <h3 className="text-md">{book.name}</h3>
                </div>
              </div>
              {book.discountPrice ? (
                <p className="text-xl">${book.discountPrice?.toLocaleString() * book.quantity}</p>
              ) : (
                <p className="text-xl">${book.price?.toLocaleString() * book.quantity}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mb-4 flex items-center justify-between text-lg">
          <p className="">Subtotal</p>
          <p className="">${cart.data.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-4 text-lg">
          <p>Total</p>
          <p>${cart.data.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
