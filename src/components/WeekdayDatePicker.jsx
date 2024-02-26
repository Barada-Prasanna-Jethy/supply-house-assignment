import { useState } from "react";

const WeekdayDatePicker = ({ onDateSubmit, predefinedRanges }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    const date = new Date(value);

    if (date.getDay() !== 0 && date.getDay() !== 6) {
      if (name === "start") {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    } else {
      window.alert("Please select a week day");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (startDate && endDate) {
      const weekendDates = getWeekendDates(startDate, endDate);
      onDateSubmit && onDateSubmit([startDate, endDate], weekendDates);
    }
  };

  const getWeekendDates = (start, end) => {
    const weekends = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekends;
  };

  const renderPredefinedRanges = () => {
    return predefinedRanges.map((range, index) => (
      <button key={index} onClick={() => handlePredefinedRange(range)}>
        {range.label}
      </button>
    ));
  };

  const handlePredefinedRange = (range) => {
    const { startDate, endDate } = range;
    setStartDate(new Date(startDate));
    setEndDate(new Date(endDate));
  };

  return (
    <div className="weekdayDatePicker">
      <form onSubmit={handleSubmit}>
        <div className="dateInputContainer">
          <div className="dateInput">
            <label htmlFor="start">Start Date:</label>
            <input
              type="date"
              id="start"
              name="start"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="dateInput">
            <label htmlFor="end">End Date:</label>
            <input
              type="date"
              id="end"
              name="end"
              value={endDate ? endDate.toISOString().split("T")[0] : ""}
              onChange={handleDateChange}
              required
            />
          </div>
        </div>
        <div className="predefinedRanges">{renderPredefinedRanges()}</div>
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WeekdayDatePicker;
