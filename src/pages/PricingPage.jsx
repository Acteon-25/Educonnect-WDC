import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingCard from "../components/PricingCard";

const PricingPage = () => {
  return (
    <>
      <Header />
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nuestros Planes de Suscripción
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Elige el plan que mejor se adapte a tus necesidades de
              aprendizaje.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <PricingCard
              plan="Básico"
              precio="49.99"
              caracteristicas={[
                "Acceso a asesorias personalizadas",
                "Soporte en horario laboral",
                "Foro",
                "Acceso limitado a material de la biblioteca",
                "Comentarios y evaluaciones sobre asesorías",
                "Elección de Asesores",
              ]}
              value="ESTUDIANTE_ESTANDAR"
            />
            <PricingCard
              plan="Premium"
              precio="79.99"
              caracteristicas={[
                "Acceso ilimitado a la biblioteca virtual",
                "Soporte 24hs",
                "Acceso a reportes de notas y comentarios del alumno",
                "Elección de Asesores",
              ]}
              highlighted
              value="ESTUDIANTE_PRO"
            />
            <PricingCard
              plan="Grupal Premium"
              precio="119.99"
              caracteristicas={[
                "Asesorías grupales",
                "Capacitación Soporte 24hs",
                "Acceso ilimitado a la biblioteca virtual",
              ]}
              value="ESTUDIANTE_PRO"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PricingPage;
