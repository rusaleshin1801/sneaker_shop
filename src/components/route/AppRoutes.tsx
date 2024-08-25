import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Item from "../item/Item";
import Cart from "../cart/Cart";
import NotFound from "../../pages/NotFound";
import PrivateRoute from "../privateRoute/PrivateRoute";

const AppRoutes = () => (
  <Routes>
    <Route element={<PrivateRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Item />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
