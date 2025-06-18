import { Outlet } from "react-router";

// TODO
export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f3ee] font-sans">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
