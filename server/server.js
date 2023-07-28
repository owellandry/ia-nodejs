const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Crea una conexión a la base de datos usando las variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Aquí deberías realizar la validación de inicio de sesión con la base de datos
  // Consultar la base de datos y verificar si el usuario y la contraseña son correctos
  // Si el inicio de sesión es exitoso, devolver un estado HTTP 200 (OK)
  // Si falla, devolver un estado HTTP 401 (Unauthorized) o 403 (Forbidden), según corresponda.

  // Ejemplo de validación básica (¡No utilizar en producción!)
  if (username === 'usuario' && password === 'contrasena') {
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }
});

// Ruta para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Aquí deberías realizar la inserción del nuevo usuario en la base de datos
  // Puedes hacerlo utilizando la consulta INSERT INTO en MySQL
  // Si el registro es exitoso, devolver un estado HTTP 200 (OK)
  // Si falla, devolver un estado HTTP 500 (Internal Server Error) o 400 (Bad Request), según corresponda.

  // Ejemplo de registro básico (¡No utilizar en producción!)
  if (username && password) {
    res.status(200).json({ message: 'Registro exitoso' });
  } else {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
