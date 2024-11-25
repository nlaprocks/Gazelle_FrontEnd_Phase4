  import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";
import Simulation from "../../layouts/simulation/Simulation";

export default function SimulationPage() {
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <Simulation />
      <Footer />
    </div>
  );
}
