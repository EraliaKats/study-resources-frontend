import { Controls } from "./Controls";
import { NoUserInterface, ResourceInfo, UserInterface } from "./Interfaces";
import SingleResourceBlock from "./SingleResourceBlock";

interface ResourcesProps {
  resources: ResourceInfo[];
  resourceSearch: string;
  setResourceSearch: (arg0: string) => void;
  currentUser: UserInterface | NoUserInterface;
  studylist: ResourceInfo[];
}

export default function Resources(props: ResourcesProps): JSX.Element {
  //filter resources according to study list entries
  const filteredResourcesSL = props.resources.filter(
    (resource) => !props.studylist.includes(resource)
  );

  const resourcesBlocks: JSX.Element[] = filteredResourcesSL
    .slice(0, 5)
    .map((resource) => (
      <SingleResourceBlock
        key={resource.resource_id}
        data={resource}
        isInStudyList={false}
        currentUser={props.currentUser}
      />
    ));

  return (
    <main>
      <h1>Resources for you</h1>
      <p>Number Of Resources: {props.resources.length}</p>
      <Controls
        resourceSearch={props.resourceSearch}
        setResourceSearch={props.setResourceSearch}
      />
      <section className="resourceListContainer">{resourcesBlocks}</section>
    </main>
  );
}
