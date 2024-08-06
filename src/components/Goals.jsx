const Goals = ({ className, num, text }) => {

  return (
    <div>
      <h3 className={`${className} md:text-5xl text-4xl text-sky-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-sky-400`}>{num}</h3>
      <p className="md:text-lg text-md">{text}</p>
    </div>
  )
}

export default Goals