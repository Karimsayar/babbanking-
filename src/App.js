// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { UserContext } from './Provider/context';
import NavBar from './Navbar';

import { HashRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import AllData from './pages/AllData';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import CreateAccount from './pages/CreateAccount';

function App() {

  return (
    <HashRouter>
      <div>
        <NavBar />
        <UserContext.Provider
          value={{
            currentUser: null,
            users: [],
          }}
        >
          <div className="container" style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/createAccount" element={<CreateAccount/>} />
              <Route path="/login/" element={<Login/>} />
              <Route path="/deposit/" element={<Deposit/>} />
              <Route path="/withdraw/" element={<Withdraw/>} />
              {/* <Route path="/transactions/" element={Transactions} /> */}
              {/* <Route path="/balance/" element={<Balance/>} /> */}
              <Route path="/alldata/" element={<AllData/>} />
            </Routes>
          </div>
        </UserContext.Provider>
      </div>
      </HashRouter>
  );
}

export default App;
