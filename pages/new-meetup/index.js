import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import Head from "next/head";
import { Fragment } from "react";

const NewMeetup = function () {
  const newMeetupHandler = async function (enteredData) {
    console.log(enteredData);
    const response = await fetch("../api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <Fragment>
      <Head>
        <title>New MeetupForm</title>
        <meta
          name="description"
          content="New Meetup form waits for you to fill"
        />
      </Head>
      <NewMeetupForm onAddMeetup={newMeetupHandler} />;
    </Fragment>
  );
};

export default NewMeetup;
