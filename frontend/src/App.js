import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeManagement from "./Components/AngajatDetails";
import ClientManagement from "./Components/Client";
import CurseManagement from "./Components/Cursa";
import DetaliiCursaManagement from "./Components/DetaliiCursa";
import FacturaManagement from "./Components/Factura";
import IstoricSoferiManagement from "./Components/istoricsoferi";
import LocatiiManagement from "./Components/Locatii";
import LucreazaInManagement from "./Components/LucreazaIn";
import MasiniManagement from "./Components/Masini";
import Home from "./Components/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/angajat" element={<EmployeeManagement />} />
        <Route path="/client" element={<ClientManagement />} />
        <Route path="/cursa" element={<CurseManagement />} />
        <Route path="/getcursa" element={<DetaliiCursaManagement />} />
        <Route path="/factura" element={<FacturaManagement />} />
        <Route path="/istoricsoferi" element={<IstoricSoferiManagement />} />
        <Route path="/locatii" element={<LocatiiManagement />} />
        <Route path="/lucreaza" element={<LucreazaInManagement />} />
        <Route path="/masina" element={<MasiniManagement />} />
      </Routes>
    </Router>
  );
}


export default App;
