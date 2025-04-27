const cron = require('node-cron');
const { sequelizeOLTP, sequelizeWarehouse } = require("./config/database");


async function addMessageToDatabase(message, messageType, createdBy) {
    try {
      const validMessageTypes = ['E', 'W', 'I'];
      if (!validMessageTypes.includes(messageType)) {
        throw new Error(
          `Tipul mesajului este invalid: ${messageType}. Tipuri acceptate: ${validMessageTypes.join(", ")}`
        );
      }
  
      await sequelizeOLTP.models.Mesaj.create({
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

function startCronJob() {
    setTimeout(() => {
        cron.schedule('* * * * *', async () => {
            try {

                const angajatData = await sequelizeOLTP.models.Angajat.findAll({
                    attributes: [
                        ["cod_angajat", "cod_angajat"],
                        [sequelizeOLTP.Sequelize.fn("TRIM", sequelizeOLTP.Sequelize.literal("nume" || ' ' || "prenume")), "nume_angajat"],
                        ["tip_angajat", "tip_angajat"],
                        ["data_angajare", "data_angajare"],
                        ["salariu", "salariu"],
                    ],
                    where: {
                        tip_angajat: ["Sofer", "Dispecer"],
                        createdat: { 
                            [sequelizeOLTP.Sequelize.Op.gte]: sequelizeOLTP.Sequelize.literal("CURRENT_TIMESTAMP - INTERVAL '1' MINUTE")
                        }
                    },
                    raw: true,
                });
            
                const formattedAngajatData = angajatData.map(item => ({
                    cod_angajat: item.cod_angajat,
                    nume_angajat: item.nume_angajat,
                    tip_angajat: item.tip_angajat,
                    data_angajare: item.data_angajare,
                    salariu: item.salariu
                }));
            
                if(formattedAngajatData.length > 0){
                    try {
                        await sequelizeWarehouse.models.DimAngajat.bulkCreate(formattedAngajatData);

                        await addMessageToDatabase('Actualizare date in DimAngajat', "I", "Admin");
                    } catch (err) {
                        await addMessageToDatabase('Eroare la actualizarea datelor in DIM_ANGAJAT', "E", "Admin");
                    }
                }
            
                const clientData = await sequelizeOLTP.models.Client.findAll({
                    attributes: [
                        ["cod_client", "cod_client"],
                        [
                            sequelizeOLTP.Sequelize.fn(
                            "TRIM",
                            sequelizeOLTP.Sequelize.literal("nume" || ' ' || "prenume")
                            ),
                            "nume_client"
                        ],
                        ["nota", "nota_client"],
                        [sequelizeOLTP.Sequelize.fn(
                            "COALESCE",
                            sequelizeOLTP.Sequelize.col("apelativ"),
                            sequelizeOLTP.Sequelize.literal("CAST('N/A' AS NVARCHAR2(5))")
                        ), "apelativ"],
                        ["data_nastere", "data_nastere"],
                        ],
                    where: {
                        createdat: { 
                            [sequelizeOLTP.Sequelize.Op.gte]: sequelizeOLTP.Sequelize.literal("CURRENT_TIMESTAMP - INTERVAL '1' MINUTE")
                        }
                    },
                    raw: true,
                });
            
                const formattedClientData = clientData.map(item => ({
                    cod_client: item.cod_client,
                    nume_client: item.nume_client,
                    nota_client: item.nota_client,
                    apelativ: item.apelativ,
                    data_nastere: item.data_nastere,
                }));
            
                if(formattedClientData.length > 0){
                    try {
                        await sequelizeWarehouse.models.DimClient.bulkCreate(formattedClientData);

                        await addMessageToDatabase('Actualizare date in DimClient', "I", "Admin");
                    } catch (err) {
                        await addMessageToDatabase('Eroare la actualizarea datelor in DIM_CLIENT', "E", "Admin");
                    }
                }
            
                const facturaData = await sequelizeOLTP.models.Factura.findAll({
                    attributes: [
                        ["cod_factura", "cod_factura"],
                        ["cod_dispecer", "cod_dispecer"],
                        ["cod_cursa", "cod_cursa"],
                        [sequelizeOLTP.Sequelize.col("Cursa->DetaliiCursa.data_cursa"), "data_emitere"],
                        ["pret", "pret"],
                    ],
                    include: [
                        {
                            model: sequelizeOLTP.models.Cursa,
                            attributes: [],
                            include: [
                            {
                                model: sequelizeOLTP.models.DetaliiCursa,
                                attributes: [],
                            },
                            ],
                        },
                    ],
                    where: {
                        pret: { [sequelizeOLTP.Sequelize.Op.gt]: 0},
                        createdat: { 
                            [sequelizeOLTP.Sequelize.Op.gte]: sequelizeOLTP.Sequelize.literal("CURRENT_TIMESTAMP - INTERVAL '1' MINUTE")
                        }
                    },
                    raw: true,
                });
            
                if(facturaData.length > 0){
                    try {
                        for (const item of facturaData) {
                            await sequelizeWarehouse.models.DimFactura.create(item);
                        }

                        await addMessageToDatabase('Actualizare date in DimFactura', "I", "Admin");
                    } catch (err) {
                        await addMessageToDatabase('Eroare la actualizarea datelor in DIM_FACTURA', "E", "Admin");
                    }
                }
            
                const locatieData = await sequelizeOLTP.models.Locatii.findAll({
                    attributes: [
                        ["cod_locatie", "cod_locatie"],
                        ["localitate", "localitate"],
                        ["judet", "judet"],
                    ],
                    where: {
                        createdat: { 
                            [sequelizeOLTP.Sequelize.Op.gte]: sequelizeOLTP.Sequelize.literal("CURRENT_TIMESTAMP - INTERVAL '1' MINUTE")
                        }
                    },
                    raw: true,
                });

                const formattedLocatieData = locatieData.map(item => ({
                    cod_locatie: item.cod_locatie,
                    localitate: item.localitate,
                    judet: item.judet,
                }));
            
                if(formattedLocatieData.length > 0){
                    try {
                        await sequelizeWarehouse.models.DimLocatie.bulkCreate(formattedLocatieData);

                        await addMessageToDatabase('Actualizare date in DimLocatie', "I", "Admin");
                    } catch (err) {
                        await addMessageToDatabase('Eroare la actualizarea datelor in DIM_LOCATIE', "E", "Admin");
                    }
                }

                const masinaData = await sequelizeOLTP.models.Masina.findAll({
                    attributes: [
                        ["cod_masina", "cod_masina"],
                        ["marca", "marca"],
                        ["model", "model"],
                        ["data_achizitionare", "data_achizitionare"],
                        ["data_revizie_urm", "data_revizie_urm"],
                    ],
                    where: {
                        createdat: { 
                            [sequelizeOLTP.Sequelize.Op.gte]: sequelizeOLTP.Sequelize.literal("CURRENT_TIMESTAMP - INTERVAL '1' MINUTE")
                        }
                    },
                    raw: true,
                });

                const formattedMasinaData = masinaData.map(item => ({
                    cod_masina: item.cod_masina,
                    marca: item.marca,
                    model: item.model,
                    data_achizitionare: item.data_achizitionare,
                    data_revizie_urm: item.data_revizie_urm,
                }));

                if(formattedMasinaData.length > 0){
                    try {
                        await sequelizeWarehouse.models.DimMasina.bulkCreate(formattedMasinaData);

                        await addMessageToDatabase('Actualizare date in DimMasina', "I", "Admin");
                    } catch (err) {
                        console.error("Eroare la actualizarea datelor in DimMasina:", err);
                        
                        await addMessageToDatabase('Eroare la actualizarea datelor in DimMasina', "E", "Admin");
                    }
                }

                const cursaData = await sequelizeOLTP.models.Factura.findAll({
                    attributes: [
                        [sequelizeOLTP.Sequelize.col("Cursa.cod_cursa"), "cod_cursa"],
                        [sequelizeOLTP.Sequelize.col("Cursa->DetaliiCursa.nota_sofer"), "nota_sofer"],
                        [sequelizeOLTP.Sequelize.col("Cursa->DetaliiCursa.nota_client"), "nota_client"],
                        [sequelizeOLTP.Sequelize.col("Factura.cod_factura"), "cod_factura"],
                        [sequelizeOLTP.Sequelize.col("Cursa.cod_client"), "cod_client"],
                        [sequelizeOLTP.Sequelize.col("Cursa.cod_sofer"), "cod_sofer"],
                        [sequelizeOLTP.Sequelize.col("Cursa.cod_masina"), "cod_masina"],
                        [sequelizeOLTP.Sequelize.col("Cursa.cod_locatie"), "cod_locatie"],
                        [sequelizeOLTP.Sequelize.col("Cursa->Angajat.cod_angajat"), "cod_angajat"],
                        [sequelizeOLTP.Sequelize.col("Cursa->DetaliiCursa.data_cursa"), "data_cursa"],
                    ],
                    include: [
                        {
                            model: sequelizeOLTP.models.Cursa,
                            attributes: [],
                            include: [
                                {
                                    model: sequelizeOLTP.models.DetaliiCursa,
                                    attributes: [],
                                },
                                {
                                    model: sequelizeOLTP.models.Angajat,
                                    attributes: [],
                                },
                            ],
                        },
                    ],
                    where: {
                        createdat: { 
                            [sequelizeOLTP.Sequelize.Op.gte]: sequelizeOLTP.Sequelize.literal("CURRENT_TIMESTAMP - INTERVAL '1' MINUTE")
                        }
                    },
                    raw: true,
                });

                const dimTimpData = await sequelizeWarehouse.models.DimTimp.findAll({
                    attributes: ["cod_timp", "data"],
                    raw: true,
                });

                const dimTimpMap = dimTimpData.reduce((map, dim) => {
                    map[dim.data] = dim.cod_timp;
                    return map;
                }, {});

                const formattedFCursaData = cursaData.map(item => {
                    const codTimp = dimTimpMap[item.data_cursa] || null;

                    if (!codTimp) {
                        console.warn(`Nu s-a găsit cod_timp pentru data_cursa: ${item.data_cursa}`);
                        return null;
                    }

                    return {
                        cod_cursa: item.cod_cursa,
                        nota_sofer: item.nota_sofer,
                        nota_client: item.nota_client,
                        cod_factura: item.cod_factura,
                        cod_client: item.cod_client,
                        cod_sofer: item.cod_sofer,
                        cod_masina: item.cod_masina,
                        cod_locatie: item.cod_locatie,
                        cod_angajat: item.cod_angajat,
                        cod_timp: codTimp,
                    };
                }).filter(item => item !== null);

                if(formattedFCursaData.length > 0){
                    try {
                        await sequelizeWarehouse.models.FCursa.bulkCreate(formattedFCursaData);

                        await addMessageToDatabase('Actualizare date in FCursa', "I", "Admin");
                    } catch (error) {
                        console.error("Eroare la actualizarea datelor in FCursa:", error);
                        
                        await addMessageToDatabase('Eroare la actualizarea datelor in FCursa', "E", "Admin");
                    }
                }

                if(formattedAngajatData.length > 0 || formattedClientData.length > 0 || facturaData.length > 0 || formattedLocatieData.length > 0 || formattedMasinaData.length > 0 || formattedFCursaData.length > 0){
                    try {
                        await addMessageToDatabase('Datele au fost sincronizate cu succes in baza de date de tip warehouse!', "I", "Admin");
                    } catch (_) {
                        console.error('Eroare la logarea mesajului în baza de date:', logError);
                    }
                }
                else{
                    try {
                        await addMessageToDatabase('ETL executat cu succes! Nu exista date noi.', "I", "Admin");
                    } catch (_) {
                        console.error('Eroare la logarea mesajului în baza de date:', logError);
                    }
                }
            } catch (err) {

                try {
                    console.error("Eroare generala la rularea ETL cronjob-ului:", err);
                    await addMessageToDatabase('Eroare generala la rularea cronjob-ului', "E", "Admin");
                } catch (_) {}
            }
        });
    }, 1 * 0);
}

module.exports = { startCronJob };