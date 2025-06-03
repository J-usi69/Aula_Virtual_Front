const Footer = () => {
  return (
    <footer className="scale-z-50 bg-footer text-footer py-6 mt-auto ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-sm">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Aula Inteligente. Todos los derechos reservados.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <a href="#" className="hover:underline">Términos</a>
          <a href="#" className="hover:underline">Privacidad</a>
          <a href="#" className="hover:underline">Soporte</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
