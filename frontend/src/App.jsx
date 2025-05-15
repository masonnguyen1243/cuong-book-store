import { Route, Routes } from "react-router-dom";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import NotFound from "./pages/404/NotFound";

const App = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route>
        <Route />
      </Route>

      {/* Public Routes */}

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 not found page */}
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};

export default App;
