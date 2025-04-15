import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Inmobiliaria</h4>
            <p className="text-sm">Encuentra tu hogar ideal con nosotros.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Enlaces rápidos</h4>
            <ul className="text-sm space-y-1">
              <li>
                <a href="/about" className="hover:underline">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="/properties" className="hover:underline">
                  Propiedades
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contacto</h4>
            <p className="text-sm">Email: contacto@inmobiliaria.com</p>
            <p className="text-sm">Teléfono: +34 123 456 789</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
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
