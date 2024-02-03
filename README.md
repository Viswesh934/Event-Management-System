# Event Management System

## Overview

The Event Management System is a web application built with Node.js, Express, and EJS that provides a comprehensive solution for managing events. It includes features such as authentication using Passport.js, separate logins for admins and users, an analytics dashboard using Chart.js, and an event dashboard that allows users to register and add events to their Google Calendar.

## Features

- **Authentication:**
  - Passport.js is used for user authentication.
  - Two different login options: admin and user.

- **Analytics Dashboard:**
  - Utilizes Chart.js to provide visual analytics for event data.

- **Event Dashboard:**
  - Allows users to register for events.
  - Integration with Google Calendar for event management.
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

## Usage

### Authentication:

1. Visit the login page.
2. Admin and user have different credentials based on roles

### Analytics Dashboard:

Explore the analytics dashboard for insights into event data.

### Event Dashboard:

- **Users:**
  1. Register for events.
  2. Manage registered events in your Google Calendar.

- **Admins:**
  1. Create new events.
  2. Delete existing events.
  3. Only admins have permission to view analytics
     
   




