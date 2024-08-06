import axios from 'axios';
import { useEffect, useState } from 'react';
import SideBar from "../components/SideBar";
import { useNavigate } from 'react-router-dom';

function MembresiaDetallesPage() {
  const navigate = useNavigate()

  const handleClickDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete("https://educonnectb.onrender.com/membresias/cancelar", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    alert("Membresia cancelada con exito")
    navigate(-1)
  }

  const [urlPdf, setUrlPdf] = useState(null);
  const [detalles, setDetalles] = useState(null);

  const calcularProximaFechaFacturacion = (fecha) => {
    const fechaProximaFacturacion = new Date(fecha);
    fechaProximaFacturacion.setDate(fechaProximaFacturacion.getDate() + 1);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return fechaProximaFacturacion.toLocaleDateString('es-ES', options);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    const obtenerURL = async () => {
      try {
        const response = await axios.get(
          `https://educonnectb.onrender.com/membresias/mi-membresia/comprobante`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
          }
        );

        const pdfBlob = response.data;
        const url = URL.createObjectURL(pdfBlob);
        setUrlPdf(url);
      } catch (error) {
        console.log(error);
      }
    }

    obtenerURL()

    const getDetalles = async () => {
      try {
        const response = await axios.get(
          `https://educonnectb.onrender.com/membresias/mi-membresia`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;
        const nuevasDetalles = {
          tipo: user.tipoMembresia,
          fechaInicio: new Date(user.fechaInicio).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
          fechaFin: new Date(user.fechaFin).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
          proximaFechaFacturacion: calcularProximaFechaFacturacion(new Date(user.fechaFin))
        };
        setDetalles(nuevasDetalles);

      } catch (error) {
        console.log(error);
      }
    };

    getDetalles();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SideBar />
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-gray-900 mr-2">Detalles Membresia</h3>
              <div className="flex items-center space-x-2">
                <a
                  href={urlPdf}
                  download='Ultimo Comprobante.pdf'
                  className="bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100 font-semibold py-2 px-3 rounded transition duration-300 text-sm cursor-pointer"
                >
                  Descargar Comprobante
                </a>
                <button
                  onClick={handleClickDelete}
                  className="bg-transparent text-gray-800 font-semibold py-3 px-2 rounded transition duration-300 text-sm"
                >
                  Cancelar Membresia
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Plan de Membresia</h3>
                <p className="text-gray-600">{detalles ? detalles.tipo : 'Cargando...'}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Fecha de Inicio</h3>
                <p className="text-gray-600">{detalles ? detalles.fechaInicio : 'Cargando...'}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Fecha de Fin</h3>
                <p className="text-gray-600">{detalles ? detalles.fechaFin : 'Cargando...'}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Próxima Fecha de Facturación</h3>
                <p className="text-gray-600">{detalles ? detalles.proximaFechaFacturacion : 'Cargando...'}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-6 sm:px-10 sm:py-8">
            <p className="text-sm text-gray-500">
              Al cancelar tu membresía, perderás acceso a todas las funciones y beneficios premium. Tu cuenta no podrá tener ningún acceso a la plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembresiaDetallesPage;
