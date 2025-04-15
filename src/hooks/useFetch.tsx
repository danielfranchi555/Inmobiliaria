"use client";
import { NextApiResponse } from "next";
import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<NextApiResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError("Failed to fetch data");
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { properties: data, error };
};

export default useFetch;
