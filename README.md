# CarCar

Team:

* Person 1 - Which microservice? Alper Ademoglu - Service
* Person 2 - Which microservice?

## Design

CarCar is a web application for automobile dealership management that keeps track of automobile inventory, sales and service appointments. The application consists of three microservices; inventory, service and sales. The service and sales microservices poll API data from the inventory microservice.

The three bounded contexts are inventory, service and sales. Both service and sales bounded contexts have an Automobile value object that consists of the VIN of an automobile.

The data is stored in a PostgreSQL relational database. CarCar utilizes React for front end development. Individual React components make API calls to back end microservices to get data. Boootstrap framework is used for CSS formatting.

## Service microservice

The Service microservice includes three models; Technician, Appointment and AutomobileVO. The Technician model includes the name and employee number of a technician that services cars. The Appointment model includes the VIN, customer name, date, time, assigned technician, the reason for service and two boolean fields that checks if a car service is complete and if a customer is a VIP customer. The technician information for the Appointment model is a foreign key that does not get deleted if a technician object gets deleted. The boolean field for VIP customer is 'False' by default. If the VIN for an automobile matches any of the VIN records in the inventory, then the customer becomes a VIP, thus the VIP field gets changed to 'True'.

The AutomobileVO is used as a value object to store the VINs from the Automobile model in the Inventory microservice. The Service microservice uses polling every 60 seconds to request data from the Inventory microservice.

React frontend for the Service microservice shows a list of service appointments, and allows the user to create a technician and enter a new service appointment. There is also a page that allows users to search for VINs. If the searched VIN matches records in the database, the page lists any details for matching service appointments. In case of an invalid entry, the page does not show the service appointments and instead tells the user that the VIN is invalid. The list of service appointments has a "(VIP)" label added to VIP customers.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
