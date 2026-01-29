# 📝 Sistema de Blogs - Guía de Uso

## 🎯 ¿Qué es el Sistema de Blogs?

Tu aplicación CV incluye un **sistema completo de gestión de blogs** que permite:
- ✅ **Crear** nuevos artículos de blog
- ✅ **Editar** artículos existentes
- ✅ **Eliminar** artículos
- ✅ **Ver** listado de todos los blogs
- ✅ **Leer** artículos completos
- ✅ Soporte para **Markdown**

---

## 🚀 Acceso al Sistema de Blogs

### 📍 URL de la página de blogs:
```
http://localhost:5173/posts
```

### 📍 URL de gestión de blogs (crear/editar):
```
http://localhost:5173/posts/manage
```

---

## 📚 Rutas Disponibles

| Ruta | Descripción |
|------|-----------|
| `/posts` | Página principal del blog - Listar todos los artículos |
| `/posts/manage` | Panel de gestión - Crear, editar y eliminar blogs |
| `/posts/:id` | Ver artículo completo |
| `/` | Volver al CV principal |

---

## ✍️ Crear un Blog

1. Ve a `/posts/manage` o haz clic en **"➕ Crear o Editar Blogs"**
2. Haz clic en **"➕ Crear Nuevo Blog"**
3. Completa el formulario:
   - **Título**: El nombre de tu artículo
   - **Autor**: Tu nombre
   - **Contenido**: El texto del artículo (mínimo 50 caracteres)
4. El **slug** se genera automáticamente desde el título
5. Haz clic en **"✍️ Publicar Blog"**

### Ejemplo de Título:
```
"Cómo Construir una Aplicación React con Vite"
```
**Slug generado automáticamente:**
```
como-construir-una-aplicacion-react-con-vite
```

---

## 🎨 Formato Markdown

El contenido de los blogs soporta **Markdown**. Aquí están los formatos disponibles:

### Encabezados
```markdown
### Título Principal
## Subtítulo
# Título Grande
```

### Énfasis
```markdown
**Texto en negrita**
*Texto en cursiva*
```

### Listas
```markdown
- Elemento 1
- Elemento 2
- Elemento 3

1. Primero
2. Segundo
3. Tercero
```

### Código
```markdown
`código inline`

```javascript
// Bloque de código
const hello = "world";
```
```

### Enlaces
```markdown
[Texto del enlace](https://ejemplo.com)
```

### Ejemplo Completo:
```markdown
### 🚀 Introducción a React

React es una librería JavaScript para construir interfaces.

#### Características principales:
- Componentes reutilizables
- Virtual DOM
- **Gestión de estado**

```javascript
const App = () => <h1>Hola Mundo</h1>;
```

Aprende más en [React Docs](https://react.dev)
```

---

## ✏️ Editar un Blog

1. Ve a `/posts/manage`
2. Busca el blog que deseas editar
3. Haz clic en **"✏️ Editar"**
4. Modifica el contenido en el textarea
5. Haz clic en **"💾 Guardar"**

---

## 🗑️ Eliminar un Blog

1. Ve a `/posts/manage`
2. Busca el blog que deseas eliminar
3. Haz clic en **"🗑️ Eliminar"**
4. Confirma la eliminación

---

## 👁️ Ver un Blog Completo

### Desde la lista (`/posts`):
1. Ve a `/posts`
2. Haz clic en cualquier tarjeta de blog o en **"Leer Post Completo →"**
3. Se abrirá la vista completa del artículo

---

## 📊 Estructura de Datos de un Blog

Cuando creas un blog, se guarda con esta estructura:

```json
{
  "id": "1706384521234",
  "title": "Cómo Construir una Aplicación React",
  "content": "### Introducción\n\nReact es...",
  "author": "Santiago G. Cedeño",
  "date": "28/1/2026",
  "slug": "como-construir-una-aplicacion-react"
}
```

- **id**: Identificador único (timestamp)
- **title**: Título del artículo
- **content**: Contenido completo (Markdown)
- **author**: Nombre del autor
- **date**: Fecha de publicación (se genera automáticamente)
- **slug**: URL-friendly (se genera desde el título)

---

## 🔄 Flujo Completo de Uso

```
CV Principal (/)
    ↓
[Ir al Blog Técnico]
    ↓
Blog Home (/posts)
    ├─ [Ver Artículo] → Detalle (/posts/:id)
    └─ [➕ Crear o Editar Blogs] → Gestión (/posts/manage)
           ├─ [➕ Crear Nuevo] → Formulario
           ├─ [✏️ Editar] → Editar existente
           └─ [🗑️ Eliminar] → Confirmar eliminación
```

---

## ⚙️ Endpoints de la API

Si necesitas hacer llamadas directas a la API:

### Obtener todos los blogs
```bash
GET http://localhost:3000/posts
```

### Obtener un blog específico
```bash
GET http://localhost:3000/posts/:id
```

### Crear un blog
```bash
POST http://localhost:3000/posts
Content-Type: application/json

{
  "title": "Título",
  "content": "Contenido",
  "author": "Autor",
  "date": "28/1/2026"
}
```

### Actualizar un blog
```bash
PUT http://localhost:3000/posts/:id
Content-Type: application/json

{
  "title": "Nuevo título",
  "content": "Nuevo contenido"
}
```

### Eliminar un blog
```bash
DELETE http://localhost:3000/posts/:id
```

---

## 💡 Tips y Trucos

1. **Slug automático**: No necesitas escribir el slug, se genera del título
2. **Validación**: El contenido debe tener al menos 50 caracteres
3. **Fecha automática**: La fecha se asigna automáticamente en formato ES
4. **Markdown rendering**: Los blogs se muestran con Markdown renderizado en la vista de detalle
5. **Previo de contenido**: En la lista se muestra un preview de 180 caracteres

---

## 🐛 Troubleshooting

### "Error al crear el blog"
- Verifica que todos los campos estén completos
- El contenido debe tener al menos 50 caracteres
- Asegúrate que el servidor Express está corriendo (`npm run dev-server`)

### "Blog no se guarda"
- Revisa la consola del navegador (F12)
- Verifica que el backend está en `http://localhost:3000`
- Comprueba que `db.json` tiene permisos de escritura

### "Cambios no se ven"
- Recarga la página (F5)
- Verifica que el servidor está corriendo
- Limpia el caché del navegador si es necesario

---

## 📱 Responsividad

El sistema de blogs es completamente responsivo:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (< 768px)

---

## 🎯 Próximas Mejoras Posibles

- [ ] Búsqueda de blogs
- [ ] Filtrado por categoría
- [ ] Comentarios en blogs
- [ ] Sistema de tags
- [ ] Estadísticas de visualizaciones
- [ ] Exportar blogs a PDF

---

¡Disfruta escribiendo tus blogs técnicos! 🚀
