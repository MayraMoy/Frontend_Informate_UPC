import { useContext } from 'react';
import AppContext from '../../Context/AppContext.js';
import { obtenerNombreUsuario, obtenerRolesUsuario } from './utils/perfilUsuario.js';
import './styles/Perfil.css';

const Perfil = () => {
  const { user } = useContext(AppContext);
  const nombre = obtenerNombreUsuario(user);
  const rol = obtenerRolesUsuario(user);

  return (
    <section className="perfil-page container py-5" aria-labelledby="perfil-title">
      <div className="perfil-heading">
        <h1 id="perfil-title">Mi perfil</h1>
        <p>Consultá la información de tu cuenta.</p>
      </div>

      <article className="perfil-card">
        <div className="perfil-avatar" aria-hidden="true">{nombre.charAt(0).toUpperCase()}</div>
        <div className="perfil-details">
          <h2>{nombre}</h2>
          <dl>
            <div><dt>Nombre</dt><dd>{nombre}</dd></div>
            {user?.email && <div><dt>Correo electrónico</dt><dd>{user.email}</dd></div>}
            <div><dt>Rol</dt><dd>{rol}</dd></div>
          </dl>
        </div>
      </article>
    </section>
  );
};

export default Perfil;
