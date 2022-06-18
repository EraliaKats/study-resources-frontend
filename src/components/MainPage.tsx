import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/URL";
import { matchesSearchText } from "../utils/matchesSearchText";
import { NoUserInterface, ResourceInfo, UserInterface } from "./Interfaces";
import Resources from "./Resources";
import { TagCloud } from "./TagCloud";
import { Controls } from "./Controls";

interface MainPageProps {
  setCurrentUser: (arg0: UserInterface) => void;
  currentUser: UserInterface | NoUserInterface;
  studylist: ResourceInfo[];
}

export default function MainPage(props: MainPageProps): JSX.Element {
  const [resourceSearch, setResourceSearch] = useState<string>("");
  const [resources, setResources] = useState<ResourceInfo[]>([]);
  // eslint-disable-next-line
  const [triggerRerender, setTriggerRerender] = useState<boolean>(true);
  const [filteredByTag, setFilteredByTag] = useState<ResourceInfo[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get(`${baseURL}/resources`);
      setResources(response.data);
    };
    fetchResources();
  }, [triggerRerender]);

  let filteredForSearch;

  if (filteredByTag.length > 0) {
    filteredForSearch = filteredByTag.filter((resource) =>
      matchesSearchText(resource, resourceSearch)
    );
  } else {
    filteredForSearch = resources.filter((resource) =>
      matchesSearchText(resource, resourceSearch)
    );
  }

  let isUserSearching = false;

  if (filteredByTag.length > 0 || resourceSearch !== "") {
    isUserSearching = true;
  }

  return (
    <main>
      <h1 className="text-center my-4">Resources for you:</h1>
      <Controls
        resourceSearch={resourceSearch}
        setResourceSearch={setResourceSearch}
      />
      <TagCloud
        setFilteredByTag={setFilteredByTag}
        filteredByTag={filteredByTag}
      />
      <p className="text-center mt-3">
        Number Of Resources Found: {filteredForSearch.length}
      </p>

      {isUserSearching && <h5 className="text-center">Search Results:</h5>}
      <Resources
        resources={filteredForSearch}
        currentUser={props.currentUser}
        studylist={props.studylist}
      />
    </main>
  );
}
