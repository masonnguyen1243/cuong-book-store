import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const OrderConfirmation = () => {
  const { checkout } = useSelector((state) => state.checkout);
  console.log("🚀 ~ OrderConfirmation ~ checkout:", checkout);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 5);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="mx-auto mb-[100px] mt-[50px] max-w-4xl bg-white p-6">
      <h1 className="mb-8 text-center text-4xl font-bold text-emerald-700">Thank you for your order!</h1>

      {checkout.data && (
        <div className="rounded-lg border p-6">
          <div className="mb-20 flex justify-between">
            {/* Order Id and Date */}
            <div>
              <h2 className="text-xl font-semibold">Order Id: {checkout.data._id}</h2>
              <p className="text-gray-500">Order Date: {moment(checkout.data.createdAt).format("LLLL")}</p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-sm text-emerald-700">
                Estimated Delivery: {calculateEstimatedDelivery(checkout.data.createdAt)}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-20">
            {checkout.data.checkoutItems.map((item) => (
              <div key={item.productId} className="mb-4 flex items-center">
                <img src={item.image} alt={item.name} className="mr-4 h-16 w-16 rounded-md object-cover" />
                <div>
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-lg">${item.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment and Delivery Info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment info */}
            <div>
              <h4 className="mb-2 text-lg font-semibold">Payment</h4>
              <p className="text-gray-600">PayPal</p>
            </div>

            {/* Delivery info */}
            <div>
              <h4 className="mb-2 text-lg font-semibold">Delivery</h4>
              <p className="text-gray-600">{checkout.data.shippingAddress.address}</p>
              <p className="text-gray-600">
                {checkout.data.shippingAddress.city}, {checkout.data.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderConfirmation;
