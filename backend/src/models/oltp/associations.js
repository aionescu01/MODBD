const Angajat = require("./Angajat");
const Client = require("./Client");
const Cursa = require("./Cursa");
const DetaliiCursa = require("./DetaliiCursa");
const Discount = require("./Discount");
const Factura = require("./Factura");
const IstoricSofer = require("./IstoricSofer");
const Locatii = require("./Locatii");
const LucreazaIn = require("./LucreazaIn");
const Masina = require("./Masina");


Angajat.belongsTo(Masina, { foreignKey: "cod_masina" });
Masina.hasOne(Angajat, { foreignKey: "cod_masina" });

Cursa.belongsTo(Angajat, { foreignKey: "cod_sofer" });
Angajat.hasMany(Cursa, { foreignKey: "cod_sofer" });

Cursa.belongsTo(Client, { foreignKey: "cod_client" });
Client.hasMany(Cursa, { foreignKey: "cod_client" });

Cursa.belongsTo(Locatii, { foreignKey: "cod_locatie" });
Locatii.hasMany(Cursa, { foreignKey: "cod_locatie" });

DetaliiCursa.belongsTo(Cursa, { foreignKey: "cod_cursa" });
Cursa.hasOne(DetaliiCursa, { foreignKey: "cod_cursa" });

IstoricSofer.belongsTo(Angajat, { foreignKey: "cod_sofer" });
Angajat.hasOne(IstoricSofer, { foreignKey: "cod_sofer" });

Angajat.belongsToMany(Locatii, { through: LucreazaIn, foreignKey: "cod_angajat" });
Locatii.belongsToMany(Angajat, { through: LucreazaIn, foreignKey: "cod_locatie" });

Masina.hasMany(Cursa, { foreignKey: "cod_masina" });
Cursa.belongsTo(Masina, { foreignKey: "cod_masina" });

Factura.belongsTo(Cursa, { foreignKey: "cod_cursa" });
Cursa.hasOne(Factura, { foreignKey: "cod_cursa" });

Factura.belongsTo(Angajat, { foreignKey: "cod_dispecer" });
Angajat.hasMany(Factura, { foreignKey: "cod_dispecer" });