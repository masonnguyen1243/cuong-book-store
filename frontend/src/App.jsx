import { Route, Routes } from "react-router-dom";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import NotFound from "~/pages/404/NotFound";
import UserLayouts from "~/components/Layouts/UserLayouts";
import Home from "~/pages/Home/Home";
import AccountVerification from "~/pages/Auth/AccountVerification";
import Protected from "~/components/Layouts/Protected";
import Books from "~/pages/Books/Books";
import About from "~/pages/About/About";
import Blog from "~/pages/Blog/Blog";
import Contact from "~/pages/Contact/Contact";
import Profile from "~/pages/Profile/Profile";
import BookDetails from "~/components/Books/BookDetails";
import Checkout from "~/pages/Checkout/Checkout";
import OrderConfirmation from "~/pages/Order/OrderConfirmation";
import OrderDetails from "~/pages/Order/OrderDetails";
import MyOrders from "~/pages/Order/MyOrders";

const App = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<Protected />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path={`/order/:id`} element={<OrderDetails />} />
        <Route path="my-orders" element={<MyOrders />} />
      </Route>

      {/* Public Routes */}
      <Route path="/" element={<UserLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Route>

      {/* Admin Routes */}

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      {/* 404 not found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
