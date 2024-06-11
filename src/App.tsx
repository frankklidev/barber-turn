/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import { supabase } from './supabaseClient';
import useNotifications from './hooks/useNotifications';
import './App.css';

const Home = lazy(() => import('./components/Home'));
const Reservation = lazy(() => import('./components/Reservation'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

const App: React.FC = () => {
  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };

    fetchUser();

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useNotifications(userId);

  return (
    <Router>
      <div className="App flex flex-col min-h-screen overflow-x-hidden">
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
        onEnter={(node: any) => node.classList.add('fade-enter')}
        onEntering={(node: any) => node.classList.add('fade-enter-active')}
        onExit={(node) => node.classList.add('fade-exit')}
        onExiting={(node) => node.classList.add('fade-exit-active')}
      >
        {(state) => (
          <div className={`fade ${state}`}>
            <Suspense fallback={<Loading />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/reservar" element={<ProtectedRoute element={<Reservation />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/*" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />
              </Routes>
            </Suspense>
          </div>
        )}
      </Transition>
    </TransitionGroup>
  );
};

export default App;
