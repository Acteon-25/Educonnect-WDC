/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Buscador from '../icons/Buscador.svg';
import Foto from '../img/Foto.png';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Notifications from '../components/Notifications';
import Fondo from '../img/FondoHector.png';
import Sesiones from '../components/Sesiones'; 

const token = localStorage.getItem("token");
const id = localStorage.getItem('id');

const LoginUserPage = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');

  const getNombre = () => {
    axios.get("https://great-emili-educonnect-56088bf2.koyeb.app/estudiantes/perfil", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setNombre(res.data.nombre);
      });
  };

  useEffect(() => {
    getNombre();
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ backgroundImage: `url(${Fondo})` }} className='bg-cover bg-no-repeat bg-center h-screen bg-transparent'>
      <SideBar />

      <div className='flex px-10 pb-10 pt-20 gap-4 w-screen justify-between'>
        <div className='flex float-right gap-1'>
          <button onClick={clearLocalStorage}>Cerrar Sesion</button>
          <img src={Buscador} alt="" />
          <input type="text" placeholder='Buscar' />
        </div>
        <div className='flex float-left gap-4'>
          <button className='bg-green-500 rounded-xl py-1 px-3'> + Nueva Asesoria</button>
          <Notifications />
          <img src={Foto} alt="" className='size-12 rounded-full' />
          <h2>Bienvenido {nombre}</h2>
          <p>Alumno</p>
        </div>
      </div>

      <div className='grid grid-cols-3 place-items-center'>
        <div className='flex flex-col gap-4'>
          Asesorias
        </div>

        <div className='flex flex-col gap-4'>
          Tareas
        </div>

        <Sesiones userId={id} />
      </div>
    </div>
  );
}

export default LoginUserPage;
