# 🚀 SETUP VERCEL + RENDER - Resumen de Cambios

## ✨ Archivos Creados/Modificados

### 1️⃣ **Configuración de Entorno**
- ✅ `.env.example` - Template de variables para desarrollo
- ✅ `.env.backend.example` - Variables para el servidor

### 2️⃣ **Backend (Node.js + Express)**
- ✅ `server.js` - API REST completa con:
  - CRUD para posts, formación, experiencia, skills
  - CORS configurado para el frontend
  - Lectura/escritura en `db.json`

### 3️⃣ **Frontend**
- ✅ `src/api/client.js` - **ACTUALIZADO** para usar variables de entorno
- ✅ `vercel.json` - Configuración de deployment en Vercel

### 4️⃣ **Dependencias**
- ✅ `package.json` - **ACTUALIZADO** con:
  - `express`, `cors`, `dotenv` para el backend
  - `concurrently` para correr ambos servidores localmente

### 5️⃣ **Documentación**
- ✅ `DEPLOYMENT.md` - Guía completa paso a paso

---

## 🎯 Próximos Pasos (Manual)

### 1. Instala las nuevas dependencias:
```bash
npm install
```

### 2. Crea un archivo `.env` en la raíz:
```bash
VITE_API_URL_DEV=http://localhost:3000
VITE_API_URL_PROD=https://tu-backend-render.onrender.com
VITE_ENV=dev
```

### 3. Prueba localmente:
```bash
npm run dev-all
```

### 4. Sube a GitHub:
```bash
git add .
git commit -m "Setup Vercel + Render deployment"
git push
```

### 5. En Render:
- Nuevo Web Service → Conecta tu repo
- Build: `npm install`
- Start: `npm start`
- Agrega `FRONTEND_URL` en variables de entorno

### 6. En Vercel:
- Nuevo Proyecto → Conecta tu repo (detectará Vite automáticamente)
- Agrega `VITE_API_URL_PROD` en variables de entorno

---

## 🔗 URLs Finales
- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend**: `https://cv-backend-xxxxx.onrender.com`

---

## ❓ ¿Necesitas ayuda?
Revisa `DEPLOYMENT.md` para instrucciones detalladas y troubleshooting.
