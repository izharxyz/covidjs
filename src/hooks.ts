import { useEffect, useState, useCallback } from "react";
import type { Countries } from "./types";

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
                throw new Error(`Failed to fetch countries: ${response.statusText}`);
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
