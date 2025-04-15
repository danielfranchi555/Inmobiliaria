"use client";

import { useEffect, useState } from "react";

export const DolarPrice = () => {
  const [valueDolar, setValueDolar] = useState(null);

  useEffect(() => {
    const getDolarPrice = async () => {
      const response = await fetch("https://dolarapi.com/v1/dolares");
      const data = await response.json();
      setValueDolar(data);
    };

    getDolarPrice();
  }, []);

  console.log(valueDolar);

  return <div>DolarPrice</div>;
};
