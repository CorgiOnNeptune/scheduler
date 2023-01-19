/**
 * Get object of appointments filtered by given day
 * @param {object} state current App state
 * @param {string} day   string of day to get appointments from
 * @return {object}      filtered object of appointments
 */
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((v) => v.name === day)[0];
  if (!filteredDay) return [];

  const filteredAppointments = filteredDay.appointments.map((appointment) => {
    return state.appointments[appointment];
  });

  return filteredAppointments;
}

/**
 * Get object of interviewers filtered by given day
 * @param {object} state current App state
 * @param {string} day   string of day to get interviewers from
 * @return {object}      filtered object of interviewers
 */
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter((v) => v.name === day)[0];
  if (!filteredDay) return [];

  const filteredInterviewers = filteredDay.interviewers.map((interviewer) => {
    return state.interviewers[interviewer];
  });

  return filteredInterviewers;
}

/**
 * Select matching interview data through state interviewers
 * @param {object} state      current App state
 * @param {object} interview  interview object to match data from
 * @return {object|null}      Object with interview details
 *                            or null if no interview data found
 */
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let result;

  Object.values(state.interviewers).forEach((interviewer) => {
    if (interviewer.id === interview.interviewer) {
      result = { student: interview.student, interviewer };
    }
  });

  return result;
}
