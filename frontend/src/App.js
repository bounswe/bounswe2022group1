import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Profile from "./components/profile/Profile";
import Homepage from "./components/homepage/Homepage";
import Logout from "./components/logout/Logout";
import TextContentsPage from "./components/content/TextContentsPage";

import { ReactComponent as Logo } from "./BUdemi.svg";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/homepage"}>
              <div className="logo_m">
                <Logo style={{ height: "100px", width: "90px" }} />
              </div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/profile"}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/logout"}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/text-content" element={<TextContentsPage />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
