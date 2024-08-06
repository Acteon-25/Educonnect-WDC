import Goals from "../components/Goals";
import SectionContainer from "../components/SectionContainer";
import Profesor from '../img/ProfesorOscuro.jpeg'
import Alumno from '../img/AlumnoOscuro.jpeg'
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <SectionContainer className="grid grid-cols-2 items-center my-8">
        <h1 className="md:text-5xl text-3xl font-bold">Donde el conocimiento y el éxito se encuentran</h1>
        <img src="https://st2.depositphotos.com/2379655/7898/i/450/depositphotos_78986424-stock-photo-curious-school-student-reading-a.jpg" alt="" className="w-full rounded-lg shadow-lg" />
      </SectionContainer>
      <SectionContainer className="text-center md:my-12 ">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">Nuestros Éxitos</h2>
          <p className="text-lg mt-2">Estamos orgullosos de la enseñanza que brindan nuestros asesores, pendientes siempre de la educación que se imparte a los alumnos</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Goals num="12K+" text="Estudiantes" />
          <Goals num="500+" text="Libros" />
          <Goals num="20K+" text="Asesores" />
          <Goals num="40+" text="Convenios y alianzas" />
        </div>
      </SectionContainer>
      <SectionContainer className="text-center my-12">
        <h2 className="text-3xl font-semibold mb-4">¿Qué tal es Educconect?</h2>
        <p className="text-lg mb-8">Es la mejor plataforma para conocer a los alumnos y asesores de la educación digital, y para compartir experiencias y conocimientos.</p>
        <div className="grid grid-cols-2 gap-4 px-8">
          <div className="bg-local bg-cover aspect-video w-full rounded-xl flex flex-col justify-center items-center text-white p-4" style={{ backgroundImage: `url(${Alumno})` }}>
            <h3 className="text-3xl font-bold mb-3">Para estudiante</h3>
            <button className="border border-white rounded-xl py-2 px-4 hover:bg-white hover:text-black transition duration-300" onClick={() => navigate("/registerAlumno")}>
              Comenzar clases hoy
            </button>
          </div>
          <div className="bg-local bg-cover aspect-video w-full rounded-xl flex flex-col justify-center items-center text-white p-4" style={{ backgroundImage: `url(${Profesor})` }}>
            <h3 className="text-3xl font-bold mb-3">Para asesor</h3>
            <button className="border border-white rounded-xl py-2 px-4 hover:bg-white hover:text-black transition duration-300" onClick={() => navigate("/registerAsesor")}>
              Comenzar a enseñar hoy
            </button>
          </div>
        </div>
      </SectionContainer>
      <Footer />
    </>
  );
}

export default HomePage;
