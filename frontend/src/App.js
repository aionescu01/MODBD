import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";

import AngajatManagement from "./Components/Angajat";
import ClientManagement from "./Components/Client";
import CurseManagement from "./Components/Cursa";
import DetaliiCursaManagement from "./Components/DetaliiCursa";
import DiscountManagement from "./Components/Discount";
import FacturaManagement from "./Components/Factura";
import IstoricSoferiManagement from "./Components/IstoricSoferi";
import LocatiiManagement from "./Components/Locatii";
import LucreazaInManagement from "./Components/LucreazaIn";
import MasiniManagement from "./Components/Masini";

import AngajatNordManagement from "./Components/AngajatNord";
import CurseNordManagement from "./Components/CursaNord";
import DetaliiCursaNordManagement from "./Components/DetaliiCursaNord";
import LocatiiNordManagement from "./Components/LocatiiNord";

import AngajatSudManagement from "./Components/AngajatSud";
import CurseSudManagement from "./Components/CursaSud";
import DetaliiCursaSudManagement from "./Components/DetaliiCursaSud";
import LocatiiSudManagement from "./Components/LocatiiSud";

import AngajatCentralManagement from "./Components/AngajatCentral";
import CurseCentralManagement from "./Components/CursaCentral";
import DetaliiCursaCentralManagement from "./Components/DetaliiCursaCentral";
import LocatiiCentralManagement from "./Components/LocatiiCentral";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/angajat" element={<AngajatManagement />} />
        <Route path="/client" element={<ClientManagement />} />
        <Route path="/cursa" element={<CurseManagement />} />
        <Route path="/getcursa" element={<DetaliiCursaManagement />} />
        <Route path="/discount" element={<DiscountManagement />} />
        <Route path="/factura" element={<FacturaManagement />} />
        <Route path="/istoricsoferi" element={<IstoricSoferiManagement />} />
        <Route path="/locatii" element={<LocatiiManagement />} />
        <Route path="/lucreaza" element={<LucreazaInManagement />} />
        <Route path="/masina" element={<MasiniManagement />} />

        <Route path="/angajatNord" element={<AngajatNordManagement />} />
        <Route path="/cursaNord" element={<CurseNordManagement />} />
        <Route path="/getcursaNord" element={<DetaliiCursaNordManagement />} />
        <Route path="/locatiiNord" element={<LocatiiNordManagement />} />

        <Route path="/angajatSud" element={<AngajatSudManagement />} />
        <Route path="/cursaSud" element={<CurseSudManagement />} />
        <Route path="/getcursaSud" element={<DetaliiCursaSudManagement />} />
        <Route path="/locatiiSud" element={<LocatiiSudManagement />} />

        <Route path="/angajatCentral" element={<AngajatCentralManagement />} />
        <Route path="/cursaCentral" element={<CurseCentralManagement />} />
        <Route path="/getcursaCentral" element={<DetaliiCursaCentralManagement />} />
        <Route path="/locatiiCentral" element={<LocatiiCentralManagement />} />
      </Routes>
    </Router>
  );
}


export default App;
