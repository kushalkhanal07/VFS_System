import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./footer";
import Navbar from "./Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
