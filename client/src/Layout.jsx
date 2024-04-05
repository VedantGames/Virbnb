import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return(
        <div>
            <div className="py-6 px-20 flex flex-col min-h-screen">
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}