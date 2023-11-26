import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import GManager from "./components/GManager";
import {  Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/GManager" element={<GManager />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
