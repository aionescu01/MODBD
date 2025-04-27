import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";
import "aos/dist/aos.css";
import AOS from "aos";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    AOS.init();

    fetch("http://localhost:3001/api/oltp/angajat")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Eroare la preluarea angajaților:", error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div>
      <Header />

      <div id="employees" className="container my-5">
        <h2 className="text-center mb-4" data-aos="fade-up" data-aos-duration="1000">
          Lista Angajaților
        </h2>

        <div className="row">
          {employees.map((emp) => (
            <div className="col-md-6 mb-4" key={emp.cod_angajat}>
              <div className="card package-card">
                <div className="card-body">
                  <h5 className="card-title">{`${emp.nume} ${emp.prenume}`}</h5>
                  <p className="card-text">Tip Angajat: {emp.tip_angajat}</p>

                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td><strong>Telefon</strong></td>
                        <td>{emp.nr_telefon}</td>
                      </tr>
                      <tr>
                        <td><strong>Data Naștere</strong></td>
                        <td>{formatDate(emp.data_nastere)}</td>
                      </tr>
                      <tr>
                        <td><strong>Data Angajare</strong></td>
                        <td>{formatDate(emp.data_angajare)}</td>
                      </tr>
                      <tr>
                        <td><strong>Salariu</strong></td>
                        <td>{emp.salariu} RON</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => console.log("Edit employee with ID:", emp.cod_angajat)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => console.log("Delete employee with ID:", emp.cod_angajat)}
                    >
                      Delete
                    </button>
                    {emp.tip_angajat === "Sofer" && (
                      <button
                        className="btn btn-info"
                        onClick={() => console.log("Istoric Sofer", emp.cod_angajat)}
                      >
                        Istoric Sofer
                      </button>
                    )}
                    {emp.tip_angajat === "Dispecer" && (
                      <button
                        className="btn btn-warning"
                        onClick={() => console.log("Facturi Emise", emp.cod_angajat)}
                      >
                        Facturi Emise
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmployeesPage;
