import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/URL";
import { matchesSearchText } from "../utils/matchesSearchText";
import { NoUserInterface, ResourceInfo, UserInterface } from "./Interfaces";
import Resources from "./Resources";
import { TagCloud } from "./TagCloud";

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

  return (
    <main>
      <TagCloud
        setFilteredByTag={setFilteredByTag}
        filteredByTag={filteredByTag}
      />
      <Resources
        resources={filteredForSearch}
        resourceSearch={resourceSearch}
        setResourceSearch={setResourceSearch}
        currentUser={props.currentUser}
        studylist={props.studylist}
      />
    </main>
  );
}
