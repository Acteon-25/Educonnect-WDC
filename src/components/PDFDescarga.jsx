import React from 'react';

const PDFDescarga = ({ urlEnlace, titulo }) => {
  const downloadPdfFromUrl = async () => {

    try {
      const response = await fetch(urlEnlace);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = blobUrl;
      a.download = `${titulo}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };
  return (
    <div>
      <button onClick={downloadPdfFromUrl}>Descargar PDF</button>
    </div>
  );
};

export default PDFDescarga;
