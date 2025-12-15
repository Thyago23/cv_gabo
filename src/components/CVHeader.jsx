import React from 'react';
import '../styles/CVHeader.css';
import { Mail, Phone, MapPin } from 'lucide-react';

// Este componente representa la cabecera del currículum.
// Muestra el nombre, la información de contacto y algunos datos adicionales.
export default function CVHeader() {
  return (
    <div className="header">
      <div className="header-content">
        {/* Sección del avatar, en este caso con iniciales */}
        <div className="avatar">CG</div>

        {/* Sección con la información principal */}
        <div className="header-info">
          {/* Nombre completo */}
          <h1>Cedeño Baquero Santiago Gabriel</h1>

          {/* Subtítulo con el rol o perfil */}
          <p className="subtitle">Estudiante de Desarrollo De Software</p>

          {/* Bloque con la información de contacto */}
          <div className="contact-info">
            {/* Teléfono */}
            <div className="contact-item">
              <Phone size={16} />
              <span>0992779736</span>
            </div>

            {/* Correo electrónico */}
            <div className="contact-item">
              <Mail size={16} />
              <span>noa00santy@gmail.com</span>
            </div>

            {/* Dirección */}
            <div className="contact-item">
              <MapPin size={16} />
              <span>La Biloxi, Hernan Gmoir</span>
            </div>
          </div>

          {/* Información adicional como edad y número de cédula */}
          <p className="extra-info">19 años | CI: 1752903995</p>
        </div>
      </div>
    </div>
  );
}
