import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
  const tables = [
    {
      name: "Nord",
      dropdown: [
        { name: "Angajat Nord", path: "/angajatNord" },
        { name: "Cursa Nord", path: "/cursaNord" },
        { name: "Detalii Cursa Nord", path: "/getcursaNord" },
        { name: "Locatii Nord", path: "/locatiiNord" }
      ]
    },
    {
      name: "Sud",
      dropdown: [
        { name: "Angajat Sud", path: "/angajatSud" },
        { name: "Cursa Sud", path: "/cursaSud" },
        { name: "Detalii Cursa Sud", path: "/getcursaSud" },
        { name: "Locatii Sud", path: "/locatiiSud" }
      ]
    },
    {
      name: "Central",
      dropdown: [
        { name: "Angajat Central", path: "/angajatCentral" },
        { name: "Cursa Central", path: "/cursaCentral" },
        { name: "Detalii Cursa Central", path: "/getcursaCentral" },
        { name: "Locatii Central", path: "/locatiiCentral" }
      ]
    },
    { name: "Angajati", path: "/angajat" },
    { name: "Clienti", path: "/client" },
    { name: "Curse", path: "/cursa" },
    { name: "Detalii curse", path: "/getcursa"},
    { name: "Discounturi", path: "/discount"},
    { name: "Facturi", path: "/factura" },
    { name: "Locatii", path: "/locatii" },
    { name: "Masini", path: "/masina" },
    { name: "Istoric soferi", path: "/istoricsoferi" },
    { name: "Lucreaza in", path: "/lucreaza" }
  ];  

  return (
    <header className="header">
      <div className="logo"><NavLink to="/" className="nav-item">
      Ride Best
              </NavLink></div>
      <nav>
        <ul className="nav-links">
          {tables.map((table) => (
            <li key={table.name} className="nav-item">
              {!table.dropdown ? (
                <NavLink to={table.path} className="nav-link">
                  {table.name}
                </NavLink>
              ) : (
                <div className="dropdown">
                  <span className="dropdown-title">{table.name}</span>
                  <ul className="dropdown-menu">
                    {table.dropdown.map((item) => (
                      <li key={item.name}>
                        <NavLink to={item.path} className="dropdown-link">
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
