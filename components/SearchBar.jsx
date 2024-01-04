import { useContext, useState, useEffect } from "react";
import { AppContext } from "./GithubUsers";
import NavBar from "./NavBar";
import SectionUserInfo from "./SectionUserInfo";
import { useRouter } from "next/router";

export default function SearchBar() {
  const { user, setUser } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  //Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/${searchInput.trim()}`);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

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
    </div>
  );
}
