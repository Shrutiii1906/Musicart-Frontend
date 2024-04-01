import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import InvoicePage from './pages/Invoice/InvoicePage';
import OrderConfirmPage from './pages/OrderConfirm/OrderConfirmPage';
import PlaceOrderPage from './pages/PlaceOrder/PlaceOrderPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import ViewCartPage from "./pages/ViewCart/ViewCartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/invoice" element={<InvoicePage />} /> { /* another route with /invoice/:id could be there */}
        <Route path="/orderconfirm" element={<OrderConfirmPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        <Route path="/view-cart" element={<ViewCartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;