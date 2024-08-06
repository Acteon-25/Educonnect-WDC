import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../components/SideBarAsesor'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Disponibilidad() {

  const MySwal = withReactContent(Swal);

  const [horarios, setHorarios] = useState({
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: '',
    sabado: '',
    domingo: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const idAsesor = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const getHorarios = async () => {
      const response = await axios.get(
        `https://educonnectb.onrender.com/asesores/${idAsesor}/horario`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHorarios(response.data);
    };

    getHorarios();
  }, []);

  const onSubmit = (data) => {
    const nuevo = {
      lunes: data.lunes ? (data.lunes === 'Ninguno' ? [] : [data.lunes]) : horarios.lunes,
      martes: data.martes ? (data.martes === 'Ninguno' ? [] : [data.martes]) : horarios.martes,
      miercoles: data.miercoles ? (data.miercoles === 'Ninguno' ? [] : [data.miercoles]) : horarios.miercoles,
      jueves: data.jueves ? (data.jueves === 'Ninguno' ? [] : [data.jueves]) : horarios.jueves,
      viernes: data.viernes ? (data.viernes === 'Ninguno' ? [] : [data.viernes]) : horarios.viernes,
      sabado: data.sabado ? (data.sabado === 'Ninguno' ? [] : [data.sabado]) : horarios.sabado,
      domingo: data.domingo ? (data.domingo === 'Ninguno' ? [] : [data.domingo]) : horarios.domingo,
    };
    setHorarios(nuevo);

    sendHorarios(nuevo);
  };

  const idAsesor = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const sendHorarios = async (nuevo) => {
    try {
      await axios.put(
        `https://educonnectb.onrender.com/asesores/${idAsesor}/horario`,
        nuevo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      MySwal.fire({
        title: '¡Exito!',
        text: 'Tus horarios han sido actualizados correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Sidebar />
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Modificar Horarios</h2>

        <div className="grid grid-cols-3 gap-4 mb-2">
          <div></div>
          <div className="text-center font-semibold">Actual</div>
          <div className="text-center font-semibold">Nuevo</div>
        </div>

        {["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"].map((dia) => (
          <div key={dia} className="mb-4 grid grid-cols-3 gap-4 items-center">
            <label htmlFor={dia} className="block text-gray-700 capitalize">{dia}</label>
            <input
              type="text"
              id={dia}
              name={dia}
              value={horarios[dia]}
              readOnly
              className="border border-gray-300 p-2 rounded"
            />
            <select
              name={dia}
              {...register(dia)}
              className="border border-gray-300 p-2 rounded"
            >
              <option value=""></option>
              <option value="09:00-12:00">09:00-12:00</option>
              <option value="13:00-16:00">13:00-16:00</option>
              <option value="17:00-20:00">17:00-20:00</option>
              <option value="Ninguno">Sin disponibilidad</option>
            </select>
            {errors[dia] && <p className="text-red-600 mt-2 text-sm col-span-3">{errors[dia].message}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full mt-4 hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Disponibilidad;
