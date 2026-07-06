import { Outlet } from "react-router-dom";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white" style={{ backgroundColor: "#fff" }}>
      <PublicHeader />
      <main className="min-h-screen overflow-hidden bg-white">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
