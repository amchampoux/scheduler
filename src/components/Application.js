import React from "react";
import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  
  const interviewers = getInterviewersForDay(state, state.day);

  const mappedAppointments = getAppointmentsForDay(state, state.day).map((appointment) => {
      return (
        <Appointment
          key={appointment.id} 
          {...appointment} 
          interviewers={interviewers}
          interview={getInterview(state, appointment.interview)}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
   });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days} 
          value={state.day} 
          onChange={setDay}   
        />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppointments}
        <Appointment 
          key="last" time="5pm" 
        />
      </section>
    </main>
  );
}
