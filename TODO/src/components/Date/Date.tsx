import { useState } from "react";

const DateComponent = () => {
  const [time] = useState(new Date());

  const dayOfWeek = time.getDay();
  const getNumnerDay = time.getDate();
  const monthOfYear = time.getMonth();
  const getYear = time.getFullYear();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fullData = `${days[dayOfWeek]} ${getNumnerDay} ${months[monthOfYear]} ${getYear}`;

  return <div>{fullData}</div>;
};

export default DateComponent;
