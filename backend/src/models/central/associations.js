const AngajatCentral = require("./AngajatCentral");
const CursaCentral = require("./CursaCentral");
const DetaliiCursaCentral = require("./DetaliiCursaCentral");
const LocatiiCentral = require("./LocatiiCentral");

const Masina = require("../oltp/Masina");
const Client = require("../oltp/Client");


CursaCentral.belongsTo(AngajatCentral, { foreignKey: "cod_sofer" });
AngajatCentral.hasMany(CursaCentral, { foreignKey: "cod_sofer" });

CursaCentral.belongsTo(LocatiiCentral, { foreignKey: "cod_locatie" });
LocatiiCentral.hasMany(CursaCentral, { foreignKey: "cod_locatie" });

CursaCentral.hasOne(DetaliiCursaCentral, { foreignKey: "cod_cursa" });
DetaliiCursaCentral.belongsTo(CursaCentral, { foreignKey: "cod_cursa" });

CursaCentral.belongsTo(Client, { foreignKey: "cod_client" });
Client.hasMany(CursaCentral, { foreignKey: "cod_client" });

CursaCentral.belongsTo(Masina, { foreignKey: "cod_masina" });
Masina.hasMany(CursaCentral, { foreignKey: "cod_masina" });

AngajatCentral.belongsTo(Masina, { foreignKey: "cod_masina" });
Masina.hasMany(AngajatCentral, { foreignKey: "cod_masina" });