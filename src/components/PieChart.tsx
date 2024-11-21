import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { DiseaseData } from "../types";

ChartJS.register(ArcElement, Tooltip, Legend);

type PopulationChartProps = {
    filteredData: DiseaseData["timeline"] | null;
};

const PopulationChart: React.FC<PopulationChartProps> = ({ filteredData }) => {
    if (!filteredData) {
        return <p>No data available. Please select a valid date range.</p>;
    }

    const totalCases = Object.values(filteredData.cases).reduce(
        (acc, curr) => acc + curr,
        0
    );
    const totalDeaths = Object.values(filteredData.deaths).reduce(
        (acc, curr) => acc + curr,
        0
    );
    const totalRecovered = Object.values(filteredData.recovered).reduce(
        (acc, curr) => acc + curr,
        0
    );

    const data = {
        labels: ["Population", "Deaths", "Recovered"],
        datasets: [
            {
                data: [totalCases, totalDeaths, totalRecovered],
                backgroundColor: ["#fde68a", "#ef4444", "#00C49F"], //
                borderWidth: 0,
                hoverOffset: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: "50%",
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    filter: (legendItem: any) =>
                        legendItem.text === "Population",
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem: any) {
                        const value = tooltipItem.raw;
                        const label = tooltipItem.label;
                        return `${label}: ${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full flex justify-center items-center">
            {/* @ts-ignore */}
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default PopulationChart;
