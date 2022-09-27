import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../components/shared/Navbar/Navbar";
import { Auth } from "../auth/Auth";
import { About, ComponentsPage, Home } from "./main-pages";

export const User = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="components-page" element={<ComponentsPage />} />
        <Route path="auth/*" element={<Auth />} />
      </Routes>
    </div>
  );
};
