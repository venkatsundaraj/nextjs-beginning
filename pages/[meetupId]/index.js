import MeetupDetails from "../../components/meetups/MeetupDetails";

import { MongoClient, ObjectId } from "mongodb";

import { Fragment } from "react";

import Head from "next/head";

const MeetupDetailsPage = function (props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetails
        src={props.meetupData.image}
        // alt="First meetups near you"
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://venkatsundaraj:15312621648@meetups.lbvzukd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const result = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();
  // console.log(result);

  return {
    fallback: false,
    // paths: [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
    paths: result.map((item) => ({
      params: {
        meetupId: item._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://venkatsundaraj:15312621648@meetups.lbvzukd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  // console.log(meetupCollection);

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  // console.log(selectedMeetup._id);
  client.close();

  return {
    props: {
      meetupData: {
        image: selectedMeetup.image,
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailsPage;
