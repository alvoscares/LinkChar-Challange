import { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import AuthenticationApi from "../api/services/Authentication";
import AccountApi from "../api/services/Account";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Router
  const navigate = useNavigate();
  const location = useLocation();
  const [param] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({});

  // Authentication
  const [sessionId, setSessionId] = useState("");
  const [guestSessionId, setGuestSessionId] = useState("");

  // Account
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const session_id = localStorage.getItem("session_id");
    if (!session_id) {
      setIsLoading(false);
      navigate("/");
      return;
    }

    setIsLoggedIn(true);
    fetchDetails(session_id);
  }, []);

  useEffect(() => {
    const requestToken = param.get("request_token") ?? "";
    const approved = param.get("approved") === "true";
    const denied = param.get("denied") === "true";

    if (denied) {
      setAlert({
        error: true,
        msg: "Access request was denied",
      });
      setIsLoading(false);
      navigate("/");
      return;
    }

    if (approved) {
      setIsLoading(true);
      setAlert({});
      fetchCreateSession(requestToken);
    }
  }, [location.search]);

  const fetchCreateRequestToken = async () => {
    setIsLoading(true);

    try {
      const { data } = await AuthenticationApi.getCreateRequestToken();

      let requestToken = data.request_token;
      const currentURL = window.location.href;

      const redirecUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${currentURL}`;

      window.location.href = redirecUrl;
    } catch (error) {
      setAlert({
        error: true,
        msg: error.response.data.status_message,
      });
      navigate("/");
    }
  };

  const fetchCreateSession = async (requestToken) => {
    setIsLoading(true);
    try {
      const { data } = await AuthenticationApi.postCreateSession(requestToken);

      fetchDetails(data.session_id);
    } catch (error) {
      setAlert({
        error: true,
        msg: error.response.data.status_message,
      });
      navigate("/");
    }
  };

  const fetchCreateGuestSession = async () => {
    setIsLoading(true);
    try {
      const {data} = await AuthenticationApi.getCreateGuestSession();
      setGuestSessionId(data.guest_session_id);
      setIsLoggedIn(true);
      navigate("/movies");
    } catch (error) {
      setAlert({
        error: true,
        msg: error.response.data.status_message,
      });
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  // If getDetail returns an error it is because the session requestToken has expired.
  const fetchDetails = async (session_id) => {
    try {
      const { data } = await AccountApi.getDetails(session_id);

      setSessionId(session_id);
      localStorage.setItem("session_id", session_id);
      setDetails(data);
      setIsLoggedIn(true);
      const lastPath = localStorage.getItem("lastPath") || "/movies";
      navigate(lastPath);
    } catch (error) {
      setIsLoading(false);
      clearStates();
      navigate("/");
    } finally {
      setIsLoading(false)
    }

  };

  const fetchDeleteSession = async () => {
    try {
      await AuthenticationApi.deleteSession(sessionId);
      clearStates();
      navigate("/");
    } catch (error) {
      setAlert({
        error: true,
        msg: error.response.data.status_message,
      });
    }
  };

  const clearStates = () => {
    setIsLoggedIn(false);
    setIsLoggedIn(false);
    setSessionId("");
    setGuestSessionId("");
    setDetails({});
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        fetchCreateRequestToken,
        isLoading,
        isLoggedIn,
        fetchDeleteSession,
        fetchCreateGuestSession,
        details,
        sessionId,
        alert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
