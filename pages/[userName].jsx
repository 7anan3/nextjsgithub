import SectionUserInfo from "@/components/SectionUserInfo";
import { AppContext } from "../components/GithubUsers";
import { useContext } from "react";
import { useState } from "react";

export default function User({ user }) {
  //extract Day,Month, Year from the long form of Date
  const date = user?.created_at;
  const dateObject = new Date(date);
  // Get the year, month, and day
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  return (
    <>
      {user ? (
        <SectionUserInfo
          avatar={user.avatar_url}
          date={`Joined at ${day}-${month}-${year}`}
          bio={user.bio || "This profile has no bio"}
          repos={user.public_repos}
          followers={user.followers}
          following={user.following}
          location={user.location}
          url={user.html_url}
          twitter={user.twitter_username}
          name={user.name}
          login={user.login}
          company={user.company || "Not available"}
        />
      ) : (
        <p className="dark:text-white">User cannot be found</p>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  const { userName } = context.query;

  try {
    const response = await fetch(`https://api.github.com/users/${userName}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    const isUserFound = data?.id ? true : false;

    return {
      props: {
        user: isUserFound ? data : null,
      },
    };
  } catch (error) {
    console.error("An error occurred:", error.message);
    return {
      props: {
        user: null,
      },
    };
  }
}
