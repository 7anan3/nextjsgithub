import { useContext, useState, useEffect } from "react";
import { AppContext } from "./githubUsers";
import NavBar from "./NavBar";
import SectionUserInfo from "./SectionUserInfo";

export default function SearchBar() {
  const { user, setUser } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState("");
  const accessToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

  //extract Day,Month, Year from the long form of Date
  const date = user?.created_at;
  const dateObject = new Date(date);
  // Get the year, month, and day
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  //Handle search and add localstorage
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      return;
    }

    // Fetch user information only when the search button is clicked
    fetch(`https://api.github.com/users/${searchInput}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem("userData", JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, [setUser]);

  return (
    <div className="lg:w-7/12 lg:m-auto">
      <NavBar name={user && user.login} />
      <form className="flex items-center mt-8 mb-5">
        <div className="relative shrink-0 w-full">
          <input
            type="text"
            placeholder="Search Github username"
            value={searchInput}
            onChange={handleSearchInput}
            className="p-4 shadow w-full rounded-lg text-grey2 font-light dark:bg-blue1 dark:text-white"
          />
          <button
            className="bg-blue2 absolute top-1/2 right-[-33px] transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>
      <SectionUserInfo
        avatar={user && user.avatar_url}
        date={`Joined at ${day}-${month}-${year}`}
        bio={(user && user.bio) || "This profile has no bio"}
        repos={user && user.public_repos}
        followers={user && user.followers}
        following={user && user.following}
        location={user && user.location}
        url={user && user.html_url}
        twitter={user && user.twitter_username}
        name1={user && user.name}
        login={user && user.login}
        company={(user && user.company) || "Not available"}
      />
    </div>
  );
}
