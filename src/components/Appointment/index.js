import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const DELETING = "DELETING";
const ERROR_DELETE = "ERROR_DELETE";

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
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  };

  function deleteAppointment() {
    transition(DELETING, true)
    props
      .cancelInterview(props.id, props.interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  };

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
          <Status 
            message={"Saving"}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error 
            onClose={back}
          />
        )}
        {mode === DELETING && (
          <Status 
            message={"Deleting"}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error 
            onClose={back}
          />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(DELETE)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === DELETE && (
          <Confirm 
            message={"Are you sure you want to delete?"}
            onCancel={() => transition(SHOW)}
            onConfirm={deleteAppointment}
          />
        )}
        {mode === EDIT && (
          <Form 
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        </article>
    </Fragment>
  );
}


