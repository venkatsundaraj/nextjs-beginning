import { Fragment } from "react";

import classes from "./MeetupDetails.module.css";

const MeetupDetails = function (props) {
  return (
    <section className={classes.section}>
      <img src={props.src} alt={props.alt} />
      <h1>{props.title}</h1>
      <address className={classes.address}>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetails;
