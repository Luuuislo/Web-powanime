import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    email: '',
    contrasena: '',
    foto_perfil: null,
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto_perfil: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    data.append('nombre_usuario', formData.nombre_usuario);
    data.append('email', formData.email);
    data.append('contrasena', formData.contrasena);
    if (formData.foto_perfil) {
      data.append('foto_perfil', formData.foto_perfil);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setFormData({ nombre_usuario: '', email: '', contrasena: '', foto_perfil: null });
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error al registrar. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre_usuario">Nombre de Usuario</label>
          <input
            type="text"
            id="nombre_usuario"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="foto_perfil">Foto de Perfil (opcional)</label>
          <input
            type="file"
            id="foto_perfil"
            name="foto_perfil"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
