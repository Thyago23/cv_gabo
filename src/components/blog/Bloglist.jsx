import React from 'react';
import '../styles/BlogStyles.css';

const BlogList = ({ posts, onSelectPost }) => {
    
    // Esta función prepara un resumen del contenido.
    // Primero elimina símbolos de formato como encabezados (###), negritas (**)
    // y saltos de línea, dejando solo texto plano.
    // Luego toma los primeros 180 caracteres para mostrar una vista previa.
    const getPreview = (content) => {
        const cleanContent = content.replace(/###\s*|##\s*|\*\*|[\n\r]+/g, ' ').trim(); 
        return cleanContent.substring(0, 180) + (cleanContent.length > 180 ? '...' : '');
    };

    return (
        <div className="blog-section">
            <div className="blog-header">
                <h2>Blog Técnico</h2>
                <p>Análisis de propuestas y tutoriales de desarrollo de software.</p>
            </div>
            
            <div className="post-list">
                {posts.map(post => (
                    <div 
                        key={post.id} 
                        className="post-card" 
                        // Cuando se hace clic en la tarjeta, se ejecuta la función que selecciona el post
                        onClick={() => onSelectPost(post.id)}
                    >
                        <h3>{post.title}</h3>
                        
                        <div className="post-meta">
                            {/* Aquí se muestran la fecha y el autor del post */}
                            <span>Publicado el: {post.date}</span>
                            <span>Por: {post.author}</span>
                        </div>
                        
                        {/* Se muestra el texto limpio y recortado como vista previa */}
                        <p>{getPreview(post.content)}</p>
                        
                        <a 
                            href="#" 
                            className="read-more-button"
                            onClick={(e) => { 
                                e.preventDefault(); // Se evita que la página se recargue
                                e.stopPropagation(); // Se evita que el clic afecte al contenedor
                                onSelectPost(post.id); // Se selecciona el post para mostrarlo completo
                            }}
                        >
                            Leer Post Completo →
                        </a>
                    </div>
                ))}
            </div>
            
            {/* Se incluye un enlace para volver a la hoja de vida.
                Si se usa React Router, se recomienda usar <Link to="/"> en lugar de <a>. */}
            <a href="/" className="back-to-cv-link">
                ← Volver a la Hoja de Vida
            </a>
        </div>
    );
};

export default BlogList;
