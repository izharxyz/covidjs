import { useEffect, useState, useCallback } from "react";
import type { Countries, DiseaseData } from "./types";

export function useFetchCountries() {
    const [countries, setCountries] = useState<Countries>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            if (!response.ok) {
                setError(`Failed to fetch countries: ${response.statusText}`);
            }
            const data: Countries = await response.json();
            setCountries(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    return { countries, loading, error, refetch: fetchCountries };
}

export function useFetchDiseaseData(initialCountry: string) {
    const [country, setCountry] = useState<string>(initialCountry);
    const [diseaseData, setDiseaseData] = useState<DiseaseData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDiseaseData = useCallback(
        async (countryToFetch: string = country) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://disease.sh/v3/covid-19/historical/${countryToFetch}?lastdays=1500`
                );
                if (!response.ok) {
                    setError(
                        `Failed to fetch data for ${countryToFetch}: ${response.statusText}`
                    );
                }
                const data = await response.json();
                setDiseaseData(data);
            } catch (err: unknown) {
                setError(
                    err instanceof Error ? err.message : "An unknown error occurred."
                );
            } finally {
                setLoading(false);
            }
        },
        [country]
    );

    useEffect(() => {
        if (country) {
            fetchDiseaseData();
        }
    }, [fetchDiseaseData, country]);

    return {
        diseaseData,
        loading,
        error,
        refetch: (newCountry?: string) => {
            if (newCountry) {
                setCountry(newCountry);
                fetchDiseaseData(newCountry);
            } else {
                fetchDiseaseData();
            }
        },
    };
}
