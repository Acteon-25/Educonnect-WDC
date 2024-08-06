import { useEffect, useState } from "react";
import axios from 'axios'

// eslint-disable-next-line react/prop-types
function ArchivoAsesor({ archivo }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const obtenerURL = async () => {
      try {
        const response = await axios.get(
          `https://educonnectb.onrender.com/admin/archivos/${archivo.id}/descargar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
          }
        );
        const pdfBlob = response.data;
        const url = URL.createObjectURL(pdfBlob);
        setUrl(url);

      } catch (error) {
        console.log(error);
      }
    }
    obtenerURL()
  }, []);

  return (
    <div className="mb-2">
      <a
        download={archivo.nombreArchivo}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {archivo.nombreArchivo}
      </a>
      <p className="text-sm text-gray-500">
        Subido el {new Date(archivo.fechaSubida).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ArchivoAsesor;
