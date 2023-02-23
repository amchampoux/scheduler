import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {

  const mappedInterviewers = props.interviewers.map((interviewer) => {
    return <InterviewerListItem 
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}  
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mappedInterviewers}
      </ul>
    </section>
  );
}


// const mappedDays = props.days.map((day) => {
//   return <DayListItem 
//     key={day.id} 
//     name={day.name} 
//     spots={day.spots} 
//     selected={day.name === props.day}
//     setDay={props.setDay}  
//   /> 
// });

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];