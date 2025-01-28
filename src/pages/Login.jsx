import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); // Para manejar errores de login

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Limpiar errores previos

    try {
      // Realizar la solicitud de inicio de sesión
      const response = await axios.post("http://localhost:3000/api/login", { 
        email, 
        contrasena: password 
      });

      // Guardar el estado de autenticación en localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", response.data.token); // Guardar el token JWT

      // Redirigir al perfil del usuario
      navigate("/perfil");
    } catch (err) {
      // Manejar errores específicos de la API
      if (err.response?.status === 401) {
        setError("Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña.");
      } else {
        setError("Hubo un error al iniciar sesión. Inténtalo de nuevo más tarde.");
      }
    } finally {
      setIsSubmitting(false); // Restablecer el estado de carga
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>

        {/* Mostrar mensaje de error si existe */}
        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button" disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : "Entrar"}
        </button>

        <p className="login-footer">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};
