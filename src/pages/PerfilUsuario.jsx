import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correoElectronico: '',
    tipoUsuario: '',
    estado: '',
  });

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No hay token disponible');
        }
        const response = await axios.get('https://educonnectb.onrender.com/estudiantes/perfil', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuario(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        setError('No se pudo cargar la información del perfil.');
      }
    };

    obtenerDatosUsuario();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://educonnectb.onrender.com/estudiantes/actualizar', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsuario(formData);
      setEditando(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setError('No se pudo actualizar el perfil.');
    }
    alert('Datos cambiados exitosamente exitoso')
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!usuario) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SideBar />
      <div className="container mx-auto p-6 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Mi Perfil</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex flex-col">
            <label htmlFor="nombre" className="mb-1 text-sm font-medium text-gray-700">
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ''}
              onChange={handleChange}
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="correoElectronico" className="mb-1 text-sm font-medium text-gray-700">
              Correo electrónico:
            </label>
            <input
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico || ''}
              onChange={handleChange}
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tipoUsuario" className="mb-1 text-sm font-medium text-gray-700">
              Tipo de Usuario:
            </label>
            <input
              type="text"
              name="tipoUsuario"
              value={formData.tipoUsuario || ''}
              disabled={!editando}
              onChange={handleChange}
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="estado" className="mb-1 text-sm font-medium text-gray-700">
              Estado:
            </label>
            <input
              type="text"
              name="estado"
              value={formData.estado || ''}
              onChange={handleChange}
              disabled={!editando}
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default PerfilUsuario;
