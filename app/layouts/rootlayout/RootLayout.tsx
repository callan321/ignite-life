import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f3ee] font-sans">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
