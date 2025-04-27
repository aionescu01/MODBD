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
import EmployeeWare from "./Components/ang";
import ClientManagementw from "./Components/cl";
import InvoiceManagementw from "./Components/fct";
import GraficeManagement from "./Components/Grafice";
import { LocationManagementw, TimeManagementw } from "./Components/lt";
import { CarManagementw, RideManagementw } from "./Components/cd";


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
        <Route path="/wangajat" element={<EmployeeWare />} />
        <Route path="/wclient" element={<ClientManagementw />} />
        <Route path="/wfactura" element={<InvoiceManagementw />} />
        <Route path="/wloc" element={<LocationManagementw />} />
        <Route path="/wtime" element={<TimeManagementw />} />
        <Route path="/wcar" element={<CarManagementw />} />
        <Route path="/wride" element={<RideManagementw />} />
        <Route path="/grafice" element={<GraficeManagement />} />
      </Routes>
    </Router>
  );
}


export default App;
