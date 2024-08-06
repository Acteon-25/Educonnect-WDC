import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from "../components/SideBar";

function UsuarioCalificacionesPage() {
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const getCalificaciones = async () => {
      try {
        const response = await axios.get(
          `https://educonnectb.onrender.com/estudiantes/${id}/calificaciones`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cali = response.data;
        const nuevasCalis = cali.map(el => ({
          asesor: el.sesion.asesor.usuario.nombre,
          fechaSesion: new Date(el.sesion.fechaHora).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
          tema: el.nombreMateria,
          calificacion: el.calificacion,
          comentario: el.comentario,
        }));
        setCalificaciones(nuevasCalis);
      } catch (e) {
        console.log(e);
      }
    };

    getCalificaciones();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100 mt-10">
      <SideBar />
      <div className="flex-1 min-w-0">
        <div className="py-10 px-4">
          <h1 className="text-2xl font-bold mb-6 text-center">Calificaciones del Alumno</h1>
          <div className="w-full max-w-6xl mx-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Asesor</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Fecha Sesion</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Tema Visto</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Calificación</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Comentario</th>
                </tr>
              </thead>
              <tbody>
                {calificaciones.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-4 px-4 border-b border-gray-200 text-gray-700 text-sm">
                        {cellIndex === 1 ? (
                          <div>{cell}</div>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsuarioCalificacionesPage;
