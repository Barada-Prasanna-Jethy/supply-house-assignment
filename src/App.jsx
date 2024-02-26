import { useState } from "react";
import "./App.css";
import WeekdayDatePicker from "./components/WeekdayDatePicker";

function App() {
  const predefinedRanges = [
    {
      label: "Last 7 days",
      startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    },
    {
      label: "Last 30 days",
      startDate: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    },
    {
      label: "Last 90 days",
      startDate: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    },
  ];

  const [range, setRange] = useState([]);
  const [weekEnds, setWeekEnds] = useState([]);

  const onDateSubmit = (selectedRange, weekendDates) => {
    setRange(selectedRange);
    setWeekEnds(weekendDates);
  };
  return (
    <>
      <WeekdayDatePicker
        onDateSubmit={onDateSubmit}
        predefinedRanges={predefinedRanges}
      />
      <div>
        {range.length ? (
          <div className="selectedDateContainer">
            <div>
              <h4>Start:</h4>
              <h4>End:</h4>
            </div>
            <div>
              {range.map((date) => (
                <h4>{date.toString()}</h4>
              ))}
            </div>
          </div>
        ) : null}
        {weekEnds.length ? (
          <div>
            <div>
              <h4>WeekEnds:</h4>
              <div>
                {weekEnds.map((date) => (
                  <h4>{date.toString()}</h4>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
