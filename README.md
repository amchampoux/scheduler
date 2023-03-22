# Interview Scheduler

Single-page application (SPA) that allows users to book technical interviews between students and mentors. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a Postgres database.

## User Requirements

* Interviews can be booked between Monday and Friday.
* A user can navigate the weekdays schedule.
* A user can book an interview in an empty appointment slot and edit or cancel an existing interview.
* Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
* The list of days informs the user how many slots are available for each day.
* The expected day updates the number of spots available when an interview is booked or canceled.
* A user is presented with a confirmation when they attempt to cancel an interview.
* A user is shown an error if an interview cannot be saved or deleted.
* A user is shown a status indicator while asynchronous operations are in progress.
* The application makes API requests to load and persist data. 

## Project Stack

**Front-End**: React, Axios, JSX, HTML, SASS, JavaScript

**Back-End**: Express, Node.js, PostgreSQL

**Testing**: Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Screenshots

**Main page**

!["Screenshot of the main page"](https://github.com/amchampoux/scheduler/blob/master/docs/home.png)

**Booking an inteview**

!["Screenshot of booking state"](https://github.com/amchampoux/scheduler/blob/master/docs/book_interview.png)

**Deleting an inteview**

!["Screenshot of booking state"](https://github.com/amchampoux/scheduler/blob/master/docs/delete_interview.gif)

## Setup

For full functionality, the client and the API server applications must run concurrently: 

* Start by forking and cloning the scheduler-api server [here](https://github.com/lighthouse-labs/scheduler-api).
* Follow the steps outlined in README to install and setup the database.
* Fork and clone this repo.
* Navigate to the root directory and install dependencies with `npm install`.
* Run the following command from the root directory of the project `npm start`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress test suite

```sh
npm run cypress
```

## Dependencies

* Axios
* Classnames
* Normalize.css
* React
* React-dom
* React-scripts
* Babel/core
* Storybook/addon-actions
* Storybook/addon-backgrounds
* Storybook/addon-links
* Storybook/addons
* Storybook/react
* Testing-library/jest-dom
* Testing-library/react
* Testing-library/react-hooks
* Babel-loader
* Node-sass
* Prop-types
* React-test-renderer


