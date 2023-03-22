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

**Main page form**

<!-- !["Screenshot of main page form"](https://github.com/amchampoux/tweeter/blob/master/docs/desktop_tweet_form.gif) -->


## Setup

Install dependencies with `npm install`.

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


