export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  const filteredDay = state.days.filter((v) => v.name === day)[0];

  filteredDay?.appointments.forEach((app) => {
    filteredAppointments.push(state.appointments[app]);
  });

  return filteredAppointments ?? [];
}
