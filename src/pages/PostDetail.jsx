import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';
import '../styles/BlogStyles.css';

// Este componente muestra el detalle de un post específico.
// Utiliza el parámetro de la URL (slug o id) para buscar el post en la API.
export default function PostDetail() {
    // Se captura el parámetro de la URL (ejemplo: /posts/analisis-temporal-tc39).
    const { id } = useParams(); 
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Al montar el componente o cambiar el slug, se busca el post correspondiente.
    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null);

            try {
                // Se consulta la API usando el slug como filtro.
                // Ejemplo: http://localhost:3000/posts?slug=analisis-temporal-tc39
                console.log(`Buscando post por slug: ${id}`);
                const response = await api.get(`/posts?slug=${id}`);
                
                // JSON Server devuelve un array: si hay resultados, se toma el primero.
                if (response.data.length > 0) {
                    setPost(response.data[0]);
                } else {
                    // Si no hay resultados, se muestra un error.
                    setError("El post solicitado no existe.");
                    console.error(`Post con slug '${id}' no encontrado.`);
                }
            } catch (err) {
                console.error("Error al obtener el post:", err);
                setError("Ocurrió un error al conectar con la API.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    // Esta función interpreta el contenido del post y lo convierte en elementos HTML.
    // Reconoce encabezados, bloques de código y listas simples.
    const renderContent = (content) => {
        if (!content) return null;
        
        return content.split('\n').map((line, index) => {
            if (line.trim().startsWith('###')) return <h3 key={index} className="post-h3">{line.substring(4)}</h3>;
            if (line.trim().startsWith('####')) return <h4 key={index} className="post-h4">{line.substring(5)}</h4>;
            if (line.includes('```')) return <pre key={index} className="code-block">{line}</pre>;
            if (line.trim().startsWith('*')) return <li key={index}>{line.substring(2)}</li>;
            
            return <p key={index}>{line}</p>;
        });
    };

    // --- Renderizado Condicional ---
    
    if (loading) {
        return <div className="post-detail-container loading-state">Cargando Post...</div>;
    }
    
    if (error) {
        return (
            <div className="post-detail-container error-message">
                <h2>Error</h2>
                <p>{error}</p>
                <Link to="/posts">Volver al Blog</Link>
            </div>
        );
    }
    
    if (!post) {
        return <div className="post-detail-container error-message">Error desconocido al cargar el contenido.</div>;
    } 

    // Si todo está correcto, se muestra el detalle del post.
    return (
        <div className="post-detail-container">
            <Link to="/posts" className="back-link">← Volver a todos los posts</Link>
            
            <h1 className="post-title-detail">{post.title}</h1>
            <p className="post-meta">Publicado el: {post.date} | Por: {post.author}</p>
            <hr className="post-divider" />
            
            <div className="post-content">
                {renderContent(post.content)}
            </div>
            
            <Link to="/posts" className="back-link back-link-bottom">← Volver a todos los posts</Link>
        </div>
    );
}
