import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar"
import Footer from "./Footer"

export default function MainLayout() {
  const location = useLocation()
  
  // 2. Detectar si estamos en la raíz ("/")
  const isHome = location.pathname === "/"

  return (
    <>
      <Navbar />
        <div className={isHome ? "pt-0" : "pt-16"}>
          <Outlet />
        </div>
      <Footer />
    </>
  )
}