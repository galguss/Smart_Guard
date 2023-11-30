import {  Routes, Route } from 'react-router-dom';
import "./App.css";

import Header from "./components/Header";
import Home from "./components/Home";
import GManager from "./components/GManager";
import Register from "./components/Register";
import Login from "./components/Login";
import Private from "./components/PrivateComponents";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/Login" element={<Login />}/>
          <Route element={<Private />}>
            <Route path="/GManager" element={<GManager />}/>
            <Route path="/Profile/*" element={<Profile />}/>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
