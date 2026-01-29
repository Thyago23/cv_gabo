import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import '../styles/BlogStyles.css';

// Esta función prepara un resumen del contenido de cada post.
// 1. Elimina símbolos de formato Markdown como encabezados (#), negritas (**), y saltos de línea.
// 2. Toma los primeros 180 caracteres del texto limpio.
// 3. Si el contenido original es más largo, añade puntos suspensivos al final.
const getPreview = (content) => {
    const cleanContent = content.replace(/#+\s*|\*\*|[\n\r]+/g, ' ').trim();
    const preview = cleanContent.substring(0, 180);
    return preview + (cleanContent.length > 180 ? '...' : '');
};

export default function BlogHome() {
    // Se define el estado para guardar los posts y el estado de carga.
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Al montar el componente, se cargan los posts desde la API.
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Se hace una petición GET al endpoint /posts.
                const response = await api.get('/posts'); 
                // Se ordenan los posts de más reciente a más antiguo según su id.
                setPosts(response.data.sort((a, b) => b.id - a.id)); 
            } catch (error) {
                console.error("Error al cargar posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Mientras los datos se cargan, se muestra un mensaje de espera.
    if (loading) return <div className="blog-container loading-state">Cargando Blog...</div>;

    // Una vez cargados los posts, se muestran en tarjetas.
    return (
        <div className="blog-container">
            <h1 className="blog-title">Blog Técnico</h1>
            <p className="blog-subtitle">Análisis de propuestas y tutoriales de desarrollo de software.</p>
            
            {/* Botón para gestionar blogs */}
            <div style={{marginBottom: '30px', textAlign: 'right'}}>
                <Link to="/posts/manage" className="form-button" style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: 'var(--accent-color)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                }}>
                    ➕ Crear o Editar Blogs
                </Link>
            </div>
            
            {/* Contenedor de la lista de posts */}
            <div className="posts-list"> 
                {posts.map(post => (
                    <div key={post.id} className="post-card-blog"> 
                        {/* Título del post */}
                        <h2>{post.title}</h2>
                        {/* Meta información: fecha y autor */}
                        <p className="post-meta">Publicado el: {post.date} | Por: {post.author}</p>
                        
                        {/* Vista previa del contenido usando la función limpiadora */}
                        <p className="post-excerpt">{getPreview(post.content)}</p> 
                        
                        {/* Enlace para leer el post completo */}
                        <Link to={`/posts/${post.slug || post.id}`} className="read-more-link">
                            Leer Post Completo →
                        </Link>
                    </div>
                ))}
            </div>
            
            {/* Enlace para volver a la hoja de vida */}
            <div style={{marginTop: '30px', textAlign: 'center'}}>
                <Link to="/" className="back-to-cv-link">← Volver a la Hoja de Vida</Link>
            </div>
        </div>
    );
}
