import React, { useState } from "react";

interface FormProps {
  submitCityInput: (cityName: string) => void;
}
export default function Form({ submitCityInput }: FormProps) {
  const [cityInput, setCityInput] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    if (cityInput.length === 0) {
      return;
    }
    submitCityInput(cityInput);
    setCityInput("");
  };

  return (
    <form className="FormContainer">
      <h4>City</h4>
      <input value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
      <button type="submit" onClick={submit}>
        Search
      </button>
    </form>
  );
}
