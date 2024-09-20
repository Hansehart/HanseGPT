import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Meta from "./Meta";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Meta />
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
