import { Outlet, Navigate } from "react-router-dom";

import useAuth from "../utils/hooks/useAuth";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const MainLayout = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <div className="font-sans h-screen  flex flex-col w-full overflow-hidden">
          <Header />
          <div className=" md:flex items-start justify-normal h-full w-full ">
            <Sidebar />
            <main className=" h-full md:w-auto px-6 md:pr-11 md:pl-20 py-7 flex-1 w-full overflow-x-hidden scrollbar-hide ">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
