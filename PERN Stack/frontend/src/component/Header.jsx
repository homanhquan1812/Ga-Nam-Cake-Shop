import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../store/store";
import { ModelFormReservation } from "./ModelFormReservation";

export const Header = () => {
  const [user, setUser] = useState({});
  const { dispatch } = useContext(StoreContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const navigateTo = useNavigate();

  const isJwtExpired = (token) => {
    if (!token) return true;
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    try {
      const payload = JSON.parse(atob(parts[1]));
      if (!payload.exp) return false;
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "CLEAR_USER" });
    setIsLoggedIn(false);
    setUser({});
    navigateTo("/home");
  };

  const checkTokenAndLoginStatus = () => {
    const token = localStorage.getItem("token");
    if (token && !isJwtExpired(token)) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        dispatch({ type: "SET_USER", payload: decodedToken });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }
    } else {
      setIsLoggedIn(false);
      setUser({});
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    checkTokenAndLoginStatus();

    const intervalId = setInterval(checkTokenAndLoginStatus, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleOpenReservation = () => {
    setOpenForm(true);
  };

  const handleCloseReservation = () => {
    setOpenForm(false);
  };

  return (
    <div>
      <header className="contact_header">
        <nav className="navbar navbar-expand-lg navbarGaNam">
          <div className="container header__content">
            <img
              style={{ width: "50px", height: "50px", marginRight: "20px" }}
              src="../../img/logo.png"
              alt="Chicken Mushroom Logo"
            />
            <a className="navbar-brand logo" href="home">
              CHICKEN MUSHROOM
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#GaNamNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse navigation" id="GaNamNav">
              <ul style={{ fontSize: "20px" }} className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/home">
                    HOME
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/menu">
                    MENU
                  </a>
                </li>
                {isLoggedIn && (
                  <li className="nav-item">
                    <a className="nav-link" href="/history">
                      HISTORY
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a className="nav-link" href="/feedback">
                    FEEDBACK
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    ABOUT
                  </a>
                </li>
                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <a className="nav-link active" href="#">
                        {user.full_name || "User"}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/cart">
                        <i className="fa-solid fa-cart-shopping" />
                      </a>
                    </li>
                  </>
                )}
                {isLoggedIn ? (
                  <li className="nav-item">
                    <button className="btnLogin-popup" onClick={handleLogout}>
                      LOGOUT
                    </button>
                  </li>
                ) : (
                  <li className="nav-item">
                    <button
                      className="btnLogin-popup"
                      onClick={() => (window.location.href = "/login")}
                    >
                      LOGIN
                    </button>
                  </li>
                )}
                <li className="nav-item d-flex justify-content-center align-items-center ml-2">
                  <button
                    className="btn btn-primary"
                    onClick={handleOpenReservation}
                  >
                    RESERVATION
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {openForm && (
        <ModelFormReservation
          isOpen={openForm}
          onClose={handleCloseReservation}
        />
      )}
    </div>
  );
};
