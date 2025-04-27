import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useRef } from "react";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const endpoints = [1, 2, 3, 4, 5].map((id) => `http://localhost:3001/api/warehouse/ex10/${id}`);

const GraficeManagement = () => {
  const [dataSets, setDataSets] = useState([[], [], [], [], []]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
      hasFetched.current = true;

    Promise.all(endpoints.map((url) => fetch(url).then((res) => res.json())))
      .then((responses) => setDataSets(responses))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const chartConfigs = [
    {
      title: "Performanta soferilor",
      labels: dataSets[0].map((item) => item.SOFER),
      datasetLabel: "Media Notelor",
      data: dataSets[0].map((item) => item.MEDIA_NOTE),
    },
    {
      title: "Venituri per locatie",
      labels: dataSets[1].map((item) => item.LOCATIE),
      datasetLabel: "Venit Total",
      data: dataSets[1].map((item) => item.VENIT_TOTAL),
    },
    {
      title: "Performanta financiara a soferilor",
      labels: dataSets[2].map((item) => item.NUME_ANGAJAT),
      datasetLabel: "Venit Total",
      data: dataSets[2].map((item) => item.VENIT_TOTAL),
    },
    {
      title: "Utilizarea flotei de vehicule",
      labels: dataSets[3].map((item) => item.LUNA),
      datasetLabel: "Număr Curse",
      data: dataSets[3].map((item) => item.NUMAR_CURSE),
    },
    {
      title: "Evaluarea satisfactiei clientilor",
      labels: dataSets[4].map((item) => item.INTERVAL_NOTE),
      datasetLabel: "Număr Recenzii",
      data: dataSets[4].map((item) => item.NUMAR_RECENZII),
    },
  ];

  const chartOptions = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      title: { display: true },
      tooltip: {
        callbacks: { label: (context) => `${context.raw}` },
      },
    },
    scales: { x: { beginAtZero: true } },
  };

  return (
    <div>
      <h2>Grafice warehouse</h2>
      {dataSets.every((data) => data.length === 0) ? (
        <p>Loading...</p>
      ) : (
        chartConfigs.map((config, index) => (
          <div key={index} style={{ marginBottom: "40px" }}>
            <h3>{config.title}</h3>
            <Bar
              data={{
                labels: config.labels,
                datasets: [
                  {
                    label: config.datasetLabel,
                    data: config.data,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{ ...chartOptions, plugins: { title: { display: true, text: config.title } } }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default GraficeManagement;