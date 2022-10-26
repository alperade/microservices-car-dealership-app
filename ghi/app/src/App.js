import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import SalesPersonForm from './SalesPersonForm';
// import SalesRecordForm from './SalesRecordForm';
import SalesRecordList from './SalesRecordList';
// import SalesPersonsSalesHistoryList from './SalesPersonsSalesHistoryList';


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
          {/* <Route element={<SalesPersonsSalesHistoryList />} /> */}
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="salesrecords">
            <Route path="" element={<SalesRecordList />} />
            {/* <Route path="new" element={<SalesRecordForm />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
