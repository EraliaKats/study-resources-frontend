import axios from "axios";
import { creationDateFormatter } from "../utils/creationDateFormatter";
import { baseURL } from "../utils/URL";
import { NoUserInterface, ResourceInfo, UserInterface } from "./Interfaces";

interface SingleResourceBlockProps {
  data: ResourceInfo;
  currentUser: UserInterface | NoUserInterface;
}

export default function SingleResourceBlock(
  props: SingleResourceBlockProps
): JSX.Element {
  async function handleVote(is_upvote: boolean) {
    await axios.post(`${baseURL}/resources/${props.data.resource_id}/votes`, {
      user_id: props.currentUser.user_id,
      is_upvote: is_upvote,
    });
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
        <button onClick={() => handleVote(true)}>👍</button>
        <p>({props.data.votesInfo.totalVotes})</p>
        <button onClick={() => handleVote(false)}>👎</button>
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
    </section>
  );
}
