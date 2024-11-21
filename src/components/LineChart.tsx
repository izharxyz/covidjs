import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { DiseaseData } from "../types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
);

type TimelineChartProps = {
    filteredData: DiseaseData["timeline"] | null;
};

const TimelineChart: React.FC<TimelineChartProps> = ({ filteredData }) => {
    if (!filteredData) {
        return <p>No data available. Please select a valid date range.</p>;
    }

    const labels = Object.keys(filteredData.cases);

    const casesData = Object.values(filteredData.cases).map(
        (value) => value / 1_000_000
    );
    const deathsData = Object.values(filteredData.deaths).map(
        (value) => value / 1_000_000
    );
    const recoveredData = Object.values(filteredData.recovered).map(
        (value) => value / 1_000_000
    );

    const data = {
        labels,
        datasets: [
            {
                label: "Cases",
                data: casesData,
                borderColor: "#8884d8",
                borderWidth: 2,
                pointRadius: 0,
            },
            {
                label: "Deaths",
                data: deathsData,
                borderColor: "#FF0000",
                borderWidth: 2,
                pointRadius: 0,
            },
            {
                label: "Recovered",
                data: recoveredData,
                borderColor: "#00C49F",
                borderWidth: 2,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Line chart for COVID-19 cases, deaths, and recoveries",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
                ticks: {
                    color: "#333",
                },
                grid: {
                    display: false,
                },
                border: {
                    color: "#333",
                    width: 1,
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Cases (in millions)",
                },
                ticks: {
                    color: "#333",
                },
                grid: {
                    display: false,
                },
                border: {
                    color: "#333",
                    width: 1,
                },
            },
        },
    };

    return <Line options={options} data={data} />;
};

export default TimelineChart;
