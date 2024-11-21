import { useState } from "react";
import { useFetchCountries } from "../hooks";
import type { Country } from "../types";

type CountrySelectorProps = {
    onSelect: (countryCode: string) => void;
};

export default function CountrySelector({ onSelect }: CountrySelectorProps) {
    const { countries, loading, error } = useFetchCountries();
    const [search, setSearch] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleSelect = (countryCode: string) => {
        setSelectedCountry(countryCode);
        onSelect(countryCode);
        setIsFocused(false);
    };

    const filteredCountries = countries.filter(
        (country: Country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase()) ||
            country.cca3.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setTimeout(() => setIsFocused(false), 200);
                    }}
                    className="w-full rounded-full px-8 py-3 focus:outline-none shadow-xl"
                />
                {isFocused && (
                    <div className="absolute z-10 bg-white mt-1 w-full max-h-60 overflow-auto rounded-lg shadow-xl">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">
                                Loading...
                            </div>
                        ) : error ? (
                            <div className="p-4 text-center text-red-500">
                                {error}
                            </div>
                        ) : filteredCountries.length > 0 ? (
                            filteredCountries.map((country: Country) => (
                                <div
                                    key={country.cca2}
                                    onClick={() => handleSelect(country.cca2)}
                                    className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${
                                        selectedCountry === country.cca2
                                            ? "bg-blue-200"
                                            : ""
                                    }`}
                                >
                                    {country.name.common}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No countries found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
