import axios from "axios";
import { creationDateFormatter } from "../utils/creationDateFormatter";
import { baseURL } from "../utils/URL";
import { NoUserInterface, ResourceInfo, UserInterface } from "./Interfaces";

interface SingleResourceBlockProps {
  data: ResourceInfo;
  isInStudyList: boolean;
  currentUser: UserInterface | NoUserInterface;
}

export default function SingleResourceBlock(
  props: SingleResourceBlockProps
): JSX.Element {
  async function handleAddStudyList(resource_id: number) {
    try {
      await axios.post(
        `${baseURL}/users/${props.currentUser.user_id}/studylist`,
        {
          resource_id: resource_id,
        }
      );
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <section className="singleResourceContainer">
      <h2 className="resourceTitle">{props.data.title}</h2>
      <h4 className="topDataBox">
        <em className="uploadInfo">
          Uploaded By: {props.data.name} {props.data.is_faculty && "⭐"}{" "}
          <small>({creationDateFormatter(props.data.creation_date)})</small>
        </em>
        <p></p>
        <em className="uploadInfo">Created By: {props.data.origin}</em>
      </h4>
      <p>{props.data.description}</p>
      {props.data.recommended_week && (
        <p>Recommended For: {props.data.recommended_week}</p>
      )}
      {props.data.evaluation && <p>{props.data.evaluation}</p>}
      {props.data.justification && <p>{props.data.justification}</p>}
      <div className="votesContainer">
        <p>({props.data.votesInfo.upVotes})</p>
        <button>👍</button>
        <p>({props.data.votesInfo.totalVotes})</p>
        <button>👎</button>
        <p>({props.data.votesInfo.downVotes})</p>
      </div>
      {/* display each tag in its own button */}
      <section className="tagCloudContainer">
        {props.data.tags.map((tagInfo) => (
          <div className="tagElement0" key={tagInfo.tag_id}>
            {tagInfo.tag_name}
          </div>
        ))}
      </section>
      <button onClick={() => window.open(props.data.url)}>
        Go To {props.data.content_type}
      </button>
      {props.isInStudyList === false &&
        typeof props.currentUser.user_id === "number" && (
          <button onClick={() => handleAddStudyList(props.data.resource_id)}>
            Add to Study List
          </button>
        )}
    </section>
  );
}
