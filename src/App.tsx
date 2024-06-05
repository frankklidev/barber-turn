/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente ProtectedRoute
import './App.css';

const Home = lazy(() => import('./components/Home'));
const Reservation = lazy(() => import('./components/Reservation'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <Transition
        key={location.key}
        timeout={300}
        onEnter={(node:any) => node.classList.add('fade-enter')}
        onEntering={(node:any) => node.classList.add('fade-enter-active')}
        onExit={(node) => node.classList.add('fade-exit')}
        onExiting={(node) => node.classList.add('fade-exit-active')}
      >
        {(state) => (
          <div className={`fade ${state}`}>
            <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/reservar" element={<ProtectedRoute element={<Reservation />} />} /> {/* Ruta protegida */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Suspense>
          </div>
        )}
      </Transition>
    </TransitionGroup>
  );
};

export default App;
