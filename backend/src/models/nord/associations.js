const AngajatNord = require("./AngajatNord");
const CursaNord = require("./CursaNord");
const DetaliiCursaNord = require("./DetaliiCursaNord");
const LocatiiNord = require("./LocatiiNord");

const Masina = require("../oltp/Masina");
const Client = require("../oltp/Client");


CursaNord.belongsTo(AngajatNord, { foreignKey: "cod_sofer", onDelete: "CASCADE" });
AngajatNord.hasMany(CursaNord, { foreignKey: "cod_sofer", onDelete: "CASCADE" });

CursaNord.belongsTo(LocatiiNord, { foreignKey: "cod_locatie", onDelete: "CASCADE" });
LocatiiNord.hasMany(CursaNord, { foreignKey: "cod_locatie", onDelete: "CASCADE" });

CursaNord.hasOne(DetaliiCursaNord, { foreignKey: "cod_cursa", onDelete: "CASCADE" });
DetaliiCursaNord.belongsTo(CursaNord, { foreignKey: "cod_cursa", onDelete: "CASCADE" });

CursaNord.belongsTo(Client, { foreignKey: "cod_client", onDelete: "CASCADE" });
Client.hasMany(CursaNord, { foreignKey: "cod_client", onDelete: "CASCADE" });

CursaNord.belongsTo(Masina, { foreignKey: "cod_masina", onDelete: "CASCADE" });
Masina.hasMany(CursaNord, { foreignKey: "cod_masina", onDelete: "CASCADE" });

AngajatNord.belongsTo(Masina, { foreignKey: "cod_masina", onDelete: "CASCADE" });
Masina.hasMany(AngajatNord, { foreignKey: "cod_masina", onDelete: "CASCADE" });