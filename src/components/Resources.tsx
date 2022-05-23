import { Controls } from "./Controls";
import { NoUserInterface, ResourceInfo, UserInterface } from "./Interfaces";
import SingleResourceBlock from "./SingleResourceBlock";

interface ResourcesProps {
  resources: ResourceInfo[];
  resourceSearch: string;
  setResourceSearch: (arg0: string) => void;
  currentUser: UserInterface | NoUserInterface;
}

export default function Resources(props: ResourcesProps): JSX.Element {
  /*
    Fetch data resources data and put it into array
    Define interface
    Map array into SingleRsrouce component
    */

  const resourcesBlocks: JSX.Element[] = props.resources
    .slice(0, 5)
    .map((resource) => (
      <SingleResourceBlock
        key={resource.resource_id}
        data={resource}
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
