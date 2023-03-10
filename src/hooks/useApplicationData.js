import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  // The setDay action can be used to set the current day. 
  const setDay = day => setState({ ...state, day });

  // Getting api content for days, appointments and interviewers
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {      
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  // The getUpdatedDays function is cloning days data and updating the spots available
    function getUpdatedDays(appointment) {
      const newDays = state.days.map(day => {
        if (state.day === day.name) {    
          const newDay = {
            ...day
          }
          if (appointment.interview === null) {  
            newDay.spots += 1
          } else {
            newDay.spots -= 1
          }
          return newDay
        }
        return day        
      });
      return newDays
    }

// The bookInterview action makes an HTTP request and updates the local state.
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
        const days = getUpdatedDays(appointment)
        setState({...state, days, appointments}) 
        
    })
  }

// The cancelInterview action makes an HTTP request and updates the local state.
  function cancelInterview(id, interview) {
    // console.log("delete interview info is ", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, {interview})
      .then((response) => {
          const days = getUpdatedDays(appointment)
          setState({...state, days, appointments}) 
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

};





