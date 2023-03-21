export function getAppointmentsForDay(state, day) {

  let output = []

  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      for (let appointment of state.days[i].appointments) {
        output.push(state.appointments[appointment]);
      }
    }
  }
  return output;
};

export function getInterviewersForDay(state, day) {

  let output = []

  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      for (let interviewer of state.days[i].interviewers) {
        output.push(state.interviewers[interviewer]);
      }
    }
  }
  return output;
};

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const newInterviewObj = { ...interview }
  const interviewerID = interview.interviewer;
  newInterviewObj.interviewer = state.interviewers[`${interviewerID}`];

  return newInterviewObj; 
};

export function calculateSpotsForDay(state, day, appointments) {
  const dayObj = state.days.find((dayObj) => {
    return dayObj.name === day
  });

  if (!dayObj) {
    return null;
  }
  const appointmentsForDay = dayObj.appointments.map(id => appointments[id]);

  const nullInterviews = appointmentsForDay.filter(appt => appt.interview === null);

  const spots = nullInterviews.length;

  return spots;
}


  

