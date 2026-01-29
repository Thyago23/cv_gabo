import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Seguridad, BD y auth
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// =================== CONFIG ===================

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// =================== SEGURIDAD ===================

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// =================== MIDDLEWARE ===================

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// =================== AUTH ===================

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_pro';

const ADMIN_USER = {
  username: "Thyago23",
  passwordHash: "$2a$10$X729Z3mX9D.f.GUp7.B6u.D8XGjH5xG5G5G5G5G5G5G5G5G5G5G5G"
};

// ---------- LOGIN ----------
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (
    username === ADMIN_USER.username &&
    await bcrypt.compare(password, ADMIN_USER.passwordHash)
  ) {
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Credenciales incorrectas' });
});

// ---------- MIDDLEWARE JWT ----------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// =================== MONGODB ===================

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// =================== DB.JSON ===================

const dbPath = path.join(__dirname, '../db.json');

const readDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeDb = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

// =================== POSTS ===================

// GET
app.get('/posts', (req, res) => {
  const db = readDb();
  res.json(db.posts);
});

// POST 🔒
app.post('/posts', authenticateToken, (req, res) => {
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

// PUT 🔒
app.put('/posts/:id', authenticateToken, (req, res) => {
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

// DELETE 🔒
app.delete('/posts/:id', authenticateToken, (req, res) => {
  const db = readDb();
  const index = db.posts.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    const deleted = db.posts.splice(index, 1);
    writeDb(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Post no encontrado' });
  }
});

// =================== FORMACIÓN ===================

// GET
app.get('/formacion', (req, res) => {
  const db = readDb();
  res.json(db.formacion);
});

// POST 🔒
app.post('/formacion', authenticateToken, (req, res) => {
  const db = readDb();
  const newItem = {
    id: Math.max(...db.formacion.map(f => f.id), 0) + 1,
    ...req.body
  };
  db.formacion.push(newItem);
  writeDb(db);
  res.status(201).json(newItem);
});

// PUT 🔒
app.put('/formacion/:id', authenticateToken, (req, res) => {
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

// DELETE 🔒
app.delete('/formacion/:id', authenticateToken, (req, res) => {
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

// GET
app.get('/experiencia', (req, res) => {
  const db = readDb();
  res.json(db.experiencia);
});

// POST 🔒
app.post('/experiencia', authenticateToken, (req, res) => {
  const db = readDb();
  const newItem = {
    id: String(Math.max(...db.experiencia.map(e => parseInt(e.id)), 0) + 1),
    ...req.body
  };
  db.experiencia.push(newItem);
  writeDb(db);
  res.status(201).json(newItem);
});

// PUT 🔒
app.put('/experiencia/:id', authenticateToken, (req, res) => {
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

// DELETE 🔒
app.delete('/experiencia/:id', authenticateToken, (req, res) => {
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

// GET
app.get('/skills', (req, res) => {
  const db = readDb();
  res.json(db.skills || []);
});

// POST 🔒
app.post('/skills', authenticateToken, (req, res) => {
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

// PUT 🔒
app.put('/skills/:id', authenticateToken, (req, res) => {
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

// DELETE 🔒
app.delete('/skills/:id', authenticateToken, (req, res) => {
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

// =================== ROOT ===================

app.get('/', (req, res) => {
  res.json({
    message: 'API de CV Backend funcionando ✅',
    protectedMethods: ['POST', 'PUT', 'DELETE']
  });
});

// =================== SERVER ===================

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
