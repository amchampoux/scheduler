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