import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Kinase from "./pages/Kinase";
import Navbar from "./components/Navbar/NavBar";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kinase/:kinase" element={<Kinase />} />
          {/* <Route path="/faq" element={<Faq />} />
          <Route path="/contact-us" element={<Contact />} /> */}
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
