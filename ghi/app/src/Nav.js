import { NavLink } from 'react-router-dom';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Sales</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/customers/new">Add a new customer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salespersons/new">Add a new sales person</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salesrecords/new">Add a new sales record</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salespersons/history">Sales History</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salesrecords">Sales Records</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Service</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/appointments">Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/history">Service History</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/create">Enter a Service Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians/new">Enter a Technician</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Inventory</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/inventory/manufacturers">Manufacturers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/inventory/create-manufacturers">Add a Manufacturers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/inventory/models">Vehicle Models</NavLink></li>
                <li><NavLink className="dropdown-item" to="/inventory/create-model">Add a Vehicle Model</NavLink></li>
                <li><NavLink className="dropdown-item" to="/inventory/automobile">Automobile</NavLink></li>
                <li><NavLink className="dropdown-item" to="/inventory/create-automobile">Add an Automobile Model</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
