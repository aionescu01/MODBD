const AngajatSud = require("./AngajatSud");
const CursaSud = require("./CursaSud");
const DetaliiCursaSud = require("./DetaliiCursaSud");
const LocatiiSud = require("./LocatiiSud");

const Masina = require("../oltp/Masina");
const Client = require("../oltp/Client");


CursaSud.belongsTo(AngajatSud, { foreignKey: "cod_sofer", onDelete: "CASCADE" });
AngajatSud.hasMany(CursaSud, { foreignKey: "cod_sofer", onDelete: "CASCADE" });

CursaSud.belongsTo(LocatiiSud, { foreignKey: "cod_locatie", onDelete: "CASCADE" });
LocatiiSud.hasMany(CursaSud, { foreignKey: "cod_locatie", onDelete: "CASCADE" });

CursaSud.hasOne(DetaliiCursaSud, { foreignKey: "cod_cursa", onDelete: "CASCADE" });
DetaliiCursaSud.belongsTo(CursaSud, { foreignKey: "cod_cursa", onDelete: "CASCADE" });

CursaSud.belongsTo(Client, { foreignKey: "cod_client", onDelete: "CASCADE" });
Client.hasMany(CursaSud, { foreignKey: "cod_client", onDelete: "CASCADE" });

CursaSud.belongsTo(Masina, { foreignKey: "cod_masina", onDelete: "CASCADE" });
Masina.hasMany(CursaSud, { foreignKey: "cod_masina", onDelete: "CASCADE" });

AngajatSud.belongsTo(Masina, { foreignKey: "cod_masina", onDelete: "CASCADE" });
Masina.hasMany(AngajatSud, { foreignKey: "cod_masina", onDelete: "CASCADE" });