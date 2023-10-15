import { Outlet } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";
import { Wave } from "../components/animations/Wave";


export const LogInLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {!isLoggedIn && (
        <main className="h-screen w-screen flex items-start md:items-center justify-center pt-10 md:p-0 relative">
          <Outlet />
          <div className="fixed bottom-0 w-full bg-green-700">
            {/* <Wave /> */}
          </div>
        </main>
      )}
    </>
  );
};
