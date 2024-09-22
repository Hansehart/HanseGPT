import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Construction from "./pages/Construction";
import License from "./pages/License";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/license" element={<License />} />
            <Route path="/imprint" element={<Construction />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/gtc" element={<Construction />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;