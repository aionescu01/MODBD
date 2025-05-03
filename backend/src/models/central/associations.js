const AngajatCentral = require("./AngajatCentral");
const CursaCentral = require("./CursaCentral");
const DetaliiCursaCentral = require("./DetaliiCursaCentral");
const LocatiiCentral = require("./LocatiiCentral");

const Masina = require("../oltp/Masina");
const Client = require("../oltp/Client");


CursaCentral.belongsTo(AngajatCentral, { foreignKey: "cod_sofer", onDelete: "CASCADE" });
AngajatCentral.hasMany(CursaCentral, { foreignKey: "cod_sofer", onDelete: "CASCADE" });

CursaCentral.belongsTo(LocatiiCentral, { foreignKey: "cod_locatie", onDelete: "CASCADE" });
LocatiiCentral.hasMany(CursaCentral, { foreignKey: "cod_locatie", onDelete: "CASCADE" });

CursaCentral.hasOne(DetaliiCursaCentral, { foreignKey: "cod_cursa", onDelete: "CASCADE" });
DetaliiCursaCentral.belongsTo(CursaCentral, { foreignKey: "cod_cursa", onDelete: "CASCADE" });

CursaCentral.belongsTo(Client, { foreignKey: "cod_client", onDelete: "CASCADE" });
Client.hasMany(CursaCentral, { foreignKey: "cod_client", onDelete: "CASCADE" });

CursaCentral.belongsTo(Masina, { foreignKey: "cod_masina", onDelete: "CASCADE" });
Masina.hasMany(CursaCentral, { foreignKey: "cod_masina", onDelete: "CASCADE" });

AngajatCentral.belongsTo(Masina, { foreignKey: "cod_masina", onDelete: "CASCADE" });
Masina.hasMany(AngajatCentral, { foreignKey: "cod_masina", onDelete: "CASCADE" });