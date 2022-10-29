# CarCar

Team:

* Person 1 - Which microservice? Alper Ademoglu - Service
* Person 2 - Which microservice? David Leung - Sales

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

The AutomobileVO model is a value object from the Automobile model from Inventory. This allows access to the vin property and attaching a sold property without affect the Automobile model in the Inventory API and allows us to monitor whether a vehicle is sold or not. The sold property defaults to false and turns to true if it is sold. Vin gets set to unique = True to make sure there aren't any duplicate vehicles.
Salesperson model has the properties name and employee id and customer model has the properties name, address and phone number. The phone number and the employee id has unique = true to prevent duplicates.
In the model sales record, those three models are foreign keys connect to each of the previous models. When deleting the sales record, the automobile, salesperson and customer are protected from deletion. There is also a price property on the model sales record.

In the inventory api, Automobile is a foreign key to vehicle model which is another foreign key to manufacturer. This can be seen on the Carcar diagram.png. In order generate a sales form, a manufacturer has to be generated first. The name of the manufacturer is used in the vehicle model form. In turn, the name of the vehicle model is used in the automobile form. Creating automobile value object, the model automobile in the inventory isn't directly affect by changes within the sales bound context. The sales record form obtains information from all three models that are foreign keys with it to generate a sales record. Once the sales record is created, a put request in generated to change the sold property in Automobile VO to change it from false to true. This prevents the same automobile from being sold again.
