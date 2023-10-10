import useAuth from "../utils/hooks/useAuth";

import { Spinner } from "../components/Spinner";

export const Login = () => {
  const { fetchCreateRequestToken, fetchCreateGuestSession, isLoading } = useAuth();

  return (
    <div className="inline-block m-auto ">
      <h1 className="text-6xl font-axiforma-bold text-white text-center ">
        LinkChar
        <div className="h-2 bg-gradient-to-r from-pink-500 to-red-500 animate-pulse" />
      </h1>
      <p className="text-white text-sm text-left mt-4 mb-7">
        Challenge by:
        <span className="text-base">{` `}Álvaro Oscares Robles</span>
      </p>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="text-white md:text-xl flex flex-col gap-y-4">
            {/* <button type="button" className="bg-green-700" onClick={fetchCreateRequestToken}>
              Iniciar sesion
            </button> */}
            <h2 className="md:hover:text-2xl duration-300 cursor-pointer md:hover:underline" onClick={fetchCreateRequestToken}>Log In</h2>
            <h2 className="md:hover:text-2xl duration-300 cursor-pointer md:hover:underline" onClick={fetchCreateGuestSession}>Enter as a Guest</h2>
        </div>
      )}
    </div>
  );
};
