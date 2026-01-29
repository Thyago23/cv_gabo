# 🚀 Guía de Deployment: Vercel (Frontend) + Render (Backend)

## 📋 Requisitos previos
- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Render](https://render.com)
- Repositorio en GitHub

## 🔧 1. Preparación Local

### 1.1 Instalar dependencias
```bash
npm install
```

### 1.2 Crear archivos de entorno
Crea `.env` en la raíz del proyecto:
```
VITE_API_URL_DEV=http://localhost:3000
VITE_API_URL_PROD=https://tu-backend-en-render.onrender.com
VITE_ENV=dev
```

### 1.3 Probar localmente
```bash
# Terminal 1: Frontend (Vite)
npm run dev

# Terminal 2: Backend (Express)
npm run dev-server
```

---

## ☁️ 2. Deploy del Backend en Render

### 2.1 Crear el servicio
1. Accede a [Render Dashboard](https://dashboard.render.com)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub

### 2.2 Configurar el servicio
- **Name**: `cv-backend` (o el nombre que prefieras)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free (o Premium si lo necesitas)

### 2.3 Agregar variables de entorno en Render
En la sección "Environment":
```
PORT=3000
FRONTEND_URL=https://tu-cv-en-vercel.vercel.app
```

### 2.4 Obtener la URL del backend
Una vez desplegado, Render te dará una URL como:
```
https://cv-backend-xxxxx.onrender.com
```

> ⚠️ **Nota**: Los servidores Free de Render duermen después de 15 min sin actividad. Usa un plan pagado para producción.

---

## 🌐 3. Deploy del Frontend en Vercel

### 3.1 Crear el proyecto en Vercel
1. Accede a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **"Add New..."** → **"Project"**
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Vite

### 3.2 Configurar variables de entorno en Vercel
En **"Environment Variables"**, agrega:
```
VITE_API_URL_PROD=https://cv-backend-xxxxx.onrender.com
VITE_API_URL_DEV=http://localhost:3000
```

### 3.3 Deploy
Click en **"Deploy"** y espera a que se complete. Tu aplicación estará disponible en:
```
https://tu-proyecto.vercel.app
```

---

## 🔗 4. Configuración de CORS

El archivo `server.js` ya incluye CORS configurado. Asegúrate de que:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

Si en producción tienes problemas de CORS, verifica que `FRONTEND_URL` en Render coincida con tu URL de Vercel.

---

## 📝 5. Variables de Entorno Finales

### Backend (Render)
```
PORT=3000
FRONTEND_URL=https://tu-cv-en-vercel.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL_PROD=https://cv-backend-xxxxx.onrender.com
VITE_API_URL_DEV=http://localhost:3000
```

---

## ✅ 6. Validación

### Verificar que todo funciona:

**Localmente:**
```bash
npm run dev-all
```

**En producción:**
1. Abre tu URL de Vercel en el navegador
2. Verifica en DevTools (F12) que las llamadas API van a Render
3. Prueba crear/editar/eliminar datos

---

## 🐛 Troubleshooting

### Problema: "Error de CORS"
- Verifica que `FRONTEND_URL` en Render es correcto
- En development, asegúrate que `client.js` use `localhost:3000`

### Problema: "Backend no responde en producción"
- Si usas plan Free en Render, el servidor puede estar dormido
- Haz una solicitud para "despertarlo"

### Problema: "Variables de entorno no se cargan"
- En Vercel, redeploy después de agregar variables
- Asegúrate de usar el prefijo `VITE_` para variables accesibles desde el cliente

---

## 🎯 Checklist Final
- [ ] Repositorio en GitHub con todos los cambios
- [ ] Backend desplegado en Render
- [ ] Frontend desplegado en Vercel
- [ ] Variables de entorno configuradas en ambas plataformas
- [ ] CORS configurado correctamente
- [ ] Pruebas funcionales completadas
- [ ] `.gitignore` incluye `.env`

---

## 📚 Recursos útiles
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Express CORS](https://github.com/expressjs/cors)
