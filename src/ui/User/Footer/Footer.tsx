import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-black py-4">
      <div className="container mx-auto px-4">
        <div className="mt-8 pt-2 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Inmobiliaria. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
