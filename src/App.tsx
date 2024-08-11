import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/Product";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import "./styles/main.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
