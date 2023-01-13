export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  const filteredDay = state.days.filter((v) => v.name === day)[0];
  if (!filteredDay) return [];

  filteredDay.appointments.forEach((app) => {
    filteredAppointments.push(state.appointments[app]);
  });

  return filteredAppointments ?? [];
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let result = {};

  Object.values(state.interviewers).forEach((int) => {
    if (int.id === interview.interviewer) {
      result = { student: interview.student, interviewer: int };
    }
  });

  return result ?? null;
}
