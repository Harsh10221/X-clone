// src/BirthDay.jsx

import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 100 }, (_, i) => {
  const year = currentYear - i;
  return { value: year, label: String(year) };
});

// ✅ CORRECTED: The complete list of all 12 months
const monthOptions = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

function BirthDay({ onDataSubmit }) {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [daysInMonth, setDaysInMonth] = useState([]);

  const [Dob, setDob] = useState();

  const handleinput = () => {
    onDataSubmit(Dob);
  };

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const numDays = new Date(selectedYear, selectedMonth, 0).getDate();
      const daysArray = Array.from({ length: numDays }, (_, i) => {
        const day = i + 1;
        return { value: day, label: String(day) };
      });
      setDaysInMonth(daysArray);

      if (selectedDay > numDays) {
        setSelectedDay("");
      }
    } else {
      setDaysInMonth([]);
    }
    // console.log("i am here");
  }, [selectedMonth, selectedYear, selectedDay]);

  useEffect(() => {
    setDob({
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
    });
    handleinput();
  }, [selectedMonth, selectedDay,daysInMonth]);

  return (
    <div className="flex gap-4 w-full max-w-md">
      <CustomSelect
        placeholder="Year"
        options={yearOptions}
        value={selectedYear}
        onChange={setSelectedYear}
      />
      <CustomSelect
        placeholder="Month"
        options={monthOptions}
        value={selectedMonth}
        onChange={setSelectedMonth}
      />
      <CustomSelect
        placeholder="Day"
        options={daysInMonth}
        value={selectedDay}
        onChange={setSelectedDay}
        disabled={!daysInMonth.length}
      />
    </div>
  );
}

export default BirthDay;
