import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import SalesPersonForm from './SalesPersonForm';
import SalesRecordForm from './SalesRecordForm';
import SalesRecordList from './SalesRecordList';
import SalesHistoryList from './SalesHistoryList';
import AppointmentsList from './Service/AppointmentsList';
import VinHistory from './Service/VinHistory';
import AppointmentForm from './Service/AppointmentForm';
import TechnicianForm from './Service/TechnicianForm';
import ManufacturersList from './Inventory/ManufacturersList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import AutomobileForm from './Inventory/AutomobileForm';
import ManufacturersForm from './Inventory/ManufacturersForm';
import VehicleModelList from './Inventory/VehicleModelList';
import AutomobileList from './Inventory/AutomobileList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="salespersons">
            <Route path="history" element={<SalesHistoryList />} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="salesrecords">
            <Route path="" element={<SalesRecordList />} />
            <Route path="new" element={<SalesRecordForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentsList />} />
            <Route path='history' element={<VinHistory />} />
            <Route path='create' element={<AppointmentForm />} />
          </Route>
          <Route path="technicians">
            <Route path='new' element={<TechnicianForm />} />
          </Route>
          <Route path="inventory">
            <Route path='create-manufacturers' element={<ManufacturersForm />} />
            <Route path='manufacturers' element={<ManufacturersList />} />
            <Route path='create-model' element={<VehicleModelForm />} />
            <Route path='models' element={<VehicleModelList />} />
            <Route path='create-automobile' element={<AutomobileForm />} />
            <Route path='automobile' element={<AutomobileList/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
