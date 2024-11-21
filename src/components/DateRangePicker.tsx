import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { DiseaseData } from "../types";

type DateRangePickerProps = {
    diseaseData: DiseaseData | null;
    onFilter: (filteredData: DiseaseData["timeline"]) => void;
};

export const DateRangePicker = ({
    diseaseData,
    onFilter,
}: DateRangePickerProps) => {
    const defaultFromDate = new Date("2020-01-01");
    const defaultToDate = new Date("2023-01-01");

    const [fromDate, setFromDate] = useState<Date | null>(defaultFromDate);
    const [toDate, setToDate] = useState<Date | null>(defaultToDate);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    /**
     * Filters the timeline data within the selected date range and calculates daily values.
     * Ensures that the cumulative values are converted to daily values by subtracting consecutive days.
     */
    const filterTimeline = () => {
        if (!diseaseData || !fromDate || !toDate) return;

        const { cases, deaths, recovered } = diseaseData.timeline;

        // Helper function to filter by date range and compute daily values
        const filterByDateRangeAndCalculateDailyValues = (
            data: Record<string, number>
        ) => {
            const filteredEntries = Object.entries(data)
                .sort(
                    ([dateA], [dateB]) =>
                        new Date(dateA).getTime() - new Date(dateB).getTime()
                ) // Sorting by date
                .filter(([date]) => {
                    const parsedDate = new Date(date);
                    return parsedDate >= fromDate && parsedDate <= toDate;
                });

            // Compute daily values by subtracting consecutive days
            const dailyValues: Record<string, number> = {};
            for (let i = 1; i < filteredEntries.length; i++) {
                const [prevDate, prevValue] = filteredEntries[i - 1];
                const [currentDate, currentValue] = filteredEntries[i];
                const dailyValue = currentValue - prevValue; // Calculate the difference between consecutive days
                if (dailyValue > 0) {
                    dailyValues[currentDate] = dailyValue; // Store the daily value
                }
            }

            return dailyValues;
        };

        // Filter and calculate daily values for cases, deaths, and recovered
        const filteredTimeline = {
            cases: filterByDateRangeAndCalculateDailyValues(cases),
            deaths: filterByDateRangeAndCalculateDailyValues(deaths),
            recovered: filterByDateRangeAndCalculateDailyValues(recovered),
        };

        // Send the filtered data with daily values to the parent component
        onFilter(filteredTimeline);
    };

    /**
     * Runs filtering whenever `diseaseData` changes or the date range is updated.
     */
    useEffect(() => {
        filterTimeline();
    }, [diseaseData, fromDate, toDate]);

    /**
     * Formats a date into `dd-MM-yyyy` format or returns a placeholder.
     */
    const formatDate = (date: Date | null): string =>
        date
            ? date.toLocaleDateString("en-GB").replace(/\//g, "-")
            : "Select Date";

    return (
        <div className="relative inline-block text-left w-full">
            {/* Dropdown trigger */}
            <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-full flex gap-10 justify-between items-center px-4 py-3 bg-white text-gray-700 rounded-full shadow-sm focus:outline-none"
            >
                {fromDate && toDate ? (
                    `${formatDate(fromDate)} - ${formatDate(toDate)}`
                ) : (
                    <span className="text-gray-400">Select Date Range</span>
                )}
                <svg
                    className="-mr-1 ml-2 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a 1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Dropdown content */}
            {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-sm focus:outline-none">
                    <div className="flex gap-5 p-2">
                        {/* From Date Picker */}
                        <div>
                            <label
                                htmlFor="fromDate"
                                className="block text-sm text-gray-500 font-light"
                            >
                                From
                            </label>
                            <DatePicker
                                id="fromDate"
                                selected={fromDate}
                                onChange={(date: Date | null) =>
                                    setFromDate(date)
                                }
                                dateFormat="dd-MM-yyyy"
                                maxDate={toDate || undefined} // Prevents selecting a date after `toDate`
                                className="mt-1 block w-full border border-gray-200 rounded-md py-1 px-3 focus:outline-none"
                            />
                        </div>
                        {/* To Date Picker */}
                        <div>
                            <label
                                htmlFor="toDate"
                                className="block text-sm font-light text-gray-500"
                            >
                                To
                            </label>
                            <DatePicker
                                id="toDate"
                                selected={toDate}
                                onChange={(date: Date | null) =>
                                    setToDate(date)
                                }
                                dateFormat="dd-MM-yyyy"
                                minDate={fromDate || undefined} // Prevents selecting a date before `fromDate`
                                className="mt-1 block w-full border border-gray-200 rounded-md py-1 px-3 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
