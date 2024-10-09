import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AppRoutes from "./components/route/AppRoutes";
import Auth from "./components/auth/Auth";
import "./styles/main.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          path="*"
          element={
            <Layout>
              <AppRoutes />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
