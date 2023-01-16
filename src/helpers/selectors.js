export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((v) => v.name === day)[0];
  if (!filteredDay) return [];

  const filteredAppointments = filteredDay.appointments.map((appointment) => {
    return state.appointments[appointment];
  });

  return filteredAppointments;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter((v) => v.name === day)[0];
  if (!filteredDay) return [];

  const filteredInterviewers = filteredDay.interviewers.map((interviewer) => {
    return state.interviewers[interviewer];
  });

  return filteredInterviewers;
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

  return result || null;
}
