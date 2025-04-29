const AngajatNord = require("./AngajatNord");
const CursaNord = require("./CursaNord");
const DetaliiCursaNord = require("./DetaliiCursaNord");
const LocatiiNord = require("./LocatiiNord");

const Masina = require("../oltp/Masina");
const Client = require("../oltp/Client");


CursaNord.belongsTo(AngajatNord, { foreignKey: "cod_sofer" });
AngajatNord.hasMany(CursaNord, { foreignKey: "cod_sofer" });

CursaNord.belongsTo(LocatiiNord, { foreignKey: "cod_locatie" });
LocatiiNord.hasMany(CursaNord, { foreignKey: "cod_locatie" });

CursaNord.hasOne(DetaliiCursaNord, { foreignKey: "cod_cursa" });
DetaliiCursaNord.belongsTo(CursaNord, { foreignKey: "cod_cursa" });

CursaNord.belongsTo(Client, { foreignKey: "cod_client" });
Client.hasMany(CursaNord, { foreignKey: "cod_client" });

CursaNord.belongsTo(Masina, { foreignKey: "cod_masina" });
Masina.hasMany(CursaNord, { foreignKey: "cod_masina" });

AngajatNord.belongsTo(Masina, { foreignKey: "cod_masina" });
Masina.hasMany(AngajatNord, { foreignKey: "cod_masina" });