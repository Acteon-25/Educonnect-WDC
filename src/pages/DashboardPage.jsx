import { Link, useNavigate } from 'react-router-dom';
import Foto from '../img/Foto.png';

const DashboardPage = () => {
  const navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-wrap items-center justify-between px-10 py-5 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <img src={Foto} alt="Perfil" className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Bienvenido</h2>
            <p className="text-gray-600">Admin</p>
          </div>
        </div>

        <button onClick={clearLocalStorage}>Cerrar Sesion</button>
      </div>

      <div className="flex flex-col items-center justify-center h-full py-10">
        <h3 className="text-4xl font-semibold text-gray-700 mb-6">
          Ingresar Archivos a la Biblioteca
        </h3>
        <Link
          to="/ingresarArchivosBiblioteca"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Ingresar Archivos
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
