const AngajatSud = require("./AngajatSud");
const CursaSud = require("./CursaSud");
const DetaliiCursaSud = require("./DetaliiCursaSud");
const LocatiiSud = require("./LocatiiSud");

const Masina = require("../oltp/Masina");
const Client = require("../oltp/Client");


CursaSud.belongsTo(AngajatSud, { foreignKey: "cod_sofer" });
AngajatSud.hasMany(CursaSud, { foreignKey: "cod_sofer" });

CursaSud.belongsTo(LocatiiSud, { foreignKey: "cod_locatie" });
LocatiiSud.hasMany(CursaSud, { foreignKey: "cod_locatie" });

CursaSud.hasOne(DetaliiCursaSud, { foreignKey: "cod_cursa" });
DetaliiCursaSud.belongsTo(CursaSud, { foreignKey: "cod_cursa" });

CursaSud.belongsTo(Client, { foreignKey: "cod_client" });
Client.hasMany(CursaSud, { foreignKey: "cod_client" });

CursaSud.belongsTo(Masina, { foreignKey: "cod_masina" });
Masina.hasMany(CursaSud, { foreignKey: "cod_masina" });

AngajatSud.belongsTo(Masina, { foreignKey: "cod_masina" });
Masina.hasMany(AngajatSud, { foreignKey: "cod_masina" });