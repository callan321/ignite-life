import { Outlet } from "react-router";

// TODO : draft admin header

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f3ee] font-sans">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
