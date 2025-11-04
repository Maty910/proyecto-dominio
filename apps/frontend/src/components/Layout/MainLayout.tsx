import { Outlet } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar"
import Footer from "./Footer"

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-16"> {}
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
