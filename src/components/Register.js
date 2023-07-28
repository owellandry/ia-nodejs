import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link desde react-router-dom
import './css/register.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Aquí realizarías una petición al servidor para registrar al usuario
      // Puedes usar fetch o axios para ello.
      // Por ejemplo:
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirige a la página de inicio (Home) si el registro es exitoso
        window.location.href = '/home';
      } else {
        // Maneja el caso cuando el registro falla
        alert('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <input type="text" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrar</button>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
};

export default Register;
