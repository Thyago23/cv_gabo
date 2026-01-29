CV-GABO - Portfolio Personal Interactivo
Aplicación web de Currículum Vitae desarrollada con React y JSON Server, que permite gestionar dinámicamente información profesional, académica y proyectos mediante operaciones CRUD.
Mostrar imagen
Mostrar imagen
Mostrar imagen

Características

Gestión dinámica de contenido: Crear, leer, actualizar y eliminar información
Blog integrado: Sistema de posts con Markdown
Creación y edición de blogs: Interfaz CRUD completa para gestionar artículos
Navegación fluida: React Router para experiencia de SPA
Interfaz moderna: Diseño responsivo y profesional
API REST simulada: Express Server como backend
Secciones organizadas: Perfil, Experiencia, Formación y Habilidades
Tema oscuro/claro: Toggle de temas dinámico


Requisitos Previos
Antes de comenzar, asegurarse de tener instalado:

- Node.js (v16 o superior) 
- npm o yarn (viene con Node.js)
- Git (opcional)

Verifica la instalación:

bashnode --version
npm --version

Instalación
1. Clonar el repositorio
bashgit clone https://github.com/tu-usuario/cv-gabo.git
cd cv-gabo
2. Instalar dependencias
bashnpm install
3. Instalar JSON Server globalmente (si no lo tienes)
bashnpm install -g json-server

▶Ejecución del Proyecto
El proyecto requiere dos terminales ejecutándose simultáneamente:

Terminal 1: Iniciar Express Server (Backend)
```bash
npm run dev-server
```

Terminal 2: Iniciar React (Frontend)
```bash
npm run dev
```

O, para ambos simultáneamente:
```bash
npm run dev-all
```

La aplicación estará disponible en: http://localhost:5173

**API Endpoints disponibles:**
- `GET /posts` - Obtener todos los blogs
- `POST /posts` - Crear un nuevo blog
- `PUT /posts/:id` - Actualizar un blog
- `DELETE /posts/:id` - Eliminar un blog
- `GET /formacion` - Obtener formación
- `GET /experiencia` - Obtener experiencia
- `GET /skills` - Obtener habilidades

Estructura del Proyecto
cv-gabo/
├── db.json                      # Base de datos JSON
├── src/
│   ├── api/
│   │   └── client.js           # Configuración de Axios
│   ├── components/
│   │   ├── blog/
│   │   │   ├── BlogList.jsx    # Lista de posts
│   │   │   └── PostDetail.jsx  # Detalle de post
│   │   ├── crud/
│   │   │   ├── ExperienceForm.jsx
│   │   │   ├── EducationForm.jsx
│   │   │   └── SkillsForm.jsx
│   │   ├── CVHeader.jsx
│   │   ├── CVNavigation.jsx
│   │   └── SectionContent.jsx  # Contenedor de secciones
│   ├── context/
│   │   └── ThemeContext.jsx    # Contexto de tema
│   ├── hooks/
│   │   └── useData.js          # Custom Hook para datos
│   ├── pages/
│   │   ├── BlogHome.jsx
│   │   └── BlogPage.jsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── Sections.css
│   │   └── FormStyles.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md

Estructura de db.json
El archivo db.json contiene cuatro colecciones principales:
Posts (Blog)
json{
  "posts": [
    {
      "id": "1",
      "title": "Título del post",
      "date": "2025-11-20",
      "slug": "url-amigable",
      "content": "Contenido en Markdown",
      "author": "Santiago G. Cedeño"
    }
  ]
}
Formación Académica
json{
  "formacionD": [
    {
      "id": 1,
      "title": "Institución",
      "detail": "Descripción",
      "email": "correo@ejemplo.com"
    }
  ]
}
Experiencia Laboral
json{
  "experiencia": [
    {
      "id": "3",
      "category": "Proyectos Institucionales",
      "title": "Nombre del proyecto",
      "description": "Descripción detallada"
    }
  ]
}
Habilidades Técnicas
json{
  "skills": [
    {
      "id": 101,
      "category": "Lenguajes de Programación",
      "name": "JavaScript",
      "color": "blue"
    }
  ]
}

Tecnologías Utilizadas
Frontend

React 18 - Librería de UI
React Router - Navegación entre páginas
Axios - Cliente HTTP para peticiones
CSS3 - Estilos personalizados

Backend (Simulado)

JSON Server - API REST falsa
db.json - Base de datos en formato JSON

Herramientas

Vite - Build tool y dev server
ESLint - Linter de código

Funcionalidades por Sección
Perfil Profesional

Presentación estática del profesional
Información de contacto

Experiencia Laboral

Visualización agrupada por categorías
Agregar nuevos proyectos
Eliminar proyectos existentes

Formación Académica

Lista de estudios realizados
CRUD completo de formación

Habilidades Técnicas

Agrupación automática por categorías
Tags con colores personalizados
Gestión dinámica de skills

Blog

Lista de artículos
Visualización de posts individuales
Soporte para Markdown


Solución de Problemas
Error: "Failed to load resource: 404"
Causa: JSON Server no está corriendo o está en puerto incorrecto.
Solución:
bash# Verificar que JSON Server esté en puerto 3001
json-server --watch db.json --port 3001
Error: "Cannot GET /formacionD"
Causa: El archivo db.json no está en la raíz del proyecto.
Solución: Mueve db.json a la carpeta raíz (mismo nivel que package.json)
La aplicación no carga datos
Causa: URL base de Axios incorrecta.
Solución: Verifica en src/api/client.js:
javascriptconst api = axios.create({
  baseURL: 'http://localhost:3001',  // Puerto correcto
});

Scripts Disponibles
bash# Desarrollo con Vite
npm run dev

# Construir para producción
npm run build

# Preview de build de producción
npm run preview

# Linter
npm run lint

# Iniciar JSON Server
json-server --watch db.json --port 3001

Deploy (Producción)
Opción 1: Vercel (Frontend)
bashnpm run build
vercel --prod
Opción 2: Netlify

Build command: npm run build
Publish directory: dist

Nota: Para producción, reemplaza JSON Server con un backend real (Node.js, Django, etc.)

Contribuciones
Las contribuciones son bienvenidas. Para cambios importantes:

Fork el proyecto
Crea una rama (git checkout -b feature/nueva-funcionalidad)
Commit tus cambios (git commit -m 'Agregar nueva funcionalidad')
Push a la rama (git push origin feature/nueva-funcionalidad)
Abre un Pull Request
