import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentsList from './Service/AppointmentsList';
import VinHistory from './Service/VinHistory';
import AppointmentForm from './Service/AppointmentForm';
import TechnicianForm from './Service/TechnicianForm';
import ManufacturersList from './Inventory/ManufacturersList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import AutomobileForm from './Inventory/AutomobileForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="appointments">
            <Route index element={<AppointmentsList />} />
            <Route path='history' element={<VinHistory />} />
            <Route path='create' element={<AppointmentForm />} />
          </Route>
          <Route path="technicians">
            <Route path='new' element={<TechnicianForm />} />
          </Route>
          <Route path="inventory">
            <Route path='manufacturers' element={<ManufacturersList />} />
            <Route path='create-model' element={<VehicleModelForm />} />
            <Route path='create-automobile' element={<AutomobileForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
