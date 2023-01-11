import React from 'react';

import 'styles/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  const interviewerItem = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
        {...interviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--semi-bold">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItem}</ul>
    </section>
  );
}
