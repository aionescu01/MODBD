import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import './Home.css';
import { NavLink } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"

const Home = () => {
  const tablesOLTP = [
    { name: "Angajati", path: "/angajat" },
    { name: "Clienti", path: "/client" },
    { name: "Curse", path: "/cursa" },
    { name: "Detalii curse", path: "/getcursa"},
    { name: "Facturi", path: "/factura" },
    { name: "Locatii", path: "/locatii" },
    { name: "Masini", path: "/masina" },
    { name: "Soferi", path: "/istoricsoferi" },
    { name: "Lucreaza", path: "/lucreaza"}
  ];

  const images = [
    "/taxi.jpg",
    "/taxi2.jpg",
    "/taxi3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <motion.h1
          className="title"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Ride Best
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Bine ai venit la platforma noastră! Explorează serviciile și rapoartele oferite.
        </motion.p>


        <div className="carousel">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
        </div>

        {/* Carduri OLTP*/}
        <div className="card-container">
          {tablesOLTP.map((table) => (
            <div key={table.name} className="card">
              <h2>{table.name}</h2>
              <NavLink to={table.path} className="button">Vezi detalii</NavLink>
            </div>
          ))}
        </div>
        
      </main>
      <Footer />
    </div>
  );
};

export default Home;