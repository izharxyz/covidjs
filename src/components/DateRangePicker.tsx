import React, { useState, useEffect } from "react";
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
    const defaultFromDate = new Date("2019-01-01");
    const defaultToDate = new Date("2022-01-01");

    const [fromDate, setFromDate] = useState<Date | null>(defaultFromDate);
    const [toDate, setToDate] = useState<Date | null>(defaultToDate);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filterTimeline = () => {
        if (!diseaseData || !fromDate || !toDate) return;

        const timeline = diseaseData.timeline;

        const filteredCases = Object.fromEntries(
            Object.entries(timeline.cases).filter(([date]) => {
                const parsedDate = new Date(date);
                return parsedDate >= fromDate && parsedDate <= toDate;
            })
        );

        const filteredDeaths = Object.fromEntries(
            Object.entries(timeline.deaths).filter(([date]) => {
                const parsedDate = new Date(date);
                return parsedDate >= fromDate && parsedDate <= toDate;
            })
        );

        const filteredRecovered = Object.fromEntries(
            Object.entries(timeline.recovered).filter(([date]) => {
                const parsedDate = new Date(date);
                return parsedDate >= fromDate && parsedDate <= toDate;
            })
        );

        const newFilteredTimeline = {
            cases: filteredCases,
            deaths: filteredDeaths,
            recovered: filteredRecovered,
        };

        onFilter(newFilteredTimeline);
    };

    // Apply filtering on initial render
    useEffect(() => {
        filterTimeline();
    }, [diseaseData]); // Ensure it runs when `diseaseData` is available

    useEffect(() => {
        if (fromDate && toDate) {
            filterTimeline();
        }
    }, [fromDate, toDate]);

    const formatDate = (date: Date | null): string =>
        date
            ? date.toLocaleDateString("en-GB").replace(/\//g, "-")
            : "Select Date";

    return (
        <div className="relative inline-block text-left w-full">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex gap-10 justify-between items-center px-4 py-3 bg-white text-gray-700 rounded-full shadow-xl focus:outline-none"
            >
                {fromDate || toDate ? (
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

            {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-xl focus:outline-none">
                    <div className="flex gap-5 p-2">
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
                                maxDate={toDate || undefined}
                                className="mt-1 block w-full border border-gray-200 rounded-md py-1 px-3 focus:outline-none"
                            />
                        </div>
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
                                minDate={fromDate || undefined}
                                className="mt-1 block w-full border border-gray-200 rounded-md py-1 px-3 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
