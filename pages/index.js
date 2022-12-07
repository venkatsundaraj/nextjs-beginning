import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import styles from "../styles/Home.module.css";

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    key: "m1",
    title: "First meetups near you",
    image:
      "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    address: "21, Amman Street, Madurai-393939",
  },
  {
    id: "m2",
    key: "m2",
    title: "Second meetups near you",
    image:
      "https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=832&q=80",
    address: "51, Nehru Street, Chennai-393939",
  },
];

const HomePage = function (props) {
  return (
    <Fragment>
      <Head>
        <title>Get a Place for you</title>
        <meta
          name="description"
          content="You can make the life with originals"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export const getServerSideProps = async function (context) {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async function () {
  const client = await MongoClient.connect(
    "mongodb+srv://venkatsundaraj:15312621648@meetups.lbvzukd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const results = await meetupCollections.find().toArray();

  const data = results.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      address: meetup.address,
      description: meetup.description,
      image: meetup.image,
    };
  });
  return {
    props: {
      meetups: data,
    },
    revalidate: 1,
  };
};

export default HomePage;
