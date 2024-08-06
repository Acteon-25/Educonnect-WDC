import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBarAsesor'
import { Link } from 'react-router-dom';

function PerfilAsesor() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({})

  const handleClickDelete = () => {
    axios.delete("https://educonnectb.onrender.com/membresias/cancelar", {
      headers: {
        'Authorization': `Bearer ${tokenCancelar}`
      }
    })
    alert("Membresia cancelada con exito")
  }

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No hay token disponible');
        }

        const response = await axios.get('https://educonnectb.onrender.com/asesores/perfil', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuario(response.data);
        setFormData({
          especialidad: response.data.especialidad,
          horarioDisponibilidad: response.data.horarioDisponibilidad,
        })
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
      await axios.put('https://educonnectb.onrender.com/asesores/actualizar', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Se guardaron los cambios con exito")

    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setError('No se pudo actualizar el perfil.');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!usuario) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4">
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
              disabled={true}
              name="nombre"
              value={usuario.usuario.nombre || ''}
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
              value={usuario.usuario.correoElectronico || ''}
              disabled={true}
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
              value={usuario.usuario.tipoUsuario || ''}
              disabled={true}
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
              value={usuario.usuario.estado || ''}
              onChange={handleChange}
              disabled={true}
              className="p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="estado" className="mb-1 text-sm font-medium text-gray-700">
              Especialidad:
            </label>
            <input
              type="text"
              name="especialidad"
              value={formData.especialidad || ''}
              onChange={handleChange}
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

      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="container mx-auto p-6 max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Eliminar Membresia</h1>
          <p className="text-gray-600 text-center mb-6">
            ¿Estás seguro de que deseas eliminar tu membresia?
          </p>
          <Link to="/">
            <button
              onClick={handleClickDelete}
              className="w-full bg-indigo-600 text-white p-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar Membresia
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PerfilAsesor;
