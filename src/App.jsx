import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import "./index.css";

import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Classes = lazy(() => import("./pages/Classes"));
const Event = lazy(() => import("./pages/Event"));
const CostumeRental = lazy(() => import("./pages/CostumeRental"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicies = lazy(() => import("./pages/PrivacyPolicies"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="Classes" element={<Classes />} />
        <Route path="Event" element={<Event />} />
        <Route path="Costume-Rental" element={<CostumeRental />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="Privacy-policy" element={<PrivacyPolicies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}