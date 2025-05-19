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

import AngajatNordManagement from "./Components/Nord/AngajatNord";
import CurseNordManagement from "./Components/Nord/CursaNord";
import DetaliiCursaNordManagement from "./Components/Nord/DetaliiCursaNord";
import LocatiiNordManagement from "./Components/Nord/LocatiiNord";
import AngajatContactNordManagement from "./Components/Nord/AngajatContactNord";
import ClientContactNordManagement from "./Components/Nord/ClientContactNord";

import AngajatSudManagement from "./Components/Sud/AngajatSud";
import CurseSudManagement from "./Components/Sud/CursaSud";
import DetaliiCursaSudManagement from "./Components/Sud/DetaliiCursaSud";
import LocatiiSudManagement from "./Components/Sud/LocatiiSud";
import AngajatContactSudManagement from "./Components/Sud/AngajatContactSud";
import ClientContactSudManagement from "./Components/Sud/ClientContactSud";

import AngajatCentralManagement from "./Components/Central/AngajatCentral";
import CurseCentralManagement from "./Components/Central/CursaCentral";
import DetaliiCursaCentralManagement from "./Components/Central/DetaliiCursaCentral";
import LocatiiCentralManagement from "./Components/Central/LocatiiCentral";
import AngajatIdentityManagement from "./Components/Central/AngajatIdentity";
import ClientIdentityManagement from "./Components/Central/ClientIdentity";

import AngajatHRManagement from "./Components/Arhiva/AngajatHR";
import ClientProfilManagement from "./Components/Arhiva/ClientProfil";


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
        <Route path="/angajatContactNord" element={<AngajatContactNordManagement />} />
        <Route path="/clientContactNord" element={<ClientContactNordManagement />} />

        <Route path="/angajatSud" element={<AngajatSudManagement />} />
        <Route path="/cursaSud" element={<CurseSudManagement />} />
        <Route path="/getcursaSud" element={<DetaliiCursaSudManagement />} />
        <Route path="/locatiiSud" element={<LocatiiSudManagement />} />
        <Route path="/angajatContactSud" element={<AngajatContactSudManagement />} />
        <Route path="/clientContactSud" element={<ClientContactSudManagement />} />

        <Route path="/angajatCentral" element={<AngajatCentralManagement />} />
        <Route path="/cursaCentral" element={<CurseCentralManagement />} />
        <Route path="/getcursaCentral" element={<DetaliiCursaCentralManagement />} />
        <Route path="/locatiiCentral" element={<LocatiiCentralManagement />} />
        <Route path="/angajatIdentity" element={<AngajatIdentityManagement />} />
        <Route path="/clientIdentity" element={<ClientIdentityManagement />} />

        <Route path="/angajatHR" element={<AngajatHRManagement />} />
        <Route path="/clientProfil" element={<ClientProfilManagement />} />

        <Route path="/landingPage" element={<iframe title="Landing Page" src="/landingPage.html" style={{ width: "100%", height: "99.6vh", border: "none" }} />} />
      </Routes>
    </Router>
  );
}


export default App;
