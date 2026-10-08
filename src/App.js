 import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

import Login from "./auth/login/Login";
import Registration from "./auth/registration/Registration";

import Admin from "./admin/Admin";

function PublicWebsite() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Carousel />
        <HowItWorks />
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicWebsite />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Login />} />

      <Route
        path="/registration"
        element={<Registration />}
      />

      <Route
        path="/register"
        element={<Registration />}
      />

      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}

export default App;