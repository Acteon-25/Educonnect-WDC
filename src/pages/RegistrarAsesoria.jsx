import { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { useForm } from "react-hook-form";

function RegistrarAsesoria() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [asesores, setAsesores] = useState([]);
  const [horarios, setHorarios] = useState({});
  const [intervalo, setIntervalo] = useState();
  const [asesorSeleccionado, setAsesorSeleccionado] = useState();

  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    console.log(token);
    const { dia, hora } = data;
    const sesion = {
      fechaHora: `${dia}T${hora}:00`,
      idAsesor: asesorSeleccionado,
    };
    console.log(sesion);

    const enviarSesion = async () => {
      try {
        await axios.post("https://educonnectb.onrender.com/sesiones/solicitar", sesion, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Sesión creada");
        reset()
        setIntervalo('')
      } catch (e) {
        console.log(e);
        alert("Horario no disponible");
      }
    };

    enviarSesion();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getAsesores = async () => {
      try {
        const response = await axios.get(
          "https://educonnectb.onrender.com/estudiantes/asesores",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAsesores(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getAsesores();
  }, []);

  const handleChange = (event) => {
    const selectedNombre = event.target.value;
    const selectedAsesor = asesores.find(
      (asesor) => asesor.usuario.nombre === selectedNombre
    );
    const selectedHorario = selectedAsesor.horarioDisponibilidad;
    setHorarios(JSON.parse(selectedHorario));
    setAsesorSeleccionado(selectedAsesor.idAsesor);
  };

  const handleChangeDia = (event) => {
    const selectedFecha = event.target.value;
    const diasSemana = [
      "domingo",
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
    ];

    const fecha = new Date(selectedFecha);
    const selectedDia = diasSemana[fecha.getUTCDay()];

    if (horarios[selectedDia]) {
      setIntervalo(horarios[selectedDia]);
    } else {
      setIntervalo(null);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Registrar Asesoría
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="asesor"
                className="block text-lg font-medium text-gray-700"
              >
                Asesor:
              </label>
              <select
                id="asesores"
                name="asesores"
                onChange={handleChange}
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Selecciona un asesor</option>
                {asesores.map((asesor) => (
                  <option key={asesor.idAsesor} value={asesor.usuario.nombre}>
                    {asesor.usuario.nombre}
                  </option>
                ))}
              </select>
              {errors.asesor && (
                <p className="text-red-600 mt-2 text-sm">
                  {errors.asesor.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dia"
                className="block text-lg font-medium text-gray-700"
              >
                Día:
              </label>
              <input
                type="date"
                id="dia"
                name="dia"
                {...register("dia", { required: "Campo requerido" })}
                onChange={handleChangeDia}
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.dia && (
                <p className="text-red-600 mt-2 text-sm">
                  {errors.dia.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="sesion"
                className="block text-lg font-medium text-gray-700"
              >
                Fechas Disponibles:
              </label>
              {intervalo ? (
                <p className="mt-1 p-3 block w-full rounded-md border border-gray-300 bg-gray-100">
                  El rango disponible para ese día es de {intervalo}
                </p>
              ) : (
                <p className="mt-1 p-3 block w-full rounded-md border border-gray-300 bg-gray-100">
                  No hay Horarios
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="hora"
                className="block text-lg font-medium text-gray-700"
              >
                Ingresar Hora:
              </label>
              <input
                {...register("hora", {
                  required: "Campo Requerido",
                })}
                type="time"
                id="hora"
                name="hora"
                className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.hora && (
                <p className="text-red-600 mt-2 text-sm">
                  {errors.hora.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded w-full transition duration-300"
            >
              Registrar Asesoría
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrarAsesoria;
