import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchCurrentUser } from "../../features/auth/store/authSlice";
import { useAppDispatch } from "../store/hooks";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./public-header/PublicHeader";

export function PublicLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

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
