import { Outlet, useLocation } from "react-router-dom"
import Footer from "./Footer"

export default function MainLayout() {
  const location = useLocation()
  
  // 2. Detectar si estamos en la raíz ("/")
  const isHome = location.pathname === "/"

  return (
    <>
        <div className={isHome ? "pt-0" : "pt-16"}>
          <Outlet />
        </div>
      <Footer />
    </>
  )
}