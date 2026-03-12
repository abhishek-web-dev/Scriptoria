import "../index.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Magazine from "./pages/Magazine";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Upload from "./pages/Upload";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";


function MagazineApp() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route index element={<Home />} />
        <Route path="magazine" element={<Magazine />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="upload" element={<Upload />} />
      </Routes>

      <Footer />
    </>
  );
}

export default MagazineApp;