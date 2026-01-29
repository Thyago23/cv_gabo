import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import BlogList from './blog/Bloglist'; 
import PostDetail from './blog/PostDetail';
import '../styles/BlogStyles.css';

// Este componente representa la página principal del blog.
// Se encarga de mostrar la lista de posts o el detalle de un post seleccionado.
const BlogPage = () => {
    // Se obtiene la lista de posts y el estado de carga desde el hook useData.
    const { posts, loading } = useData();

    // Se define un estado local para guardar el id del post seleccionado.
    const [selectedPostId, setSelectedPostId] = useState(null);

    // Esta función se usa cuando el usuario selecciona un post.
    const handleSelectPost = (id) => {
        setSelectedPostId(id);
    };

    // Esta función se usa para volver atrás, quitando la selección del post.
    const handleBack = () => {
        setSelectedPostId(null);
    };

    // Si los datos aún están cargando, se muestra un mensaje simple.
    if (loading) {
        return <div className="blog-main-container"><p>Cargando posts...</p></div>;
    }
    
    // Se busca el post que coincide con el id seleccionado.
    const selectedPost = posts.find(p => p.id === selectedPostId);

    // Si existe un post seleccionado, se muestra su detalle.
    if (selectedPost) {
        // Se renderiza el componente PostDetail con la información del post.
        // Además, se incluye un enlace para volver a la hoja de vida.
        return (
            <> 
                <PostDetail post={selectedPost} onBack={handleBack} />
                <div className="blog-main-container">
                    <Link to="/" className="back-to-cv-link">
                        ← Volver a la Hoja de Vida
                    </Link>
                </div>
            </>
        );
    }

    // Si no hay post seleccionado, se muestra la lista de posts.
    // BlogList se encarga de renderizar cada post en forma de tarjeta.
    return (
        <>
            <BlogList posts={posts} onSelectPost={handleSelectPost} />
            <div className="blog-main-container">
                <Link to="/" className="back-to-cv-link">
                    ← Volver a la Hoja de Vida
                </Link>
            </div>
        </>
    );
};

export default BlogPage;
