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

  const resourcesTags = props.data.tags.map((tagInfo) => (
    <div className="btn btn-warning m-2" key={tagInfo.tag_id}>
      {tagInfo.tag_name}
    </div>
  ));

  return (
    <section className="card border-dark mb-3 resourceBlockWidth">
      <div className="card-header">Created By: {props.data.origin}</div>
      {/* ///////////// */}
      <div className="card-body d-flex flex-row ">
        <div className="d-flex flex-column me-auto flex-grow-1">
          {" "}
          <h2 className="card-title">{props.data.title}</h2>
          {/* TEXT */}
          <h6 className="card-subtitle text-muted">Description:</h6>
          <p className="card-text">{props.data.description}</p>
          <h6 className="card-subtitle text-muted">Recommended For:</h6>
          {props.data.recommended_week && <p>{props.data.recommended_week}</p>}
          <h6 className="card-subtitle text-muted">Usage:</h6>
          {props.data.evaluation && <p>{props.data.evaluation}</p>}
          <h6 className="card-subtitle text-muted">Justification</h6>
          {props.data.justification && <p>{props.data.justification}</p>}{" "}
          <div className="d-flex flex-column mt-auto ">
            {/* TAGS */}
            <section className="d-flex flex-row justify-content-center flex-wrap">
              {resourcesTags}
            </section>
            {/* Buttons */}
            <section className="d-flex flex-column mx-auto mb-0 w-75">
              <button
                className="btn btn-info"
                onClick={() => window.open(props.data.url)}
              >
                Go To {props.data.content_type}
              </button>
              {props.isInStudyList === false &&
                typeof props.currentUser.user_id === "number" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddStudyList(props.data.resource_id)}
                  >
                    Add to Study List
                  </button>
                )}
            </section>
          </div>
        </div>
        {/* Voting */}
        <section className="d-flex flex-column align-items-center justify-content-evenly ms-3">
          <p>({props.data.votesInfo.upVotes})</p>
          <button>👍</button>
          <p>({props.data.votesInfo.totalVotes})</p>
          <button>👎</button>
          <p>({props.data.votesInfo.downVotes})</p>
        </section>
      </div>
      {/* ///////////// */}
      <div className="card-footer">
        {" "}
        Posted on: {creationDateFormatter(props.data.creation_date)} by{" "}
        {props.data.name} {props.data.is_faculty && "⭐"}{" "}
      </div>
    </section>
  );
}
