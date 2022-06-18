import { NoUserInterface, ResourceInfo, UserInterface } from "./Interfaces";
import SingleResourceBlock from "./SingleResourceBlock";

interface ResourcesProps {
  resources: ResourceInfo[];
  currentUser: UserInterface | NoUserInterface;
  studylist: ResourceInfo[];
}

export default function Resources(props: ResourcesProps): JSX.Element {
  //filter resources according to study list entries

  const resourcesBlocks: JSX.Element[] = props.resources.map((resource) => (
    <SingleResourceBlock
      key={resource.resource_id}
      data={resource}
      isInStudyList={false}
      currentUser={props.currentUser}
    />
  ));

  return (
    <main>
      <section className="resourcesBlocksContainer">{resourcesBlocks}</section>
    </main>
  );
}
