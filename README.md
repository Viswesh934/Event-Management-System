# Event Management System

## Overview

The Event Management System is a web application built with Node.js, Express, and EJS that provides a comprehensive solution for managing events. It includes features such as authentication using Passport.js, separate logins for admins and users, an analytics dashboard using Chart.js, and an event dashboard that allows users to register and add events to their Google Calendar.

![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/2be81b85-c462-4b61-9105-dca5b900eadb)


## Features

- **Authentication:**
  - Passport.js is used for user authentication.
  - Documentation: https://www.passportjs.org/
  - Two different login options: admin and user.

- **Analytics Dashboard:**
  - Utilizes Chart.js to provide visual analytics for event data.
  - Documentation: https://www.chartjs.org/

- **Event Dashboard:**
  - Allows users to register for events.
  - Integration with Google Calendar for event management.
  - API: https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails)}
  - Admin-specific features:
    - Create new events.
    - Delete existing events.

- **MVC Architecture:**
  - The application follows the Model-View-Controller (MVC) architecture for organized and modular code.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Viswesh934/Event-Management-System.git
   cd event-management-system
2. **Install dependencies
   ```bash
   npm install
3. **Run the application**
   ```bash
   npm start


## Technology Stack

### 1. EJS (Embedded JavaScript)
   - **Description:** EJS is a templating engine for JavaScript that allows you to embed dynamic content within HTML pages.
   - **Usage:** In our event management system, EJS is used for server-side rendering to dynamically generate HTML pages and display data fetched from the server.

### 2. Node.js
   - **Description:** Node.js is a JavaScript runtime that allows you to execute server-side JavaScript. It's known for its fast performance and scalability.
   - **Usage:** Our event management system is built on Node.js, enabling us to create a server-side application that handles various operations, such as routing, handling HTTP requests, and managing the application's logic.

### 3. Express
   - **Description:** Express is a web application framework for Node.js that simplifies the process of building robust and scalable web applications.
   - **Usage:** We utilize Express to define routes, handle middleware, and manage the overall structure of our event management system. It streamlines the development process and ensures a well-organized codebase.

### 4. MongoDB
   - **Description:** MongoDB is a NoSQL database that stores data in a flexible, JSON-like format. It's designed to handle large amounts of data and is well-suited for scalable applications.
   - **Usage:** MongoDB serves as the backend database for our event management system. It stores event details, user information, and other relevant data, providing a reliable and scalable data storage solution.

   ![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/58f94b94-28a6-41cc-a747-98f487d9cfd2)


### 5. Tailwind CSS
   - **Description:** Tailwind CSS is a utility-first CSS framework that provides a set of low-level utility classes to build designs directly in your markup.
   - **Usage:** Tailwind CSS is employed to style and design the user interface of our event management system. Its utility-first approach allows for rapid development and easy customization, ensuring a responsive and visually appealing user experience.


## Usage

### Authentication:

1. Visit the login page.

 ![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/e0cc1c29-6bb5-4fb2-b220-dc4c3b70e68b)


2. Admin and user have different credentials based on roles

![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/1e83a73c-628d-4752-aaee-0ed3e139af12)



### Analytics Dashboard:

Explore the analytics dashboard for insights into event data.

![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/1aa8f5e7-b76f-46e8-b007-c2c73686451c)


### Event Dashboard:
![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/7befbb46-cb86-4892-9157-5b0a22de2827)

![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/b855a8da-68a1-4763-bf4e-2923b3727019)



- **Users:**
  1. Register for events.
     
     ![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/06e1b0c6-f97b-47d9-ade0-2f7d0dda078f)

  2. Manage registered events in your Google Calendar.
 
     ![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/6b59e299-05aa-4b5b-9d0a-e875ef976809)


- **Admins:**
  1. Create new events.
     ![image](https://github.com/Viswesh934/Event-Management-System/assets/98519767/48901178-60eb-4280-9cb6-086b80ff174a)
  2. Delete existing events.
  3. Only admins have permission to view analytics
 
## Contributing

We welcome contributions to improve the system. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and submit a pull request.

## Credits

- **Developed by:** Sigireddy Viswesh
- **Based on:** Node.js, Express, and EJS.

## License

This project is not licensed and free to use

## Acknowledgments

- Thanks to the open-source community for their valuable contributions.
- Special thanks to noobg1 for code reviews and feedback.

     
     
   




