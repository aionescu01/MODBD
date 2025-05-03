const Angajat = require("./Angajat");
const Client = require("./Client");
const Cursa = require("./Cursa");
const DetaliiCursa = require("./DetaliiCursa");
const Factura = require("./Factura");
const IstoricSofer = require("./IstoricSofer");
const Locatii = require("./Locatii");
const LucreazaIn = require("./LucreazaIn");
const Masina = require("./Masina");


Angajat.belongsTo(Masina, { foreignKey: "cod_masina", onDelete: "CASCADE" });
Masina.hasOne(Angajat, { foreignKey: "cod_masina", onDelete: "CASCADE" });

Cursa.belongsTo(Angajat, { foreignKey: "cod_sofer", onDelete: "CASCADE" });
Angajat.hasMany(Cursa, { foreignKey: "cod_sofer", onDelete: "CASCADE" });

Cursa.belongsTo(Client, { foreignKey: "cod_client", onDelete: "CASCADE" });
Client.hasMany(Cursa, { foreignKey: "cod_client", onDelete: "CASCADE" });

Cursa.belongsTo(Locatii, { foreignKey: "cod_locatie", onDelete: "CASCADE" });
Locatii.hasMany(Cursa, { foreignKey: "cod_locatie", onDelete: "CASCADE" });

DetaliiCursa.belongsTo(Cursa, { foreignKey: "cod_cursa", onDelete: "CASCADE" });
Cursa.hasOne(DetaliiCursa, { foreignKey: "cod_cursa", onDelete: "CASCADE" });

IstoricSofer.belongsTo(Angajat, { foreignKey: "cod_sofer", onDelete: "CASCADE" });
Angajat.hasOne(IstoricSofer, { foreignKey: "cod_sofer", onDelete: "CASCADE" });

Angajat.belongsToMany(Locatii, { through: LucreazaIn, foreignKey: "cod_angajat", onDelete: "CASCADE" });
Locatii.belongsToMany(Angajat, { through: LucreazaIn, foreignKey: "cod_locatie", onDelete: "CASCADE" });

Masina.hasMany(Cursa, { foreignKey: "cod_masina", onDelete: "CASCADE" });
Cursa.belongsTo(Masina, { foreignKey: "cod_masina", onDelete: "CASCADE" });

Factura.belongsTo(Cursa, { foreignKey: "cod_cursa", onDelete: "CASCADE" });
Cursa.hasOne(Factura, { foreignKey: "cod_cursa", onDelete: "CASCADE" });

Factura.belongsTo(Angajat, { foreignKey: "cod_dispecer", onDelete: "CASCADE" });
Angajat.hasMany(Factura, { foreignKey: "cod_dispecer", onDelete: "CASCADE" });