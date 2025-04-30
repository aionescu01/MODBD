const express = require("express");
const cors = require('cors');

const fs = require('fs');
const path = require('path');

const { Op } = require('sequelize');

const angajatRoutes = require("./routes/oltp/angajat");
const clientRoutes = require("./routes/oltp/client");
const cursaRoutes = require("./routes/oltp/cursa");
const detaliiCursaRoutes = require("./routes/oltp/detaliiCursa");
const discountRoutes = require("./routes/oltp/discount");
const facturaRoutes = require("./routes/oltp/factura");
const istoricSoferiRoutes = require("./routes/oltp/istoricSoferi");
const locatiiRoutes = require("./routes/oltp/locatii");
const lucreazaInRoutes = require("./routes/oltp/lucreazaIn");
const masinaRoutes = require("./routes/oltp/masina");

const angajatNordRoutes = require("./routes/nord/angajatNord");
const cursaNordRoutes = require("./routes/nord/cursaNord");
const detaliiCursaNordRoutes = require("./routes/nord/detaliiCursaNord");
const locatiiNordRoutes = require("./routes/nord/locatiiNord");
const angajatContactNordRoutes = require("./routes/nord/angajatContact");
const clientContactNordRoutes = require("./routes/nord/clientContact");

const angajatSudRoutes = require("./routes/sud/angajatSud");
const cursaSudRoutes = require("./routes/sud/cursaSud");
const detaliiCursaSudRoutes = require("./routes/sud/detaliiCursaSud");
const locatiiSudRoutes = require("./routes/sud/locatiiSud");
const angajatContactSudRoutes = require("./routes/sud/angajatContact");
const clientContactSudRoutes = require("./routes/sud/clientContact");

const angajatCentralRoutes = require("./routes/central/angajatCentral");
const cursaCentralRoutes = require("./routes/central/cursaCentral");
const detaliiCursaCentralRoutes = require("./routes/central/detaliiCursaCentral");
const locatiiCentralRoutes = require("./routes/central/locatiiCentral");
const angajatIdentityRoutes = require("./routes/central/angajatIdentity");
const clientIdentityRoutes = require("./routes/central/clientIdentity");

const mesajRoutes = require("./routes/arhiva/mesaj");
const angajatHRRoutes = require("./routes/arhiva/angajatHR");
const clientProfilRoutes = require("./routes/arhiva/clientProfil");

const { sequelizeOLTP, sequelizeNORD, sequelizeSUD, sequelizeCENTRAL, sequelizeARHIVA } = require("./config/database");

require("./models/oltp/associations");


const app = express();
const PORT = process.env.PORT || 3001;
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger-config");


app.use(express.json());
app.use(cors());

// OLTP API
app.use("/api/oltp/angajat", angajatRoutes);
app.use("/api/oltp/client", clientRoutes);
app.use("/api/oltp/cursa", cursaRoutes);
app.use("/api/oltp/detaliiCursa", detaliiCursaRoutes);
app.use("/api/oltp/discount", discountRoutes);
app.use("/api/oltp/factura", facturaRoutes);
app.use("/api/oltp/istoricSoferi", istoricSoferiRoutes);
app.use("/api/oltp/locatii", locatiiRoutes);
app.use("/api/oltp/lucreazaIn", lucreazaInRoutes);
app.use("/api/oltp/masina", masinaRoutes);

app.use("/api/nord/angajatNord", angajatNordRoutes);
app.use("/api/nord/cursaNord", cursaNordRoutes);
app.use("/api/nord/detaliiCursaNord", detaliiCursaNordRoutes);
app.use("/api/nord/locatiiNord", locatiiNordRoutes);
app.use("/api/nord/angajatContactNord", angajatContactNordRoutes);
app.use("/api/nord/clientContactNord", clientContactNordRoutes);

app.use("/api/sud/angajatSud", angajatSudRoutes);
app.use("/api/sud/cursaSud", cursaSudRoutes);
app.use("/api/sud/detaliiCursaSud", detaliiCursaSudRoutes);
app.use("/api/sud/locatiiSud", locatiiSudRoutes);
app.use("/api/sud/angajatContactSud", angajatContactSudRoutes);
app.use("/api/sud/clientContactSud", clientContactSudRoutes);

app.use("/api/central/angajatCentral", angajatCentralRoutes);
app.use("/api/central/cursaCentral", cursaCentralRoutes);
app.use("/api/central/detaliiCursaCentral", detaliiCursaCentralRoutes);
app.use("/api/central/locatiiCentral", locatiiCentralRoutes);
app.use("/api/central/angajatIdentity", angajatIdentityRoutes);
app.use("/api/central/clientIdentity", clientIdentityRoutes);

