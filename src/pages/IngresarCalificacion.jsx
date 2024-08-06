import axios from "axios";
import SideBar from "../components/SideBarAsesor";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function CalificarEstudiante() {
  const [usuarios, setUsuarios] = useState([]);
  const MySwal = withReactContent(Swal);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    const [idUsuario, idSesion] = data.estudiante.split('-');

    const { materia, calificacion, comentario } = data;
    const enviarCalificacion = {
      usuario: {
        idUsuario: idUsuario,
      },
      nombreMateria: materia,
      calificacion: calificacion,
      fecha: new Date().toISOString(),
      comentario: comentario,
    };

    try {
      await axios.post(
        `https://educonnectb.onrender.com/asesores/${idSesion}/calificaciones`, enviarCalificacion,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      MySwal.fire({
        title: '¡Exito!',
        text: 'Calificación Ingresada',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const getUsuarios = async () => {
      try {
        const response = await axios.get(
          `https://educonnectb.onrender.com/asesores/${id}/sesiones`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const users = response.data;
        const nuevasUsuarios = users.map(el => ({
          idUsuario: el.usuario.idUsuario,
          nombre: el.usuario.nombre,
          sesion: el.idSesion,
          fechaHora: new Date(el.fechaHora).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        }));
        setUsuarios(nuevasUsuarios);
      } catch (e) {
        console.log(e);
      }
    };

    getUsuarios();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Calificar Estudiante
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="estudiante"
                className="block text-lg font-medium text-gray-700"
              >
                Estudiante:
              </label>
              <select
                {...register('estudiante', {
                  required: 'Campo Requerido',
                  maxLength: {
                    value: 20,
                    message: 'Máximo caracteres 20'
                  }
                })}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">-- Selecciona Estudiante --</option>
                {usuarios.map(u => (
                  <option value={`${u.idUsuario}-${u.sesion}`} key={u.sesion}>{u.nombre} - {u.fechaHora}</option>
                ))}
              </select>
              {errors.estudiante && <p className="text-red-600 mt-2 text-sm">{errors.estudiante.message}</p>}
            </div>
            <div>
              <label
                htmlFor="materia"
                className="block text-lg font-medium text-gray-700"
              >
                Materia:
              </label>
              <input
                {...register('materia', {
                  required: 'Campo Requerido',
                  maxLength: {
                    value: 20,
                    message: 'Máximo caracteres 20'
                  }
                })}
                type="text"
                id="materia"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.materia && <p className="text-red-600 mt-2 text-sm">{errors.materia.message}</p>}
            </div>
            <div>
              <label
                htmlFor="calificacion"
                className="block text-lg font-medium text-gray-700"
              >
                Calificación:
              </label>
              <input
                {...register('calificacion', {
                  required: 'Campo Requerido',
                  max: {
                    value: 20,
                    message: 'Máximo de nota 20'
                  }
                })}
                type="number"
                id="calificacion"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.calificacion && <p className="text-red-600 mt-2 text-sm">{errors.calificacion.message}</p>}
            </div>
            <div>
              <label
                htmlFor="comentario"
                className="block text-lg font-medium text-gray-700"
              >
                Comentario:
              </label>
              <textarea
                {...register('comentario', {
                  required: 'Campo Requerido',
                })}
                id="comentario"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.comentario && <p className="text-red-600 mt-2 text-sm">{errors.comentario.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded w-full transition duration-300"
            >
              Enviar Calificación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CalificarEstudiante;
