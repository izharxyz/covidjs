import { useEffect, useState } from "react";

import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import { DateRangePicker } from "./components/DateRangePicker";
import { useFetchDiseaseData } from "./hooks";
import { DiseaseData } from "./types";
import TimelineChart from "./components/LineChart";
import PopulationChart from "./components/PieChart";
import StatisticalCard from "./components/StatisticalCard";

function App() {
    const [country, setCountry] = useState("IN");
    const { diseaseData, error, refetch } = useFetchDiseaseData(country);

    const [filteredData, setFilteredData] = useState<
        DiseaseData["timeline"] | null
    >(null);

    const handleFilter = (filteredTimeline: DiseaseData["timeline"]) => {
        setFilteredData(filteredTimeline);
    };

    useEffect(() => {
        if (country) {
            refetch(country);
        }
    }, [country]);

    useEffect(() => {
        if (filteredData) {
            console.log(filteredData);
        }
    }, [filteredData]);

    const totals = calculateTotals(filteredData);

    return (
        <main className="container py-10 min-h-[100svh]">
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-20 pt-10">
                <div className="w-full col-span-1 md:col-span-2">
                    <CountrySelector
                        onSelect={(countryCode) => setCountry(countryCode)}
                    />
                </div>
                <div className="w-full">
                    <DateRangePicker
                        diseaseData={diseaseData}
                        onFilter={handleFilter}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-20 py-10">
                <StatisticalCard
                    color="bg-purple-400"
                    percentage="100%"
                    value={totals?.totalCases}
                    title="Total Cases"
                />
                <StatisticalCard
                    color="bg-green-400"
                    percentage={
                        totals?.totalCases
                            ? (
                                  (totals.totalRecovered / totals.totalCases) *
                                  100
                              ).toFixed(2)
                            : "0"
                    }
                    value={totals?.totalRecovered}
                    title="Recoveries"
                />
                <StatisticalCard
                    color="bg-red-400"
                    percentage={
                        totals?.totalCases
                            ? (
                                  (totals.totalDeaths / totals.totalCases) *
                                  100
                              ).toFixed(2)
                            : "0"
                    }
                    value={totals?.totalDeaths}
                    title="Deaths"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-20 py-10 w-full">
                <div className="w-full col-span-1 md:col-span-2">
                    <TimelineChart filteredData={filteredData} />
                </div>
                <div className="w-full">
                    <PopulationChart filteredData={filteredData} />
                </div>
            </div>
        </main>
    );
}

export default App;

type TotalStats = {
    totalCases: number;
    totalRecovered: number;
    totalDeaths: number;
};
function calculateTotals(
    filteredData: DiseaseData["timeline"] | null
): TotalStats | null {
    if (!filteredData) return null;

    const calculateDailyDifference = (data: Record<string, number>) => {
        const values = Object.values(data);
        let total = 0;

        for (let i = 1; i < values.length; i++) {
            total += Math.max(0, values[i] - values[i - 1]); // Ensure no negative differences
        }

        return total;
    };

    const totalCases = calculateDailyDifference(filteredData.cases);
    const totalRecovered = calculateDailyDifference(filteredData.recovered);
    const totalDeaths = calculateDailyDifference(filteredData.deaths);

    return { totalCases, totalRecovered, totalDeaths };
}
