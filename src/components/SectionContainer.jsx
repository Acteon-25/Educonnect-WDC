const SectionContainer = ({ children, className }) => {

  return (
    <section className={`${className} w-full mx-auto lg:w-[740px]`}>
      {children}
    </section>
  )
}

export default SectionContainer