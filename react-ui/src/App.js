import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Kinase from "./pages/Kinase";
import NavBar from "./components/Navbar/NavBar";
import AlphaFold from "./components/Kinase/AlphaFold";

function App() {
  return (
    <React.Fragment>
      
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kinase/:kinase" element={<Kinase />} />
          <Route path="/alpha" element={<AlphaFold />} />
          {/* <Route path="/search" element={<NavBar/>} /> */}
          {/* <Route path="/faq" element={<Faq />} />
          <Route path="/contact-us" element={<Contact />} /> */}
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
