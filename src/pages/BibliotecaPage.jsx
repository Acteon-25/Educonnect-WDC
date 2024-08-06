import { useEffect, useState } from 'react'
import Libro from '../components/Libro';
import SectionContainer from '../components/SectionContainer';
import axios from "axios";
import SideBar from '../components/SideBar';

const BibliotecaPage = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://biblioteca-digital-api-production.up.railway.app/api/contenido')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (

    <>
      <SideBar />
      <SectionContainer className="py-16 px-5 lg:w-auto place-items-center my-0">
        <h2 className='text-4xl'>Libros de la Biblioteca</h2>
        <p className='text-xl'>Revise nuestro contenido educativo para obtener la mejor experiencia de aprendizaje</p>
      </SectionContainer>

      <SectionContainer className="py-8 px-5 lg:w-auto place-items-center my-4">
        <ul className='grid grid-cols-3 gap-4 my-4 justify-items-center '>
          {data?.map((item) => (
            <Libro key={item._id} title={item.titulo} imgUrl={item.caratula} idContenido={item._id}></Libro>
          ))}
        </ul>

      </SectionContainer>
    </>
  );
};
export default BibliotecaPage;