app.use("/api/arhiva/mesaj", mesajRoutes);
app.use("/api/arhiva/angajathr", angajatHRRoutes);
app.use("/api/arhiva/clientprofil", clientProfilRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


async function addMessageToDatabase(message, messageType, createdBy) {
  try {
    const validMessageTypes = ['E', 'W', 'I'];
    if (!validMessageTypes.includes(messageType)) {
      throw new Error(
        `Tipul mesajului este invalid: ${messageType}. Tipuri acceptate: ${validMessageTypes.join(", ")}`
      );
    }

    await sequelizeARHIVA.models.Mesaj.create({
      MESSAGE: message,
      MESSAGE_TYPE: messageType,
      CREATED_BY: createdBy,
      CREATED_AT: new Date(),
    });

    console.log(`Mesajul a fost adăugat cu succes: ${messageType} - ${message}`);
  } catch (error) {
    console.error("Eroare la adăugarea mesajului în baza de date", error.message);
  }
}

async function runSQLScript(sequelize, filePath, message) {
  try {
    const sql = fs.readFileSync(path.resolve(filePath), 'utf8');
    
    await sequelize.query(sql);
    
    await addMessageToDatabase(`${message} - executat cu succes!`, "I", "Admin");
  } catch (err) {
    console.error("error: ", err);

    await addMessageToDatabase(`Eroare la executarea - ${message}`, "E", "Admin");
  }
}

async function syncDatabases() {
  try {
    await sequelizeARHIVA.sync({ force: true });
    await addMessageToDatabase("Baza de date ARHIVA sincronizata cu succes!", "I", "Admin");

    await sequelizeOLTP.sync({ force: true });
    await addMessageToDatabase("Baza de date OLTP sincronizata cu succes!", "I", "Admin");

    await runSQLScript(sequelizeOLTP, './scripts/oltp-add-users.sql', 'adaugare utilizatori in OLTP');

    await insertInitialDataOLTP();

    await runSQLScript(sequelizeARHIVA, './scripts/oltp-add-constraints.sql', 'adaugare constrangeri tabele OLTP');
    await runSQLScript(sequelizeOLTP, './scripts/oltp-grant-permissions-tables-users.sql', 'adaugare permisiuni tabele OLTP');

    await sequelizeNORD.sync({ force: true });
    await addMessageToDatabase("Baza de date NORD sincronizata cu succes!", "I", "Admin");

    await insertInitialDataNORD();

    await sequelizeSUD.sync({ force: true });
    await addMessageToDatabase("Baza de date SUD sincronizata cu succes!", "I", "Admin");

    await insertInitialDataSUD();

    await sequelizeCENTRAL.sync({ force: true });
    await addMessageToDatabase("Baza de date CENTRAL sincronizata cu succes!", "I", "Admin");

    await insertInitialDataCENTRAL();

    await insertInitialDataARHIVA();

    app.listen(PORT, () =>
      console.log(`DB ruleaza pe portul ${PORT}`)
    );
  } catch (err) {
    console.error("error: ", err);

    await addMessageToDatabase("Eroare la sincronizarea bazei de date", "E", "Admin");
  }
}

syncDatabases();

async function insertInitialDataOLTP() {
  try {
    const existingClients = await sequelizeOLTP.models.Client.findAll();

    if (existingClients.length === 0) {
      
      await sequelizeOLTP.models.Client.bulkCreate([
        { nume: 'Popescu', prenume: 'Ion', nr_telefon: '0712345678', apelativ: 'Dl.', data_nastere: '1985-06-15', nota: 9.5 },
        { nume: 'Ionescu', prenume: 'Maria', nr_telefon: '0712345679', apelativ: 'Dna.', data_nastere: '1990-03-22', nota: 8.7 },
        { nume: 'Georgescu', prenume: 'Andrei', nr_telefon: '0723456789', apelativ: 'Dl.', data_nastere: '1982-07-30', nota: 7.3 },
        { nume: 'Radu', prenume: 'Elena', nr_telefon: '0734567890', apelativ: 'Dna.', data_nastere: '1975-12-10', nota: 6.8 },
        { nume: 'Vasilescu', prenume: 'Mihai', nr_telefon: '0745678901', apelativ: 'Dl.', data_nastere: '1995-01-25', nota: 8.9 },
        { nume: 'Stan', prenume: 'Ioana', nr_telefon: '0756789012', apelativ: 'Dna.', data_nastere: '1988-09-14', nota: 7.5 },
        { nume: 'Dumitru', prenume: 'Gabriel', nr_telefon: '0767890123', apelativ: 'Dl.', data_nastere: '1978-11-03', nota: 9.2 },
        { nume: 'Bălan', prenume: 'Claudia', nr_telefon: '0778901234', apelativ: 'Dna.', data_nastere: '1992-04-28', nota: 6.5 },
        { nume: 'Toma', prenume: 'Radu', nr_telefon: '0789012345', apelativ: 'Dl.', data_nastere: '1980-01-12', nota: 7.0 },
        { nume: 'Păun', prenume: 'Oana', nr_telefon: '0790123456', apelativ: 'Dna.', data_nastere: '1983-02-19', nota: 8.0 },
        { nume: 'Neagu', prenume: 'Vasile', nr_telefon: '0701234567', apelativ: 'Dl.', data_nastere: '1993-06-22', nota: 9.0 },
        { nume: 'Munteanu', prenume: 'Anca', nr_telefon: '0702345678', apelativ: 'Dna.', data_nastere: '1981-08-13', nota: 7.8 },
        { nume: 'Marin', prenume: 'Florin', nr_telefon: '0703456789', apelativ: 'Dl.', data_nastere: '1986-03-05', nota: 8.3 },
        { nume: 'Ilie', prenume: 'Mihaela', nr_telefon: '0704567890', apelativ: 'Dna.', data_nastere: '1989-10-17', nota: 8.6 },
        { nume: 'Cristea', prenume: 'Ion', nr_telefon: '0705678901', apelativ: 'Dl.', data_nastere: '1991-01-30', nota: 6.9 },
        { nume: 'Iacob', prenume: 'Larisa', nr_telefon: '0706789012', apelativ: 'Dna.', data_nastere: '1994-05-08', nota: 7.2 },
        { nume: 'Călinescu', prenume: 'George', nr_telefon: '0707890123', apelativ: 'Dl.', data_nastere: '1987-12-02', nota: 7.4 },
        { nume: 'Stoica', prenume: 'Viorica', nr_telefon: '0708901234', apelativ: 'Dna.', data_nastere: '1976-11-25', nota: 8.1 },
        { nume: 'Nistor', prenume: 'Dan', nr_telefon: '0709012345', apelativ: 'Dl.', data_nastere: '1996-02-15', nota: 9.7 }
      ]);

    }

    const existingLocatii = await sequelizeOLTP.models.Locatii.findAll();

    if (existingLocatii.length === 0) {

      await sequelizeOLTP.models.Locatii.bulkCreate([
        { localitate: 'București', judet: 'București' },
        { localitate: 'Cluj-Napoca', judet: 'Cluj' },
        { localitate: 'Timișoara', judet: 'Timiș' },
        { localitate: 'Constanța', judet: 'Constanța' },
        { localitate: 'Brașov', judet: 'Brașov' },
        { localitate: 'Ploiești', judet: 'Prahova' },
        { localitate: 'Arad', judet: 'Arad' },
        { localitate: 'Iași', judet: 'Iași' },
        { localitate: 'Sibiu', judet: 'Sibiu' },
        { localitate: 'Craiova', judet: 'Dolj' },
        { localitate: 'Oradea', judet: 'Bihor' },
        { localitate: 'Voluntari', judet: 'Ilfov' },
        { localitate: 'Alba Iulia', judet: 'Alba' },
        { localitate: 'Alexandria', judet: 'Teleorman' },
        { localitate: 'Bacău', judet: 'Bacău' },
        { localitate: 'Baia Mare', judet: 'Maramureș' },
        { localitate: 'Bârlad', judet: 'Vaslui' },
        { localitate: 'Bistrița', judet: 'Bistrița-Năsăud' },
        { localitate: 'Botoșani', judet: 'Botoșani' },
        { localitate: 'Brăila', judet: 'Brăila' },
        { localitate: 'Buzău', judet: 'Buzău' },
        { localitate: 'Călărași', judet: 'Călărași' },
        { localitate: 'Deva', judet: 'Hunedoara' },
        { localitate: 'Drobeta-Turnu Severin', judet: 'Mehedinți' },
        { localitate: 'Focșani', judet: 'Vrancea' },
        { localitate: 'Galați', judet: 'Galați' },
        { localitate: 'Giurgiu', judet: 'Giurgiu' },
        { localitate: 'Miercurea Ciuc', judet: 'Harghita' },
        { localitate: 'Piatra Neamț', judet: 'Neamț' },
        { localitate: 'Pitești', judet: 'Argeș' },
        { localitate: 'Râmnicu Vâlcea', judet: 'Vâlcea' },
        { localitate: 'Reșița', judet: 'Caraș-Severin' },
        { localitate: 'Satu Mare', judet: 'Satu Mare' },
        { localitate: 'Sfântu Gheorghe', judet: 'Covasna' },
        { localitate: 'Slatina', judet: 'Olt' },
        { localitate: 'Slobozia', judet: 'Ialomița' },
        { localitate: 'Suceava', judet: 'Suceava' },
        { localitate: 'Târgoviște', judet: 'Dâmbovița' },
        { localitate: 'Târgu Jiu', judet: 'Gorj' },
        { localitate: 'Târgu Mureș', judet: 'Mureș' },
        { localitate: 'Tulcea', judet: 'Tulcea' },
        { localitate: 'Zalău', judet: 'Sălaj' }
      ]);      

    }

    const existingMasini = await sequelizeOLTP.models.Masina.findAll();

    if (existingMasini.length === 0) {

      await sequelizeOLTP.models.Masina.bulkCreate([
        { numar_masina: 'IF123XYZ', data_achizitionare: '2020-05-01', data_revizie_urm: '2025-06-01', marca: 'Dacia', model: 'Logan' },
        { numar_masina: 'BR456ABC', data_achizitionare: '2021-07-15', data_revizie_urm: '2025-08-01', marca: 'BMW', model: 'X5' },
        { numar_masina: 'B124DEF', data_achizitionare: '2019-03-20', data_revizie_urm: '2025-09-01', marca: 'Audi', model: 'A4' },
        { numar_masina: 'VS56GHI', data_achizitionare: '2020-11-25', data_revizie_urm: '2025-11-15', marca: 'Volkswagen', model: 'Golf' },
        { numar_masina: 'BZ17JKL', data_achizitionare: '2021-08-09', data_revizie_urm: '2025-12-01', marca: 'Ford', model: 'Focus' },
        { numar_masina: 'GL24MNO', data_achizitionare: '2020-12-12', data_revizie_urm: '2025-12-15', marca: 'Mercedes', model: 'C-Class' },
        { numar_masina: 'BR234PQR', data_achizitionare: '2018-05-18', data_revizie_urm: '2025-06-10', marca: 'Toyota', model: 'Corolla' },
        { numar_masina: 'CS431STU', data_achizitionare: '2022-01-22', data_revizie_urm: '2025-07-01', marca: 'Skoda', model: 'Octavia' },
        { numar_masina: 'DB23VWX', data_achizitionare: '2019-06-10', data_revizie_urm: '2025-08-15', marca: 'Renault', model: 'Megane' },
        { numar_masina: 'CL54YZA', data_achizitionare: '2021-10-30', data_revizie_urm: '2025-09-20', marca: 'Peugeot', model: '3008' },
        { numar_masina: 'IF123BCD', data_achizitionare: '2020-02-14', data_revizie_urm: '2025-10-01', marca: 'Opel', model: 'Astra' },
        { numar_masina: 'IL999EFG', data_achizitionare: '2019-09-09', data_revizie_urm: '2025-11-30', marca: 'Hyundai', model: 'i30' },
        { numar_masina: 'MH888HIG', data_achizitionare: '2021-04-25', data_revizie_urm: '2025-12-01', marca: 'Honda', model: 'Civic' },
        { numar_masina: 'NT777JKL', data_achizitionare: '2022-06-12', data_revizie_urm: '2025-10-20', marca: 'Kia', model: 'Sportage' },
        { numar_masina: 'MS66LMN', data_achizitionare: '2021-09-17', data_revizie_urm: '2025-11-15', marca: 'Mazda', model: '3' },
        { numar_masina: 'PT555OPQ', data_achizitionare: '2019-11-30', data_revizie_urm: '2025-12-01', marca: 'Nissan', model: 'Qashqai' },
        { numar_masina: 'CT444RST', data_achizitionare: '2020-08-01', data_revizie_urm: '2025-06-30', marca: 'Citroen', model: 'C4' },
        { numar_masina: 'B33UVW', data_achizitionare: '2021-02-22', data_revizie_urm: '2025-07-01', marca: 'Seat', model: 'Leon' },
        { numar_masina: 'B222XYZ', data_achizitionare: '2018-01-10', data_revizie_urm: '2025-08-15', marca: 'Peugeot', model: '208' },
        { numar_masina: 'B11ABC', data_achizitionare: '2021-12-05', data_revizie_urm: '2025-09-20', marca: 'Fiat', model: 'Punto' }
      ]);

    }

    const existingAngajati = await sequelizeOLTP.models.Angajat.findAll();

    if (existingAngajati.length === 0) {

      await sequelizeOLTP.models.Angajat.bulkCreate([
        { nume: 'Popescu', prenume: 'Ion', nr_telefon: '0720123456', tip_angajat: 'Sofer', data_nastere: '1985-03-15', data_angajare: '2020-01-10', salariu: 3500, cod_masina: 2 },
        { nume: 'Ionescu', prenume: 'Maria', nr_telefon: '0745123456', tip_angajat: 'Sofer', data_nastere: '1990-06-25', data_angajare: '2021-03-15', salariu: 3000, cod_masina: 3 },
        { nume: 'Vasilescu', prenume: 'George', nr_telefon: '0734123456', tip_angajat: 'Sofer', data_nastere: '1982-11-05', data_angajare: '2019-05-22', salariu: 3800, cod_masina: 1 },
        { nume: 'Georgescu', prenume: 'Ana', nr_telefon: '0765123456', tip_angajat: 'Dispecer', data_nastere: '1987-02-15', data_angajare: '2018-09-01', salariu: 4200, cod_masina: null },
        { nume: 'Mihail', prenume: 'Adrian', nr_telefon: '0785123456', tip_angajat: 'Sofer', data_nastere: '1989-08-10', data_angajare: '2020-07-01', salariu: 3400, cod_masina: 7 },
        { nume: 'Stan', prenume: 'Florin', nr_telefon: '0756123456', tip_angajat: 'Dispecer', data_nastere: '1983-12-20', data_angajare: '2017-04-10', salariu: 4300, cod_masina: null },
        { nume: 'Radu', prenume: 'Elena', nr_telefon: '0723123456', tip_angajat: 'Sofer', data_nastere: '1995-01-12', data_angajare: '2022-06-20', salariu: 3100, cod_masina: 8 },
        { nume: 'Bucur', prenume: 'Marian', nr_telefon: '0741123456', tip_angajat: 'Sofer', data_nastere: '1992-07-30', data_angajare: '2021-05-12', salariu: 3200, cod_masina: 11 },
        { nume: 'Popa', prenume: 'Vlad', nr_telefon: '0729123456', tip_angajat: 'Dispecer', data_nastere: '1986-04-28', data_angajare: '2019-11-15', salariu: 4000, cod_masina: null },
        { nume: 'Dima', prenume: 'Ioana', nr_telefon: '0798123456', tip_angajat: 'Sofer', data_nastere: '1980-09-22', data_angajare: '2018-02-05', salariu: 3600, cod_masina: 12 }
      ]);

    }

    const existingLucreazaIn = await sequelizeOLTP.models.LucreazaIn.findAll();

    if (existingLucreazaIn.length === 0) {

      await sequelizeOLTP.models.LucreazaIn.bulkCreate([
        { cod_angajat: 1, cod_locatie: 1 },
        { cod_angajat: 2, cod_locatie: 1 },
        { cod_angajat: 3, cod_locatie: 1 },
        { cod_angajat: 5, cod_locatie: 1 },
        { cod_angajat: 7, cod_locatie: 1 },
        { cod_angajat: 8, cod_locatie: 1 },
        { cod_angajat: 5, cod_locatie: 2 },
        { cod_angajat: 7, cod_locatie: 2 },
        { cod_angajat: 10, cod_locatie: 2 },
        { cod_angajat: 2, cod_locatie: 3 },
        { cod_angajat: 8, cod_locatie: 3 },
        { cod_angajat: 1, cod_locatie: 4 },
        { cod_angajat: 2, cod_locatie: 4 },
        { cod_angajat: 1, cod_locatie: 5 },
        { cod_angajat: 2, cod_locatie: 6 },
        { cod_angajat: 3, cod_locatie: 7 },
        { cod_angajat: 1, cod_locatie: 8 },
        { cod_angajat: 2, cod_locatie: 8 },
        { cod_angajat: 5, cod_locatie: 8 },
        { cod_angajat: 8, cod_locatie: 8 },
        { cod_angajat: 7, cod_locatie: 9 },
        { cod_angajat: 4, cod_locatie: 1 },
        { cod_angajat: 6, cod_locatie: 1 },
        { cod_angajat: 9, cod_locatie: 1 }
      ]);

    }

    const existingCurse = await sequelizeOLTP.models.Cursa.findAll();

    if (existingCurse.length === 0) {

      await sequelizeOLTP.models.Cursa.bulkCreate([
        { cod_masina: 1, cod_sofer: 1, cod_client: 1, adresa_client: 'Strada Victoriei 10', destinatie: 'Strada Bisericii 3', cod_locatie: 1 },
        { cod_masina: 2, cod_sofer: 2, cod_client: 2, adresa_client: 'Strada Ciresilor 7', destinatie: 'Strada Stefan cel Mare 12', cod_locatie: 1 },
        { cod_masina: 3, cod_sofer: 3, cod_client: 3, adresa_client: 'Strada Lalelelor 5', destinatie: 'Strada Principala 9', cod_locatie: 1 },
        { cod_masina: 4, cod_sofer: 5, cod_client: 4, adresa_client: 'Strada Teiului 6', destinatie: 'Strada Muresului 8', cod_locatie: 2 },
        { cod_masina: 5, cod_sofer: 7, cod_client: 5, adresa_client: 'Strada Moara de Vant 3', destinatie: 'Strada Alba Iulia 2', cod_locatie: 2 },
        { cod_masina: 6, cod_sofer: 8, cod_client: 6, adresa_client: 'Strada Nordului 1', destinatie: 'Strada Unirii 15', cod_locatie: 2 },
        { cod_masina: 10, cod_sofer: 5, cod_client: 10, adresa_client: 'Strada Făgetului 9', destinatie: 'Strada Ferdinand 6', cod_locatie: 3 },
        { cod_masina: 12, cod_sofer: 7, cod_client: 11, adresa_client: 'Strada Carpați 5', destinatie: 'Strada Iancu de Hunedoara 7', cod_locatie: 3 },
        { cod_masina: 11, cod_sofer: 8, cod_client: 12, adresa_client: 'Strada Gheorgheni 10', destinatie: 'Strada Piatra Mare 3', cod_locatie: 3 },
        { cod_masina: 1, cod_sofer: 1, cod_client: 13, adresa_client: 'Strada Păcii 4', destinatie: 'Strada Andrei Mureșanu 2', cod_locatie: 4 },
        { cod_masina: 1, cod_sofer: 2, cod_client: 14, adresa_client: 'Strada Dacia 5', destinatie: 'Strada Ion Ionescu 7', cod_locatie: 4 },
        { cod_masina: 2, cod_sofer: 3, cod_client: 15, adresa_client: 'Strada Abatorului 8', destinatie: 'Strada Garajului 12', cod_locatie: 4 },
        { cod_masina: 2, cod_sofer: 5, cod_client: 16, adresa_client: 'Strada Pădurii 9', destinatie: 'Strada Revoluției 13, Hunedoara', cod_locatie: 5 },
        { cod_masina: 3, cod_sofer: 7, cod_client: 17, adresa_client: 'Strada Viitorului 12', destinatie: 'Strada Dumitru Ciuca 5', cod_locatie: 5 },
        { cod_masina: 7, cod_sofer: 8, cod_client: 18, adresa_client: 'Strada Adunați 15', destinatie: 'Strada Petru Rareș 6', cod_locatie: 5 },
        { cod_masina: 8, cod_sofer: 1, cod_client: 19, adresa_client: 'Strada Mărului 3', destinatie: 'Strada Gheorghe Doja 10', cod_locatie: 6 },
        { cod_masina: 11, cod_sofer: 2, cod_client: 1, adresa_client: 'Strada Arcului 8', destinatie: 'Strada Lăcrămioarei 12', cod_locatie: 6 },
        { cod_masina: 11, cod_sofer: 3, cod_client: 2, adresa_client: 'Strada Călărașilor 1', destinatie: 'Strada Gării 4', cod_locatie: 6 },
        { cod_masina: 12, cod_sofer: 5, cod_client: 5, adresa_client: 'Strada Perlei 10', destinatie: 'Strada Brătianu 6', cod_locatie: 7 },
        { cod_masina: 1, cod_sofer: 7, cod_client: 1, adresa_client: 'Strada Sălciilor 3', destinatie: 'Strada Alexandru Ioan Cuza 7', cod_locatie: 7 },
        { cod_masina: 7, cod_sofer: 8, cod_client: 2, adresa_client: 'Strada Albinelor 8', destinatie: 'Strada Căpitan Ignat 3', cod_locatie: 7 },
        { cod_masina: 7, cod_sofer: 1, cod_client: 7, adresa_client: 'Strada Stelea 11', destinatie: 'Strada Gheorgheni 4', cod_locatie: 8 },
        { cod_masina: 8, cod_sofer: 1, cod_client: 1, adresa_client: 'Strada Găgești 4', destinatie: 'Strada Filimon 12', cod_locatie: 8 },
        { cod_masina: 8, cod_sofer: 2, cod_client: 8, adresa_client: 'Strada Căpitanilor 7', destinatie: 'Strada Mureșului 13', cod_locatie: 8 },
        { cod_masina: 9, cod_sofer: 3, cod_client: 9, adresa_client: 'Strada Valea Lunga 8', destinatie: 'Strada Moșilor 10', cod_locatie: 8 }
      ]);

    }

    const existingDetaliiCurse = await sequelizeOLTP.models.DetaliiCursa.findAll();

    if (existingDetaliiCurse.length === 0) {

      await sequelizeOLTP.models.DetaliiCursa.bulkCreate([
        { cod_cursa: 1, data_cursa: new Date('2025-01-01'), nota_sofer: 8, nota_client: 9 },
        { cod_cursa: 2, data_cursa: new Date('2025-02-02'), nota_sofer: 7, nota_client: 8 },
        { cod_cursa: 3, data_cursa: new Date('2025-01-03'), nota_sofer: 9, nota_client: 9 },
        { cod_cursa: 4, data_cursa: new Date('2025-02-04'), nota_sofer: 6, nota_client: 7 },
        { cod_cursa: 5, data_cursa: new Date('2025-01-05'), nota_sofer: 8, nota_client: 7 },
        { cod_cursa: 6, data_cursa: new Date('2025-02-06'), nota_sofer: 9, nota_client: 8 },
        { cod_cursa: 7, data_cursa: new Date('2025-01-07'), nota_sofer: 7, nota_client: 6 },
        { cod_cursa: 8, data_cursa: new Date('2025-02-08'), nota_sofer: 8, nota_client: 8 },
        { cod_cursa: 9, data_cursa: new Date('2025-01-09'), nota_sofer: 6, nota_client: 6 },
        { cod_cursa: 10, data_cursa: new Date('2025-02-10'), nota_sofer: 9, nota_client: 8 },
        { cod_cursa: 11, data_cursa: new Date('2025-01-11'), nota_sofer: 7, nota_client: 7 },
        { cod_cursa: 12, data_cursa: new Date('2025-01-12'), nota_sofer: 8, nota_client: 8 },
        { cod_cursa: 13, data_cursa: new Date('2025-01-13'), nota_sofer: 7, nota_client: 7 },
        { cod_cursa: 14, data_cursa: new Date('2025-02-14'), nota_sofer: 6, nota_client: 8 },
        { cod_cursa: 15, data_cursa: new Date('2025-02-15'), nota_sofer: 8, nota_client: 8 },
        { cod_cursa: 16, data_cursa: new Date('2025-02-16'), nota_sofer: 9, nota_client: 9 },
        { cod_cursa: 17, data_cursa: new Date('2025-01-17'), nota_sofer: 7, nota_client: 6 },
        { cod_cursa: 18, data_cursa: new Date('2025-02-18'), nota_sofer: 6, nota_client: 7 },
        { cod_cursa: 19, data_cursa: new Date('2025-02-19'), nota_sofer: 9, nota_client: 9 },
        { cod_cursa: 20, data_cursa: new Date('2025-02-20'), nota_sofer: 8, nota_client: 7 },
        { cod_cursa: 21, data_cursa: new Date('2025-01-21'), nota_sofer: 8, nota_client: 8 },
        { cod_cursa: 22, data_cursa: new Date('2025-01-22'), nota_sofer: 7, nota_client: 9 },
        { cod_cursa: 23, data_cursa: new Date('2025-01-23'), nota_sofer: 6, nota_client: 7 },
        { cod_cursa: 24, data_cursa: new Date('2025-01-24'), nota_sofer: 9, nota_client: 6 },
        { cod_cursa: 25, data_cursa: new Date('2025-02-25'), nota_sofer: 8, nota_client: 7 }
      ]);

    }

    const existingDiscounts = await sequelizeOLTP.models.Discount.findAll();

    if (existingDiscounts.length === 0) {

      await sequelizeOLTP.models.Discount.bulkCreate([
        { nota_discount: 11, cod_discount: 10 },
        { nota_discount: 10, cod_discount: 7 },
        { nota_discount: 9, cod_discount: 5 },
        { nota_discount: 8, cod_discount: 2 },
        { nota_discount: 7, cod_discount: 1 },
        { nota_discount: 6, cod_discount: 0 },
        { nota_discount: 5, cod_discount: 0 },
        { nota_discount: 4, cod_discount: 0 },
        { nota_discount: 3, cod_discount: 0 },
        { nota_discount: 2, cod_discount: 0 },
        { nota_discount: 1, cod_discount: 0 }
      ]);

    }

    const existingFacturi = await sequelizeOLTP.models.Factura.findAll();

    if (existingFacturi.length === 0) {

      await sequelizeOLTP.models.Factura.bulkCreate([
        { cod_dispecer: 4, cod_cursa: 1, pret: 55.20 },
        { cod_dispecer: 6, cod_cursa: 2, pret: 60.75 },
        { cod_dispecer: 9, cod_cursa: 3, pret: 45.30 },
        { cod_dispecer: 4, cod_cursa: 4, pret: 70.60 },
        { cod_dispecer: 6, cod_cursa: 5, pret: 50.90 },
        { cod_dispecer: 9, cod_cursa: 6, pret: 63.00 },
        { cod_dispecer: 4, cod_cursa: 7, pret: 38.80 },
        { cod_dispecer: 6, cod_cursa: 8, pret: 32.20 },
        { cod_dispecer: 9, cod_cursa: 9, pret: 72.40 },
        { cod_dispecer: 4, cod_cursa: 10, pret: 64.10 },
        { cod_dispecer: 6, cod_cursa: 11, pret: 55.50 },
        { cod_dispecer: 9, cod_cursa: 12, pret: 78.30 },
        { cod_dispecer: 4, cod_cursa: 13, pret: 48.50 },
        { cod_dispecer: 6, cod_cursa: 14, pret: 60.00 },
        { cod_dispecer: 9, cod_cursa: 15, pret: 45.30 },
        { cod_dispecer: 4, cod_cursa: 16, pret: 39.70 },
        { cod_dispecer: 6, cod_cursa: 17, pret: 28.80 },
        { cod_dispecer: 9, cod_cursa: 18, pret: 62.60 },
        { cod_dispecer: 4, cod_cursa: 19, pret: 51.90 },
        { cod_dispecer: 6, cod_cursa: 20, pret: 46.50 },
        { cod_dispecer: 9, cod_cursa: 21, pret: 38.40 },
        { cod_dispecer: 4, cod_cursa: 22, pret: 29.00 },
        { cod_dispecer: 6, cod_cursa: 23, pret: 25.10 },
        { cod_dispecer: 9, cod_cursa: 24, pret: 60.80 },
        { cod_dispecer: 4, cod_cursa: 25, pret: 53.20 }
      ]);

    }

    const existingIstoricSoferi = await sequelizeOLTP.models.IstoricSofer.findAll();

    if (existingIstoricSoferi.length === 0) {

      await sequelizeOLTP.models.IstoricSofer.bulkCreate([
        { cod_sofer: 1, nota: 7.8, numar_curse: 5 },
        { cod_sofer: 2, nota: 7.25, numar_curse: 4 },
        { cod_sofer: 3, nota: 7.75, numar_curse: 4 },
        { cod_sofer: 5, nota: 7.75, numar_curse: 4 },
        { cod_sofer: 7, nota: 7, numar_curse: 4 },
        { cod_sofer: 8, nota: 8, numar_curse: 4 }
      ]);

    }

    await sequelizeOLTP.query('COMMIT;');

    if (existingAngajati.length == 0 || existingClients.length == 0 || existingCurse.length == 0 || existingDetaliiCurse.length == 0 || existingDiscounts.length == 0 || existingFacturi.length == 0 || existingIstoricSoferi.length == 0 || existingLocatii.length == 0 || existingLucreazaIn.length == 0 || existingMasini.length == 0){
      await addMessageToDatabase("Datele initiale au fost inserate cu succes in baza de date de tip OLTP!", "I", "Admin");
    }
  } catch (err) {
    await addMessageToDatabase("Eroare la inserarea datelor initiale pentru OLTP", "E", "Admin");
  }
}

async function insertInitialDataNORD() {
  try {

    const existingLocatiiNord = await sequelizeNORD.models.LocatiiNord.findAll();

    if (existingLocatiiNord.length === 0) {

      const locatii = await sequelizeOLTP.models.Locatii.findAll({
        where: {
            judet: ["Botoșani", "Suceava", "Bistrița-Năsăud", "Satu Mare", "Maramureș", "Iași", "Neamț", "Bihor", "Sălaj"],
        },
        raw: true,
      });

      await sequelizeNORD.models.LocatiiNord.bulkCreate(locatii);

    }

    const existingAngajatiNord = await sequelizeNORD.models.AngajatNord.findAll();

    if (existingAngajatiNord.length === 0) {

      const angajati = await sequelizeOLTP.models.Angajat.findAll({
        include: [{
            model: sequelizeOLTP.models.Locatii,
            required: true,
            through: { attributes: [] },
            where: {
                judet: ["Botoșani", "Suceava", "Bistrița-Năsăud", "Satu Mare", "Maramureș", "Iași", "Neamț", "Bihor", "Sălaj"],
            }
        }],
        raw: true,
      });
    
      await sequelizeNORD.models.AngajatNord.bulkCreate(angajati);

    }

    const existingCurseNord = await sequelizeNORD.models.CursaNord.findAll();

    if (existingCurseNord.length === 0) {
      const curse = await sequelizeOLTP.models.Cursa.findAll({ raw: true });

      const locatiiNord = await sequelizeNORD.models.LocatiiNord.findAll({ attributes: ['cod_locatie'], raw: true });
      const coduriLocatiiNord = locatiiNord.map(loc => loc.cod_locatie);

      const curseFiltrate = curse.filter(cursa => coduriLocatiiNord.includes(cursa.cod_locatie));

      await sequelizeNORD.models.CursaNord.bulkCreate(curseFiltrate);
    }

    const existingDetaliiCurseNord = await sequelizeNORD.models.DetaliiCursaNord.findAll();

    if (existingDetaliiCurseNord.length === 0) {
      const detaliiCurse = await sequelizeOLTP.models.DetaliiCursa.findAll({ raw: true });

      const curseNord = await sequelizeNORD.models.CursaNord.findAll({ attributes: ['cod_cursa'], raw: true });
      const coduriCurseNord = curseNord.map(cursa => cursa.cod_cursa);

      const detaliiFiltrate = detaliiCurse.filter(detaliu => coduriCurseNord.includes(detaliu.cod_cursa));

      await sequelizeNORD.models.DetaliiCursaNord.bulkCreate(detaliiFiltrate);
    }

    const existingAngajatiContactNord = await sequelizeNORD.models.AngajatContactNord.findAll();

    if (existingAngajatiContactNord.length === 0) {

      const angajatiNordRaw = await sequelizeOLTP.models.Angajat.findAll({
        include: [{
          model: sequelizeOLTP.models.Locatii,
          required: true,
          through: { attributes: [] },
          where: {
            judet: ["Suceava", "Botoșani", "Iași", "Neamț", "Bistrița-Năsăud", "Satu Mare", "Maramureș", "Sălaj", "Bihor", "Cluj", "Timiș", "Brașov", "Arad", "Sibiu", "Alba", "Bacău", "Hunedoara", "Galați", "Harghita", "Covasna", "Mureș", "Vaslui"]
          }
        }],
        attributes: ['cod_angajat', 'nr_telefon', 'tip_angajat']
      });

      const angajatiNord = angajatiNordRaw.map(({ cod_angajat, nr_telefon, tip_angajat }) => ({
        cod_angajat,
        nr_telefon,
        tip_angajat
      }));
    
      await sequelizeNORD.models.AngajatContactNord.bulkCreate(angajatiNord);

    }

    const existingClientiContactNord = await sequelizeNORD.models.ClientContactNord.findAll();

    if (existingClientiContactNord.length === 0) {

      const clientiNordRaw = await sequelizeOLTP.models.Client.findAll({
        include: [{
          model: sequelizeOLTP.models.Cursa,
          required: true,
          include: [{
            model: sequelizeOLTP.models.Locatii,
            required: true,
            where: {
              judet: ["Suceava", "Botoșani", "Iași", "Neamț", "Bistrița-Năsăud", "Satu Mare", "Maramureș", "Sălaj", "Bihor", "Cluj", "Timiș", "Brașov", "Arad", "Sibiu", "Alba", "Bacău", "Hunedoara", "Galați", "Harghita", "Covasna", "Mureș", "Vaslui"]
            }
          }]
        }],
        attributes: ['cod_client', 'nr_telefon', 'apelativ']
      });

      const clientiNord = clientiNordRaw.map(client => ({
        cod_client: client.cod_client,
        nr_telefon: client.nr_telefon,
        apelativ: client.apelativ
      }));
    
      await sequelizeNORD.models.ClientContactNord.bulkCreate(clientiNord);

    }

    await sequelizeNORD.query('COMMIT;');

    if (existingAngajatiNord.length == 0 || existingCurseNord.length == 0 || existingLocatiiNord.length == 0 || existingDetaliiCurseNord == 0 || existingAngajatiContactNord.length == 0 || existingClientiContactNord.length == 0){
      await addMessageToDatabase("Datele initiale au fost inserate cu succes in baza de date NORD!", "I", "Admin");
    }
  } catch (err) {
    console.log(err);

    await addMessageToDatabase("Eroare la inserarea datelor initiale pentru NORD", "E", "Admin");
  }
}

async function insertInitialDataSUD() {
  try {

    const existingLocatiiSud = await sequelizeSUD.models.LocatiiSud.findAll();

    if (existingLocatiiSud.length === 0) {

      const locatii = await sequelizeOLTP.models.Locatii.findAll({
        where: {
            judet: ["București", "Ilfov", "Dâmbovița", "Prahova", "Argeș", "Giurgiu", "Teleorman", "Ialomița", "Călărași", "Brăila", "Vrancea", "Dolj", "Olt", "Mehedinți", "Gorj", "Vâlcea", "Caraș-Severin", "Constanța", "Tulcea", "Buzău"],
        },
        raw: true,
      });

      await sequelizeSUD.models.LocatiiSud.bulkCreate(locatii);

    }

    const existingAngajatiSud = await sequelizeSUD.models.AngajatSud.findAll();

    if (existingAngajatiSud.length === 0) {

      const angajatiRaw = await sequelizeOLTP.models.Angajat.findAll({
        include: [{
            model: sequelizeOLTP.models.Locatii,
            required: true,
            through: { attributes: [] },
            where: {
                judet: [
                    "București", "Ilfov", "Dâmbovița", "Prahova", "Argeș", "Giurgiu", "Buzău", 
                    "Teleorman", "Ialomița", "Călărași", "Brăila", "Vrancea", "Dolj", 
                    "Olt", "Mehedinți", "Gorj", "Vâlcea", "Caraș-Severin", "Constanța", "Tulcea"
                ],
            }
        }]
      });
      
      const angajati = angajatiRaw.map(a => a.toJSON());
      
      await sequelizeSUD.models.AngajatSud.bulkCreate(angajati);

    }

    const existingCurseSud = await sequelizeSUD.models.CursaSud.findAll();

    if (existingCurseSud.length === 0) {
      const curse = await sequelizeOLTP.models.Cursa.findAll({ raw: true });

      const locatiiSud = await sequelizeSUD.models.LocatiiSud.findAll({ attributes: ['cod_locatie'], raw: true });
      const coduriLocatiiSud = locatiiSud.map(loc => loc.cod_locatie);

      const curseFiltrate = curse.filter(cursa => coduriLocatiiSud.includes(cursa.cod_locatie));

      await sequelizeSUD.models.CursaSud.bulkCreate(curseFiltrate);
    }

    const existingDetaliiCurseSud = await sequelizeSUD.models.DetaliiCursaSud.findAll();

    if (existingDetaliiCurseSud.length === 0) {
      const detaliiCurse = await sequelizeOLTP.models.DetaliiCursa.findAll({ raw: true });

      const curseSud = await sequelizeSUD.models.CursaSud.findAll({ attributes: ['cod_cursa'], raw: true });
      const coduriCurseSud = curseSud.map(cursa => cursa.cod_cursa);

      const detaliiFiltrate = detaliiCurse.filter(detaliu => coduriCurseSud.includes(detaliu.cod_cursa));

      await sequelizeSUD.models.DetaliiCursaSud.bulkCreate(detaliiFiltrate);
    }

    const existingAngajatiContactSud = await sequelizeSUD.models.AngajatContactSud.findAll();

    if (existingAngajatiContactSud.length === 0) {

      const angajatiSudRaw = await sequelizeOLTP.models.Angajat.findAll({
        include: [{
          model: sequelizeOLTP.models.Locatii,
          required: true,
          through: { attributes: [] },
          where: {
            judet: ["București", "Ilfov", "Dâmbovița", "Prahova", "Argeș", "Giurgiu", "Teleorman", "Ialomița", "Călărași", "Brăila", "Vrancea", "Dolj", "Olt", "Mehedinți", "Gorj", "Vâlcea", "Caraș-Severin", "Constanța", "Tulcea", "Buzău"]
          }
        }],
        attributes: ['cod_angajat', 'nr_telefon', 'tip_angajat']
      });

      const angajatiSud = angajatiSudRaw.map(({ cod_angajat, nr_telefon, tip_angajat }) => ({
        cod_angajat,
        nr_telefon,
        tip_angajat
      }));
    
      await sequelizeSUD.models.AngajatContactSud.bulkCreate(angajatiSud);

    }

    const existingClientiContactSud = await sequelizeSUD.models.ClientContactSud.findAll();

    if (existingClientiContactSud.length === 0) {

      const clientiSudRaw = await sequelizeOLTP.models.Client.findAll({
        include: [{
          model: sequelizeOLTP.models.Cursa,
          required: true,
          include: [{
            model: sequelizeOLTP.models.Locatii,
            required: true,
            where: {
              judet: ["București", "Ilfov", "Dâmbovița", "Prahova", "Argeș", "Giurgiu", "Teleorman", "Ialomița", "Călărași", "Brăila", "Vrancea", "Dolj", "Olt", "Mehedinți", "Gorj", "Vâlcea", "Caraș-Severin", "Constanța", "Tulcea", "Buzău"]
            }
          }]
        }],
        attributes: ['cod_client', 'nr_telefon', 'apelativ']
      });

      const clientiSud = clientiSudRaw.map(client => ({
        cod_client: client.cod_client,
        nr_telefon: client.nr_telefon,
        apelativ: client.apelativ
      }));
    
      await sequelizeSUD.models.ClientContactSud.bulkCreate(clientiSud);

    }

    await sequelizeSUD.query('COMMIT;');

    if (existingAngajatiSud.length == 0 || existingCurseSud.length == 0 || existingLocatiiSud.length == 0 || existingDetaliiCurseSud == 0 || existingAngajatiContactSud.length == 0 || existingClientiContactSud.length == 0){
      await addMessageToDatabase("Datele initiale au fost inserate cu succes in baza de date SUD!", "I", "Admin");
    }
  } catch (err) {
    console.log(err);

    await addMessageToDatabase("Eroare la inserarea datelor initiale pentru SUD", "E", "Admin");
  }
}

async function insertInitialDataCENTRAL() {
  try {

    const existingLocatiiCentral = await sequelizeCENTRAL.models.LocatiiCentral.findAll();

    if (existingLocatiiCentral.length === 0) {

      const locatii = await sequelizeOLTP.models.Locatii.findAll({
        where: {
          judet: {
            [Op.notIn]: [
              "Botoșani", "Suceava", "Bistrița-Năsăud", "Satu Mare", "Maramureș", "Iași", "Buzău",
              "Neamț", "Bihor", "Sălaj", "București", "Ilfov", "Dâmbovița", "Prahova", "Argeș",
              "Giurgiu", "Teleorman", "Ialomița", "Călărași", "Brăila", "Vrancea", "Dolj", 
              "Olt", "Mehedinți", "Gorj", "Vâlcea", "Caraș-Severin", "Constanța", "Tulcea"
            ]
          }
        },
        raw: true,
      });

      await sequelizeCENTRAL.models.LocatiiCentral.bulkCreate(locatii);

    }

    const existingAngajatiCentral = await sequelizeCENTRAL.models.AngajatCentral.findAll();

    if (existingAngajatiCentral.length === 0) {

      const angajatiRaw = await sequelizeOLTP.models.Angajat.findAll({
        include: [{
            model: sequelizeOLTP.models.Locatii,
            required: true,
            through: { attributes: [] },
            where: {
                judet: {
                    [Op.notIn]: [
                        "Botoșani", "Suceava", "Bistrița-Năsăud", "Satu Mare", "Maramureș", "Iași", "Buzău",
                        "Neamț", "Bihor", "Sălaj", "București", "Ilfov", "Dâmbovița", "Prahova", 
                        "Argeș", "Giurgiu", "Teleorman", "Ialomița", "Călărași", "Brăila", "Vrancea", 
                        "Dolj", "Olt", "Mehedinți", "Gorj", "Vâlcea", "Caraș-Severin", "Constanța", "Tulcea"
                    ]
                }
            }
        }]
      });
      
      const angajati = angajatiRaw.map(a => a.toJSON());
      
      await sequelizeCENTRAL.models.AngajatCentral.bulkCreate(angajati);    

    }

    const existingCurseCentral = await sequelizeCENTRAL.models.CursaCentral.findAll();

    if (existingCurseCentral.length === 0) {
      const curse = await sequelizeOLTP.models.Cursa.findAll({ raw: true });

      const locatiiCentral = await sequelizeCENTRAL.models.LocatiiCentral.findAll({ attributes: ['cod_locatie'], raw: true });
      const coduriLocatiiCentral = locatiiCentral.map(loc => loc.cod_locatie);

      const curseFiltrate = curse.filter(cursa => coduriLocatiiCentral.includes(cursa.cod_locatie));

      await sequelizeCENTRAL.models.CursaCentral.bulkCreate(curseFiltrate);
    }

    const existingDetaliiCurseCentral = await sequelizeCENTRAL.models.DetaliiCursaCentral.findAll();

    if (existingDetaliiCurseCentral.length === 0) {
      const detaliiCurse = await sequelizeOLTP.models.DetaliiCursa.findAll({ raw: true });

      const curseCentral = await sequelizeCENTRAL.models.CursaCentral.findAll({ attributes: ['cod_cursa'], raw: true });
      const coduriCurseCentral = curseCentral.map(cursa => cursa.cod_cursa);

      const detaliiFiltrate = detaliiCurse.filter(detaliu => coduriCurseCentral.includes(detaliu.cod_cursa));

      await sequelizeCENTRAL.models.DetaliiCursaCentral.bulkCreate(detaliiFiltrate);
    }

    const existingAngajatiIdentity = await sequelizeCENTRAL.models.AngajatIdentity.findAll();

    if (existingAngajatiIdentity.length === 0) {

      const angajatiRaw = await sequelizeOLTP.models.Angajat.findAll({
        attributes: ['cod_angajat', 'nume', 'prenume']
      });
      
      const angajati = angajatiRaw.map(a => a.toJSON());
      
      await sequelizeCENTRAL.models.AngajatIdentity.bulkCreate(angajati);

    }

    const existingClientiIdentity = await sequelizeCENTRAL.models.ClientIdentity.findAll();

    if (existingClientiIdentity.length === 0) {

      const clientiRaw = await sequelizeOLTP.models.Client.findAll({
        attributes: ['cod_client', 'nume', 'prenume']
      });
      
      const clienti = clientiRaw.map(a => a.toJSON());
      
      await sequelizeCENTRAL.models.ClientIdentity.bulkCreate(clienti);

    }

    await sequelizeCENTRAL.query('COMMIT;');

    if (existingAngajatiCentral.length == 0 || existingCurseCentral.length == 0 || existingLocatiiCentral.length == 0 || existingDetaliiCurseCentral == 0 || existingAngajatiIdentity.length == 0 || existingClientiIdentity == 0){
      await addMessageToDatabase("Datele initiale au fost inserate cu succes in baza de date CENTRAL!", "I", "Admin");
    }
  } catch (err) {
    console.log(err);

    await addMessageToDatabase("Eroare la inserarea datelor initiale pentru CENTRAL", "E", "Admin");
  }
}

async function insertInitialDataARHIVA() {
  try {

    const existingAngajatiHR = await sequelizeARHIVA.models.AngajatHR.findAll();

    if (existingAngajatiHR.length === 0) {

      const angajatiRaw = await sequelizeOLTP.models.Angajat.findAll({
        attributes: ['cod_angajat', 'data_nastere', 'data_angajare', 'salariu', 'cod_masina']
      });
      
      const angajati = angajatiRaw.map(a => a.toJSON());
      
      await sequelizeARHIVA.models.AngajatHR.bulkCreate(angajati);    

    }

    const existingClientiProfil = await sequelizeARHIVA.models.ClientProfil.findAll();

    if (existingClientiProfil.length === 0) {

      const clientiRaw = await sequelizeOLTP.models.Client.findAll({
        attributes: ['cod_client', 'data_nastere', 'nota']
      });
      
      const clienti = clientiRaw.map(a => a.toJSON());
      
      await sequelizeARHIVA.models.ClientProfil.bulkCreate(clienti);    

    }

    await sequelizeARHIVA.query('COMMIT;');

    if (existingAngajatiHR.length == 0 || existingClientiProfil.length == 0){
      await addMessageToDatabase("Datele initiale au fost inserate cu succes in baza de date ARHIVA!", "I", "Admin");
    }
  } catch (err) {
    console.log(err);

    await addMessageToDatabase("Eroare la inserarea datelor initiale pentru ARHIVA", "E", "Admin");
  }
}