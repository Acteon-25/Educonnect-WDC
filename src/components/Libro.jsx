import DescargarLink from "./DescargarLink"

const Libro = ({ title, imgUrl, idContenido }) => {

  return (
    <div className='w-72 grid grid-cols-1 grid-rows-1'>
      <h3 className="text-md text-center font-bold">{title}</h3>
      <img src={imgUrl} alt={imgUrl} className="w-full  h-[300px] rounded-xl" />
      <DescargarLink contenidoId={idContenido}></DescargarLink>
    </div>
  )
}

export default Libro