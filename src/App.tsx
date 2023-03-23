import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout/Layout";
import PaymentPage from "./page/PaymentPage";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import ManPage from "./page/ManPage";
import WomanPage from "./page/WomanPage";
import DetailProductPage from "./page/DetailProductPage";
import HomePageLayout from "./layout/Layout/HomePageLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePageLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/man" element={<ManPage />} />
            <Route path="/woman" element={<WomanPage />} />
          </Route>
          <Route path="/product/:id" element={<DetailProductPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
      </Routes>
      <ToastContainer
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </BrowserRouter>
  );
}

export default App;
