import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/BlogStyles.css'; 

// Este componente se encarga de mostrar el detalle de un solo post.
// Recibe dos propiedades: 
// - "post": el objeto con la información del post seleccionado.
// - "onBack": la función que permite volver a la lista de posts.
const PostDetail = ({ post, onBack }) => {

    // Si no existe un post (por ejemplo, si no se encuentra o aún no se carga),
    // se muestra un mensaje indicando que no se encontró nada y un botón para regresar.
    if (!post) {
        return (
            <div className="blog-detail">
                <button onClick={onBack} className="back-button">
                    ← Volver a la lista
                </button>
                <p>Post no encontrado.</p>
            </div>
        );
    }

    // Si el post sí existe, se muestra su contenido completo.
    return (
        <div className="blog-main-container">
            {/* Botón para regresar a la lista de posts */}
            <button onClick={onBack} className="back-button">
                ← Volver a la lista
            </button>

            <div className="post-detail">
                {/* Se muestra el título del post */}
                <h1>{post.title}</h1>
                
                {/* Se muestran la fecha y el autor */}
                <p className="post-meta">
                    <span>Publicado el: {post.date}</span>
                    <span>Por: {post.author}</span>
                </p>
                
                <hr />

                {/* Aquí se muestra el contenido del post.
                   Se utiliza ReactMarkdown para convertir el texto escrito en formato Markdown
                   en elementos HTML que se pueden visualizar correctamente en la página. */}
                <div className="post-content">
                    <ReactMarkdown>
                        {post.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
