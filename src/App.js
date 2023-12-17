import logo from './logo.svg';
import './App.css';
import DatasTable from './DatasTable.js';

let header = [
  {key:"firstName",value:"Firstname"},
  {key:"lastName",value:"LastName"},
  {key:"birthDate",value:"Birth Date"},
  {key:"startDate",value:"Start Date"},
  {key:"street",value:"Street"},
  {key:"city",value:"City"},
  {key:"state",value:"State"},
  {key:"zipCode",value:"Zip Code"},
  {key:"department",value:"Department"}];


function App() {

  // let employees = useSelector(state => state.employees);
  // let employees = JSON.parse(window.localStorage.getItem('employees')) || useSelector(state => state.employees);

  return (
      <div className="employees-list_container">
          <h1>Current Employees</h1>
          {/* <DatasTable head={header} datas={employees}></DatasTable> */}
      </div>
  );
  
}

export default App;
