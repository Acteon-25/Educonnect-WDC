import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "../icons/Avatar.svg";
import SideBarAsesor from '../components/SideBarAsesor'

function DetailsAceptarSesion() {
  const { id } = useParams();
  const [asesor, setAsesor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAsesor = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        console.log(id)
        const response = await axios.get(
          `https://educonnectb.onrender.com/sesiones/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAsesor(response.data);
      } catch (error) {
        console.error("Error fetching asesor details:", error);
      }
    };
    fetchAsesor();
  }, [id]);

  const handleAceptar = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://educonnectb.onrender.com/sesiones/${id}/aceptar`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/aceptarSesionAsesor')
    } catch (error) {
      console.error("Error al aprobar asesor:", error);
    }
  };

  const handleRechazar = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://educonnectb.onrender.com/sesiones/${id}/rechazar`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );
      navigate('/aceptarSesionAsesor')
    } catch (error) {
      console.error("Error al rechazar asesor:", error);

    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!asesor) {
    return <div className="text-center mt-8">Cargando...</div>;
  }

  return (
    <>
      <SideBarAsesor />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 md:p-8">

        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <img
                src={Avatar}
                alt={`${asesor.usuario.nombre} avatar`}
                className="w-20 h-20 rounded-full"
              />
              <div className="text-center">
                <h3 className="text-lg font-medium dark:text-gray-900">
                  {asesor.usuario.nombre}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Alumno
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="text-lg font-medium dark:text-gray-900">
                      Correo Electrónico
                    </h4>
                    <p className="text-sm dark:text-gray-500">
                      {asesor.usuario.correoElectronico}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="text-lg font-medium dark:text-gray-900">
                      Nombre
                    </h4>
                    <p className="text-sm dark:text-gray-500">
                      {asesor.usuario.nombre}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="text-lg font-medium dark:text-gray-900">
                      Fecha y Hora
                    </h4>
                    <p className="text-sm dark:text-gray-500">
                      {`${asesor.fechaHora.split('T')[0]} ${asesor.fechaHora.split('T')[1]}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleAceptar}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Aceptar
              </button>
              <button
                onClick={handleRechazar}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Rechazar
              </button>
            </div>

          </div>
        </div>
      </div>
    </>

  );
}

export default DetailsAceptarSesion;
