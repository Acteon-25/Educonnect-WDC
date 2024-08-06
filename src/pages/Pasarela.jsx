import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios'

function Pasarela() {
  const navigate = useNavigate();

  const [numeroTarjeta, setNumeroTarjeta] = useState();
  const [fechaVencimiento, setFechaVencimiento] = useState();
  const [cvv, setCVV] = useState();
  const { plan, precio } = useParams();

  async function comprarMembresia() {

    const compra = {
      tipoMembresia: plan,
      tokenTemporal: localStorage.getItem('token'),
      datosPago: {
        "numeroTarjeta": numeroTarjeta,
        "fechaVencimiento": fechaVencimiento,
        "cvv": cvv,
      }
    }
    try {
      const response = await axios.post('https://educonnectb.onrender.com/membresias/comprar', compra)
      console.log("Compra exitosa")
      const token = response.data
      localStorage.setItem('token', token)
    } catch (e) {
      console.error('Error al comprar la membresía:', e);
    }
  }

  const handleClick = (() => {
    comprarMembresia()
    navigate('/login')
  })

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg w-full max-w-4xl">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CreditCardIcon className="w-6 h-6 text-primary" />
                <h2 className="text-lg font-semibold">Pasarela de pagos</h2>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Numero de Tarjeta
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                  onChange={(e) => setNumeroTarjeta(e.target.value)}
                  className="w-full shadow-xl rounded-md px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Fecha de expiración
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      onChange={(e) => setFechaVencimiento(e.target.value)}
                      maxLength="4"
                      className="w-1/2 shadow-xl rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    maxLength="3"
                    onChange={(e) => setCVV(e.target.value)}
                    placeholder="123"
                    className="w-full border-gray-300 rounded-md px-3 py-2 shadow-lg"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-md shadow-md"
                onClick={handleClick}
              >
                Pagar
              </button>
            </form>
          </div>
          <div className="bg-gray-100 rounded-r-lg px-6 py-8 flex flex-col gap-6 pt-18">
            <div>
              <h3 className="text-lg font-semibold mb-2">Resumen de la compra</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Plan</span>
                <span>{plan}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Precio</span>
                <span>{precio}</span>
              </div>
              <div className="flex items-center justify-between font-bold mt-12">
                <span>Total</span>
                <span>S/{precio}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 pt-5">
                    Todos los pagos realizados están seguros
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

export default Pasarela;
