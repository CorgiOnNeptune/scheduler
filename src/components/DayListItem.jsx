import React from 'react';
import classNames from 'classnames';

import 'styles/DayListItem.scss';

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    return `${spots === 0 ? 'no' : spots} ${
      spots === 1 ? 'spot' : 'spots'
    } remaining`;
  };

  const dayListItemClass = classNames({
    '--selected': props.selected,
    '--full': !props.spots,
  });

  return (
    <li
      className={`day-list__item${dayListItemClass}`}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
