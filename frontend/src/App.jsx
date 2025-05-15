import { Route, Routes } from "react-router-dom";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import NotFound from "~/pages/404/NotFound";
import UserLayouts from "~/components/Layouts/UserLayouts";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Routes>
      {/* Protected Routes */}

      {/* Public Routes */}
      <Route path="/" element={<UserLayouts />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Admin Routes */}

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 not found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
