import React from 'react';
import classNames from 'classnames';

import 'styles/DayListItem.scss';

export default function DayListItem(props) {
  const dayListItemClass = classNames({
    '--selected': props.selected,
    '--full': !props.spots,
  });

  return (
    <li
      className={`day-list__item${dayListItemClass}`}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
