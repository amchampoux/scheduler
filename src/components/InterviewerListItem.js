import classNames from "classnames";
import React from "react";
import "components/InterviewerListItem.scss";


export default function InterviewListItem(props) {

  let listClass = classNames('interviewersList', {
    'interviewers__item': props,
    'interviewers__item--selected': props.selected
  });

  const displayName = (name) => {

    let interviewerName = '';

    if (props.selected) {
      interviewerName += name
    }
    return interviewerName;
  };

  return (
    <li className={listClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {displayName(props.name)}
    </li>
  );
}