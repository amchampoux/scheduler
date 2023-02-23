import classNames from "classnames";
import React from "react";
import "components/DayListItem.scss";


export default function DayListItem(props) {

  let listClass = classNames('dayClass', {
    'day-list__item': props,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots = (spots) => {

    let spotRemaining = '';

    if (props.spots === 0) {
      spotRemaining += 'no spots remaining';
    } else if (props.spots === 1) {
      spotRemaining += '1 spot remaining'
    } else {
      spotRemaining += (spots + " spots remaining");
    }
    return spotRemaining
  };

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}