import React, { useState } from 'react';
import api from '../../api/client';
import "../../styles/FormStyles.css";

export default function BlogForm({ onPostCreated }) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        slug: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Generar slug automáticamente del título
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'title') {
            setFormData(prev => ({
                ...prev,
                title: value,
                slug: generateSlug(value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación
        if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
            setError('Por favor completa todos los campos obligatorios');
            return;
        }

        if (formData.content.length < 50) {
            setError('El contenido debe tener al menos 50 caracteres');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const newPost = {
                ...formData,
                date: new Date().toLocaleDateString('es-ES'),
                id: String(Date.now())
            };

            const response = await api.post('/posts', newPost);
            
            setMessage('✅ Blog creado exitosamente');
            setFormData({
                title: '',
                content: '',
                author: '',
                slug: ''
            });

            // Notificar al componente padre
            if (onPostCreated) {
                onPostCreated(response.data);
            }

            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error('Error al crear blog:', err);
            setError('Error al crear el blog. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container blog-form-container">
            <h2>📝 Crear Nuevo Blog</h2>
            
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <form onSubmit={handleSubmit}>
                {/* Título */}
                <div className="form-group">
                    <label htmlFor="title">Título *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ej: Cómo construir una aplicación React"
                        required
                    />
                    {formData.title && (
                        <small className="slug-preview">
                            Slug: <code>{formData.slug}</code>
                        </small>
                    )}
                </div>

                {/* Autor */}
                <div className="form-group">
                    <label htmlFor="author">Autor *</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                    />
                </div>

                {/* Contenido */}
                <div className="form-group">
                    <label htmlFor="content">Contenido * (Soporta Markdown)</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Escribe tu artículo aquí... Puedes usar Markdown"
                        rows={12}
                        required
                    />
                    <small className="char-count">
                        {formData.content.length} caracteres (mínimo 50)
                    </small>
                </div>

                {/* Botón */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="submit-button blog-submit"
                >
                    {loading ? '⏳ Creando...' : '✍️ Publicar Blog'}
                </button>
            </form>

            {/* Ayuda de Markdown */}
            <details className="markdown-help">
                <summary>📖 Guía de Markdown</summary>
                <div className="help-content">
                    <p><strong>Encabezados:</strong> <code>### Título</code></p>
                    <p><strong>Negritas:</strong> <code>**texto**</code></p>
                    <p><strong>Listas:</strong> <code>- Elemento</code></p>
                    <p><strong>Links:</strong> <code>[Texto](url)</code></p>
                    <p><strong>Código:</strong> <code>`código inline`</code></p>
                </div>
            </details>
        </div>
    );
}
