import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Reservation from './components/Reservation';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservar" element={<Reservation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
