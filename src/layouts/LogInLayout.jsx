import { Outlet } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";

export const LogInLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {!isLoggedIn && (
        <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
          <div className="md:w-2/3 lg:w-2/5 text-center">
            <Outlet />
          </div>
        </main>
      )}
    </>
  );
};
