
import userData from "./data/userData"
import WeekDays from './components/WeekDays'


const App = () => {
  const timeZone = 'GMT'
  const weekDayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const weekDayOrder = [ 0, 1, 2, 3, 4, 5, 6] // Change order/remove days 0=Sunday, 6=Saturday
  const currentDayName = weekDayNames[new Date().getDay()]

  return (
    <div className="vh-100 d-flex align-items-center">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between mb-3" >
          <div>
            <h1 className="display-4">Opening Times</h1>
          </div>
          <div className="mt-auto">
            <h3>{currentDayName}</h3>
            </div>
        </div>
        <div className="accordion" id="weekdaysAccordion">
          <WeekDays currentDay={currentDayName} weekDayNames={weekDayNames} weekDayOrder={weekDayOrder} openingTimes={userData}/>  
        </div>
        <p className="mt-3 d-flex justify-content-end">All times in {timeZone}</p>
  
      </div>    
    </div>
  );
};

export default App;
