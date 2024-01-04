import { createContext, useState } from "react";
import SearchBar from "./SearchBar";

export const AppContext = createContext({});

export default function GithubUsers() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <AppContext.Provider value={{ user, setUser, isDarkMode, setIsDarkMode }}>
      <main
        className={`${
          isDarkMode ? "dark bg-navy" : ""
        } py-12 px-6 bg-greylight`}
      >
        <SearchBar />
      </main>
    </AppContext.Provider>
  );
}
