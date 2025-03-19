import { Outlet } from "react-router";
import Header from "~/layouts/Header";
import Footer from "~/layouts/Footer";


export default function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f6f3ee]">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
