import { Outlet } from "react-router";
import MainFooter from "./footer";
import MainHeader from "./header";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f3ee] font-sans">
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
}
