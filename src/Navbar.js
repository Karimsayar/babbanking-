import * as React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [currentPage, setCurrentPage] = React.useState("CreateAccount");
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    setCurrentPage(location.pathname.slice(1));
  }, [location]);

  function getDescription(item) {
    switch (item) {
      case "createAccount":
        return "Create a new account";
      case "login":
        return "Log in to your account";
      case "deposit":
        return "Make a deposit";
      case "withdraw":
        return "Withdraw funds";
      case "allData":
        return "View all data";
      default:
        return "";
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link
          to={"/"}
          className="navbar-brand"
          onClick={() => setCurrentPage("Home")}
        >
          Bad Bank
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li
              className={`nav-item`}
            >
              <Link
                to={"/createAccount"}
                className={`nav-link ${currentPage === "createAccount" ?
                "active bg-secondary rounded text-white" :
                hoveredItem === "createAccount" ? "bg-light" : ""}`}
                title="Create Account"
                onMouseEnter={() => setHoveredItem("createAccount")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                Create Account
              </Link>
            </li>

            <li
              className={`nav-item`}
            >
              <Link
                to={"/login"}
                className={`nav-link ${currentPage === "login" ?
                "active bg-secondary rounded text-white" :
                hoveredItem === "login" ? "bg-light" : ""}`}
                // className={`nav-link rounded ${hoveredItem === "login" ? "hovered" : ""}`}
                title="Login"
                onMouseEnter={() => setHoveredItem("login")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                Login
              </Link>
            </li>

            <li
              className={`nav-item`}
            >
              <Link
                to={"/deposit"}
                className={`nav-link ${currentPage === "deposit" ?
                "active bg-secondary rounded text-white" :
                hoveredItem === "deposit" ? "bg-light" : ""}`}
                // className={`nav-link ${hoveredItem === "deposit" ? "hovered" : ""}`}
                title="Deposit"
                onMouseEnter={() => setHoveredItem("deposit")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                Deposit
              </Link>
            </li>
            <li
              className={`nav-item`}
            >
              <Link
                to={"/withdraw"}
                className={`nav-link ${currentPage === "withdraw" ?
                "active bg-secondary rounded text-white" :
                hoveredItem === "withdraw" ? "bg-light" : ""}`}
                title="Withdraw"
                onMouseEnter={() => setHoveredItem("withdraw")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                Withdraw
              </Link>
            </li>
            <li
              className={`nav-item`}
            >
              <Link
                to={"allData"}
                className={`nav-link ${currentPage === "allData" ?
                "active bg-secondary rounded text-white" :
                hoveredItem === "allData" ? "bg-light" : ""}`}
                title="AllData"
                onMouseEnter={() => setHoveredItem("allData")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                AllData
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {hoveredItem && (
        <div className="description-popup">
          {getDescription(hoveredItem)}
        </div>
      )}
    </>
  );
}

export default NavBar;
