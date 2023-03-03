import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";



export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <Fragment>
      <Header time={props.time} />
        <article className="appointment"> 
        {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {/* {props.interview ? (
          useVisualMode(SHOW) 
          <Show 
            student={props.interview.student}
            interviewer={props.interview.interviewer.name} 
            /> 
        ) : (
          <Empty />
        )}  */}
        </article>
    </Fragment>
  );
}


