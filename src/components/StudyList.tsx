import axios from "axios";
import { useEffect } from "react";
import { baseURL } from "../utils/URL";
import { NoUserInterface, ResourceInfo, UserInterface } from "./Interfaces";
import SingleResourceBlock from "./SingleResourceBlock";

interface StudyListProps {
  currentUser: UserInterface | NoUserInterface;
  studylist: ResourceInfo[];
  setStudylist: (arg0: ResourceInfo[]) => void;
}

export default function StudyList({
  currentUser,
  studylist,
  setStudylist,
}: StudyListProps): JSX.Element {
  useEffect(() => {
    async function fetchStudyList() {
      console.log(currentUser);
      const studyListRes = await axios.get(
        `${baseURL}/${currentUser.user_id}/studylist`
      );

      setStudylist(studyListRes.data);
    }
    fetchStudyList();
    // eslint-disable-next-line
  }, [currentUser]);

  const mapOfResourcesInStudyList = studylist.map((item) => (
    <SingleResourceBlock
      key={item.resource_id}
      data={item}
      isInStudyList={true}
      currentUser={currentUser}
    />
  ));

  return (
    <>
      <h1 className="m-3 text-center">Your Study List</h1>
      <div className="resourcesBlocksContainer">
        {mapOfResourcesInStudyList}
      </div>
    </>
  );
}
