import React from 'react';
import classNames from 'classnames';

import 'styles/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const interviewerItemClass = classNames({
    '--selected': props.selected,
  });

  return (
    <li
      className={`interviewers__item${interviewerItemClass}`}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
