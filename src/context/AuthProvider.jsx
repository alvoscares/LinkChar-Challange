import { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthenticationApi from "../api/services/Authentication";
import AccountApi from "../api/services/Account";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
    const searchParams = new URLSearchParams(location.search);
    const requestToken = searchParams.get("request_token");
    const approved = searchParams.get("approved");
    const denied = searchParams.get("denied");

    if (denied === "true") {
      setAlert({
        error: true,
        msg: "Access request was denied",
      });
      setIsLoading(false);
      navigate("/");
      return;
    }

    if (approved === "true") {
      setIsLoading(true);
      setAlert({});
      fetchCreateSession(requestToken);
    }
  }, [location.search]);

  const fetchCreateRequestToken = async () => {
    setIsLoading(true);
    const response = await AuthenticationApi.getCreateRequestToken();
    let requestToken = response.request_token;

    if (!response.success) {
      setAlert({
        error: true,
        msg: response.msg,
      });
      setIsLoading(false);
      navigate("/");
      return;
    }

    const currentURL = window.location.href;
    const redirecUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${currentURL}`;

    window.location.href = redirecUrl;
  };

  const fetchCreateSession = async (requestToken) => {
    setIsLoading(true);
    const response = await AuthenticationApi.postCreateSession(requestToken);
    if (!response.success) {
      setAlert({
        error: true,
        msg: response.msg,
      });
      setIsLoading(false);
      navigate("/");
      return;
    }
    fetchDetails(response.session_id);
  };

  const fetchCreateGuestSession = async () => {
    setIsLoading(true);
    const response = await AuthenticationApi.getCreateGuestSession();
    if (!response.success) {
      setAlert({
        error: true,
        msg: response.msg,
      });
      setIsLoading(false);
      navigate("/");
      return;
    }
    setGuestSessionId(response.guest_session_id);
    setIsLoggedIn(true);
    navigate("/movies");
    setIsLoading(false);
  };

  // If getDetail returns an error it is because the session requestToken has expired.
  const fetchDetails = async (session_id) => {
    const response = await AccountApi.getDetails(session_id);

    if (!response?.success) {
      setIsLoading(false);
      clearStates();
      navigate("/");
    }
    setSessionId(session_id);
    localStorage.setItem("session_id", session_id);
    setDetails(response);
    setIsLoggedIn(true);
    navigate("/movies");
  };

  const fetchDeleteSession = async () => {
    await AuthenticationApi.deleteSession(sessionId);

    clearStates();
    navigate("/");
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
        alert
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
