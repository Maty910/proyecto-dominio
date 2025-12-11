import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "./components/Layout/MainLayout"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import { RegisterPage } from "./Pages/RegisterPage"
import RoomsPage from "./Pages/RoomsPage"
import ContactPage from "./Pages/ContactPage"
import AboutPage from "./Pages/AboutPage"
import { ReservationsPage } from "./Pages/ReservationsPage"
import ChatAssistant from "./components/ChatAssistant/ChatAssistant"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatAssistant />
    </BrowserRouter>
  )
}
