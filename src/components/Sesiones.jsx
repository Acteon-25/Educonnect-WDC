/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import sesionService from '../services/sesionesService';
import { Link } from 'react-router-dom';
import axios from 'axios';

const idNotificacion = localStorage.getItem('idNotificacion');
const token = localStorage.getItem('token');
const tipoUsuario = localStorage.getItem('tipoUsuario');

const Sesiones = ({ userId }) => {
  const [sesiones, setSesiones] = useState([]);

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        let response = null;
        if (tipoUsuario === 'ESTUDIANTE') {
          response = await axios.get(`http://localhost:8080/estudiantes/${userId}/sesiones`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else if (tipoUsuario === 'ASESOR') {
          response = await axios.get(`http://localhost:8080/asesores/${userId}/sesiones`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          throw new Error('Tipo de usuario no válido');
        }

        if (response && response.data) {
          const filtro = response.data.filter((sesion) => sesion.estado === 'PROGRAMADA');
          setSesiones(filtro);
        }
      } catch (error) {
        console.error('Error al obtener sesiones:', error);
      }
    };

    fetchSesiones();

    const handleSesionUpdate = (sesionData) => {
      setSesiones((prevSesiones) => {
        if (sesionData.estado === 'CANCELADA') {
          return prevSesiones.filter((sesion) => sesion.idSesion !== sesionData.idSesion);
        }

        const existingSesion = prevSesiones.find(
          (sesion) => sesion.idSesion === sesionData.idSesion
        );
        if (existingSesion) {
          return prevSesiones.map((sesion) =>
            sesion.idSesion === sesionData.idSesion ? sesionData : sesion
          );
        }
        return [...prevSesiones, sesionData];
      });
    };

    sesionService.connect(idNotificacion, handleSesionUpdate);

    return () => {
      sesionService.disconnect();
    };
  }, [userId]);

  const handleDelete = async (idSesion) => {
    try {
      if (tipoUsuario === 'ESTUDIANTE') {
        await axios.delete(`http://localhost:8080/estudiantes/${idSesion}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (tipoUsuario === 'ASESOR') {
        await axios.delete(`http://localhost:8080/asesores/${idSesion}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setSesiones((prevSesiones) => prevSesiones.filter((sesion) => sesion.idSesion !== idSesion));
    } catch (error) {
      console.error('Error al eliminar la sesión:', error);
    }
  };

  return (
    <div className="w-auto max-w-3xl bg-gray-300 shadow-md rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Sesiones</h2>
      </div>
      {sesiones && sesiones.length > 0 ? (sesiones.map((sesion) => (
        <div key={sesion.idSesion}>
          <div className="p-4 space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg bg-gray-100 p-4">
                <div className="space-y-1">
                  <div className="font-medium">Sesión con : {tipoUsuario === 'ESTUDIANTE'
                    ? sesion.asesor.usuario.nombre
                    : sesion.usuario.nombre}
                    {console.log(sesion)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {`${sesion.fechaHora.split('T')[0]} ${sesion.fechaHora.split('T')[1]}`}
                  </div>
                </div>
                <div className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                  PROGRAMADO
                </div>
                <Link to={sesion.urlJitsi} className="text-blue-500 hover:text-blue-700">
                  Enlace a la sesión
                </Link>
                <button
                  onClick={() => handleDelete(sesion.idSesion)}
                  className="justify-self-end border border-gray-300 rounded-lg py-1 px-3 bg-white hover:bg-gray-50"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))) : null}
    </div>
  );
};

export default Sesiones;
