import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../components/shared/Navbar/Navbar";
import { About, ComponentsPage, Home } from "./main-pages";

export const User = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="components-page" element={<ComponentsPage />} />
      </Routes>
    </div>
  );
};
