import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Alumno from '../img/AlumnoOscuro.jpeg';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionContainer from "../components/SectionContainer";
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [contrasena, setContrasena] = useState();

  async function login() {
    try {
      const details = {
        correoElectronico: email,
        contrasena: contrasena,
      }

      const response = await axios.post('https://educonnectb.onrender.com/login', details);
      const token = response.data.token;
      const tipoUsuario = response.data.tipoUsuario;
      localStorage.setItem('token', token);

      if (tipoUsuario == "ESTUDIANTE") {
        const resEstudiante = await axios.get("https://educonnectb.onrender.com/estudiantes/perfil", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const ruta = resEstudiante.data.idUsuario
        localStorage.setItem('id', ruta);
        localStorage.setItem('idEstudiante', ruta);
        localStorage.setItem('idNotificacion', ruta);
        localStorage.setItem('tipoUsuario', tipoUsuario)
        navigate(`/login/${ruta}`)

      } else if (tipoUsuario == "ASESOR") {

        const resAsesor = await axios.get("https://educonnectb.onrender.com/asesores/perfil", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const ruta = resAsesor.data.usuario.idUsuario
        const ruta2 = resAsesor.data.idAsesor
        localStorage.setItem('id', ruta2)
        localStorage.setItem('idAsesor', ruta);
        localStorage.setItem('idNotificacion', ruta);
        localStorage.setItem('tipoUsuario', tipoUsuario)
        navigate(`/login/asesor/${ruta}`)

      } else if (tipoUsuario == "ADMIN") {
        navigate("/dashboard")
      }
    } catch (e) {
      alert("Credenciales Incorrectas")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login()
  }

  return (
    <>
      <Header />
      <SectionContainer className="grid sm:grid-cols-2  sm:py-16 p-5 lg:w-auto gap-4 place-items-center sm:my-32 md:place-items-center md:my-24 xl:my-0">
        <img src={Alumno} alt="" className="rounded-xl aspect-square sm:w-[300px] md:w-[380px] xl:w-[550px] " />
        <form onSubmit={handleSubmit}>
          <h2>Bienvenido</h2>
          <div className="border rounded-full py-3 px-4 grid grid-cols-1">
            <NavLink className="bg-sky-500 rounded-full text-white py-2 text-center" to={"/login"}>
              Login
            </NavLink>
          </div>
          <p>Es necesario iniciar sesion en Educonnect para acceder al contenido</p>
          <h3>Correo</h3>
          <input type="text" placeholder="Ingrese su Correo" className="border border-sky-500 rounded-full px-4 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <h3>Contraseña: </h3>
          <input type="password" placeholder="Ingrese su contraseña" className="border border-sky-500 rounded-full px-4 py-1"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)} />
          <button className="bg-sky-500 rounded-full text-white px-6 py-1 block my-4" >
            Login
          </button>
          <Link className="text-sky-500 hover:text-sky-900 transition duration-300 underline font-medium" to="/restablecer-clave">Olvidaste tu contraseña?</Link>

        </form>
        <div className="flex flex-row gap-2 my-3">
          <p className="text-gray-600">
            ¿Eres nuevo en EduConnect?
          </p>
          <Link className="text-red-600 underline" to="/registerAlumno">Registrate</Link>
        </div>
      </SectionContainer>
      <Footer />
    </>
  );
};

export default LoginPage;
