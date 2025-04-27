import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
  const tables = [
    { name: "Angajati", path: "/angajat" },
    { name: "Clienti", path: "/client" },
    { name: "Curse", path: "/cursa" },
    { name: "Detalii curse", path: "/getcursa"},
    { name: "Facturi", path: "/factura" },
    { name: "Locatii", path: "/locatii" },
    { name: "Masini", path: "/masina" },
    { name: "Soferi", path: "/istoricsoferi" },
    { name: "Lucreaza", path: "/lucreaza" }
  ];

  return (
    <header className="header">
      <div className="logo"><NavLink to="/" className="nav-item">
      Ride Best
              </NavLink></div>
      <nav>
        <ul className="nav-links">
          {tables.map((table) => (
            <li key={table.name}>
              <NavLink to={table.path} className="nav-item">
                {table.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
