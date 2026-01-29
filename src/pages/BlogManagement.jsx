import React, { useState, useEffect } from 'react';
import api from '../api/client';
import BlogForm from '../components/crud/BlogForm';
import '../styles/BlogStyles.css';

export default function BlogManagement() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingContent, setEditingContent] = useState('');

    // Cargar todos los posts
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/posts');
            setPosts(response.data.sort((a, b) => b.id - a.id));
        } catch (error) {
            console.error('Error al cargar posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este blog?')) {
            return;
        }

        try {
            await api.delete(`/posts/${id}`);
            setPosts(posts.filter(post => post.id !== id));
            alert('✅ Blog eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar post:', error);
            alert('❌ Error al eliminar el blog');
        }
    };

    const handleEditPost = async (id) => {
        try {
            const updatedPost = {
                ...posts.find(p => p.id === id),
                content: editingContent
            };

            await api.put(`/posts/${id}`, updatedPost);
            
            setPosts(posts.map(p => 
                p.id === id ? updatedPost : p
            ));
            
            setEditingId(null);
            setEditingContent('');
            alert('✅ Blog actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar post:', error);
            alert('❌ Error al actualizar el blog');
        }
    };

    const getPreview = (content) => {
        const cleanContent = content.replace(/#+\s*|\*\*|[\n\r]+/g, ' ').trim();
        return cleanContent.substring(0, 150) + (cleanContent.length > 150 ? '...' : '');
    };

    if (loading) {
        return <div className="blog-container loading-state">Cargando blogs...</div>;
    }

    return (
        <div className="blog-management-container">
            <div className="blog-management-header">
                <h1>📚 Gestión de Blogs</h1>
                <button 
                    className="toggle-form-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '❌ Cancelar' : '➕ Crear Nuevo Blog'}
                </button>
            </div>

            {/* Formulario de creación */}
            {showForm && (
                <BlogForm onPostCreated={() => {
                    fetchPosts();
                    setShowForm(false);
                }} />
            )}

            {/* Lista de blogs */}
            <div className="blog-management-list">
                <h2>Mis Blogs ({posts.length})</h2>
                
                {posts.length === 0 ? (
                    <p className="no-content">No hay blogs creados. ¡Crea uno ahora!</p>
                ) : (
                    <div className="posts-management">
                        {posts.map(post => (
                            <div key={post.id} className="post-management-card">
                                <div className="post-header">
                                    <h3>{post.title}</h3>
                                    <div className="post-actions">
                                        <button 
                                            className="btn-edit"
                                            onClick={() => {
                                                setEditingId(post.id);
                                                setEditingContent(post.content);
                                            }}
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => handleDeletePost(post.id)}
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>

                                <div className="post-meta">
                                    <span>📅 {post.date}</span>
                                    <span>👤 {post.author}</span>
                                </div>

                                {editingId === post.id ? (
                                    <div className="edit-form">
                                        <textarea
                                            value={editingContent}
                                            onChange={(e) => setEditingContent(e.target.value)}
                                            rows={10}
                                        />
                                        <div className="edit-actions">
                                            <button 
                                                onClick={() => handleEditPost(post.id)}
                                                className="btn-save"
                                            >
                                                💾 Guardar
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setEditingId(null);
                                                    setEditingContent('');
                                                }}
                                                className="btn-cancel"
                                            >
                                                ❌ Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="post-preview">{getPreview(post.content)}</p>
                                )}

                                <small className="post-slug">ID: {post.id}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
