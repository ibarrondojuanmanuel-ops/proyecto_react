import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth(); // Traemos la función de Firebase del contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validación básica en el cliente
    if (!email.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      await login(email, password); // Intentamos loguear en Firebase
      navigate('/admin'); // Si sale bien, lo mandamos al panel de gestión
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas. Verificá tu correo y contraseña.');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '450px' }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 mt-2">
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
}