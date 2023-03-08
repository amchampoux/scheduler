import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
  };

  function deleteAppointment() {
    props.cancelInterview(props.id, props.interview)
    .then(() => {
      transition(EMPTY)
    })
  };


// console.log("interview", props.interview);
// console.log(props.interviewer);
  return (
    <Fragment>
      <Header time={props.time} />
        <article className="appointment"> 
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />)}  
        {mode === SAVING && (
          <Status />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(DELETE)}
          />
        )}
        {mode === DELETE && (
          <Confirm 
            message={"Are you sure you want to delete?"}
            onCancel={() => transition(SHOW)}
            onConfirm={deleteAppointment}
          />
        )}
        </article>
    </Fragment>
  );
}


