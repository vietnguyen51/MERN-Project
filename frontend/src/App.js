import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SummaryApi from "./common/index";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const hideFooter = location.pathname.startsWith("/admin-panel");

  return (
      <div>
        <Context.Provider value={{ fetchUserDetails }}>
          <ToastContainer />
          <Header />
          <main>
            <Outlet />
          </main>
          {!hideFooter && <Footer />}
        </Context.Provider>
      </div>
  );
}

export default App;