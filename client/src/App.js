import {  Routes, Route } from 'react-router-dom';
import "./App.css";

import Header from "./components/Header";
import Home from "./components/Home";
import GManager from "./components/GManager";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/GManager" element={<GManager />}/>
          <Route path="/Register" element={<Register />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
