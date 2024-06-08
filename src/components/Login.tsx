import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/'; // Redireccionar al home después del inicio de sesión
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center overflow-x-hidden -mt-5 -mb-11">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo Electrónico</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            {loading && (
              <div className="flex justify-center">
                <div className="radial-progress animate-spin" style={{ "--value": 70, "--size": "3rem", "--thickness": "3px" } as React.CSSProperties}></div>
              </div>
            )}
            {error && (
              <div className="alert alert-error">
                <div className="flex-1">
                  <label>{error}</label>
                </div>
              </div>
            )}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                Iniciar Sesión
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p>¿No tienes una cuenta? <Link to="/register" className="text-primary">Regístrate aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
