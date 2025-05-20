import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import { getUserOrders } from "../../redux/slice/orderSlice.js";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const handleClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <h2 className="mb-6 text-xl font-bold sm:text-2xl">My Orders</h2>
      <div className="overflow-x-auto shadow-md md:rounded-lg">
        <table className="min-w-full text-center text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <td className="px-4 py-2 sm:py-3">Image</td>
              <td className="px-4 py-2 sm:py-3">Order ID</td>
              <td className="px-4 py-2 sm:py-3">Created</td>
              <td className="px-4 py-2 sm:py-3">Shipping Address</td>
              <td className="px-4 py-2 sm:py-3">Items</td>
              <td className="px-4 py-2 sm:py-3">Price</td>
              <td className="px-4 py-2 sm:py-3">Status</td>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.length > 0 ? (
              orders?.data?.map((order) => (
                <tr
                  onClick={() => handleClick(order._id)}
                  key={order._id}
                  className="cursor-pointer border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 sm:px-4 sm:py-4">
                    #{order._id}
                  </td>
                  <td className="px-4 py-4">{moment(order.createdAt).format("LLL")}</td>
                  <td className="px-4 py-4">
                    {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}
                  </td>
                  <td className="px-4 py-4">{order.orderItems.length}</td>
                  <td className="px-4 py-4">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium sm:text-sm ${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyOrders;
