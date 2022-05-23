import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/URL";
import { NoUserInterface, ResourceInfo, UserInterface } from "./Interfaces";
import SingleResourceBlock from "./SingleResourceBlock";

interface StudyListProps {
  currentUser: UserInterface | NoUserInterface;
}

export default function StudyList(props: StudyListProps): JSX.Element {
  const [studylist, setStudylist] = useState<ResourceInfo[]>([]);

  useEffect(() => {
    async function fetchStudyList() {
      console.log(props.currentUser);
      const studyListRes = await axios.get(
        `${baseURL}/${props.currentUser.user_id}/studylist`
      );
      setStudylist(studyListRes.data);
    }
    fetchStudyList();
  }, [props.currentUser]);

  const mapOfResourcesInStudyList = studylist.map((item) => (
    <SingleResourceBlock
      key={item.resource_id}
      data={item}
      currentUser={props.currentUser}
    />
  ));

  return (
    <>
      <h1>Your Study List</h1>
      <div>{mapOfResourcesInStudyList}</div>
    </>
  );
}
