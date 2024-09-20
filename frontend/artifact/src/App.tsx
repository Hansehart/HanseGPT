import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import React from "react";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;