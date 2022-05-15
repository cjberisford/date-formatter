
import openingTimes from "./data/userData";
import WeekDays from "./components/WeekDays";

const App = () => {
  return (
    <div className="vh-100 d-flex align-items-center">
      <div className="container">
        {/* <h3 className="d-flex justify-content-end"></h3> */}
        <div className="accordion" id="weekdaysAccordion">
          <WeekDays openingTimes={openingTimes}/>  
        </div>
      </div>
    </div>    
  );
};

export default App;
