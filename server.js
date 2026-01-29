import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear instancia de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Ruta para servir el db.json como API REST
const dbPath = path.join(__dirname, '../db.json');

// Función para leer db.json
const readDb = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

// Función para escribir en db.json
const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

// =================== POSTS ===================
// GET todos los posts
app.get('/posts', (req, res) => {
  const db = readDb();
  res.json(db.posts);
});

// GET un post por id
app.get('/posts/:id', (req, res) => {
  const db = readDb();
  const post = db.posts.find(p => p.id === req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post no encontrado' });
  }
});

// POST crear un nuevo post
app.post('/posts', (req, res) => {
  const db = readDb();
  const newPost = {
    id: String(Math.max(...db.posts.map(p => parseInt(p.id)), 0) + 1),
    ...req.body,
    date: new Date().toLocaleDateString('es-ES')
  };
  db.posts.push(newPost);
  writeDb(db);
  res.status(201).json(newPost);
});

// PUT actualizar un post
app.put('/posts/:id', (req, res) => {
  const db = readDb();
  const index = db.posts.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    db.posts[index] = { ...db.posts[index], ...req.body };
    writeDb(db);
    res.json(db.posts[index]);
  } else {
    res.status(404).json({ message: 'Post no encontrado' });
  }
});

// DELETE eliminar un post
app.delete('/posts/:id', (req, res) => {
  const db = readDb();
  const index = db.posts.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    const deletedPost = db.posts.splice(index, 1);
    writeDb(db);
    res.json(deletedPost[0]);
  } else {
    res.status(404).json({ message: 'Post no encontrado' });
  }
});

// =================== FORMACIÓN ===================
// GET toda la formación
app.get('/formacion', (req, res) => {
  const db = readDb();
  res.json(db.formacion);
});

// POST crear formación
app.post('/formacion', (req, res) => {
  const db = readDb();
  const newItem = {
    id: Math.max(...db.formacion.map(f => f.id), 0) + 1,
    ...req.body
  };
  db.formacion.push(newItem);
  writeDb(db);
  res.status(201).json(newItem);
});

// PUT actualizar formación
app.put('/formacion/:id', (req, res) => {
  const db = readDb();
  const index = db.formacion.findIndex(f => f.id === parseInt(req.params.id));
  if (index !== -1) {
    db.formacion[index] = { ...db.formacion[index], ...req.body };
    writeDb(db);
    res.json(db.formacion[index]);
  } else {
    res.status(404).json({ message: 'Formación no encontrada' });
  }
});

// DELETE eliminar formación
app.delete('/formacion/:id', (req, res) => {
  const db = readDb();
  const index = db.formacion.findIndex(f => f.id === parseInt(req.params.id));
  if (index !== -1) {
    const deleted = db.formacion.splice(index, 1);
    writeDb(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Formación no encontrada' });
  }
});

// =================== EXPERIENCIA ===================
// GET toda la experiencia
app.get('/experiencia', (req, res) => {
  const db = readDb();
  res.json(db.experiencia);
});

// POST crear experiencia
app.post('/experiencia', (req, res) => {
  const db = readDb();
  const newItem = {
    id: String(Math.max(...db.experiencia.map(e => parseInt(e.id)), 0) + 1),
    ...req.body
  };
  db.experiencia.push(newItem);
  writeDb(db);
  res.status(201).json(newItem);
});

// PUT actualizar experiencia
app.put('/experiencia/:id', (req, res) => {
  const db = readDb();
  const index = db.experiencia.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    db.experiencia[index] = { ...db.experiencia[index], ...req.body };
    writeDb(db);
    res.json(db.experiencia[index]);
  } else {
    res.status(404).json({ message: 'Experiencia no encontrada' });
  }
});

// DELETE eliminar experiencia
app.delete('/experiencia/:id', (req, res) => {
  const db = readDb();
  const index = db.experiencia.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    const deleted = db.experiencia.splice(index, 1);
    writeDb(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Experiencia no encontrada' });
  }
});

// =================== SKILLS ===================
// GET todos los skills
app.get('/skills', (req, res) => {
  const db = readDb();
  res.json(db.skills || []);
});

// POST crear skill
app.post('/skills', (req, res) => {
  const db = readDb();
  if (!db.skills) db.skills = [];
  const newItem = {
    id: Math.max(...db.skills.map(s => s.id), 0) + 1,
    ...req.body
  };
  db.skills.push(newItem);
  writeDb(db);
  res.status(201).json(newItem);
});

// PUT actualizar skill
app.put('/skills/:id', (req, res) => {
  const db = readDb();
  const index = (db.skills || []).findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    db.skills[index] = { ...db.skills[index], ...req.body };
    writeDb(db);
    res.json(db.skills[index]);
  } else {
    res.status(404).json({ message: 'Skill no encontrado' });
  }
});

// DELETE eliminar skill
app.delete('/skills/:id', (req, res) => {
  const db = readDb();
  const index = (db.skills || []).findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    const deleted = db.skills.splice(index, 1);
    writeDb(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Skill no encontrado' });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de CV Backend funcionando ✅',
    endpoints: {
      posts: '/posts',
      formacion: '/formacion',
      experiencia: '/experiencia',
      skills: '/skills'
    }
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
});
