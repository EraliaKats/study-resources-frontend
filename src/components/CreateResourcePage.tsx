import { useState, useEffect } from "react";
import { ResourceForm } from "./Interfaces";
import { useLocation } from "react-router-dom";
import { UserInterface, NoUserInterface } from "./Interfaces";
import { TagCloudCreateResource } from "./TagCloudCreateResource";
import { tagArrayToObject } from "../utils/tagArrayToObject";
import axios from "axios";
import { baseURL } from "../utils/URL";

interface CreateResourcePageProps {
  currentUser: UserInterface | NoUserInterface;
  setCurrentUser: (arg0: UserInterface | NoUserInterface) => void;
}

export default function CreateResourcePage(
  props: CreateResourcePageProps
): JSX.Element {
  type StateType = { userData: UserInterface };
  const { userData } = useLocation().state as StateType;

  useEffect(() => props.setCurrentUser(userData));

  const [formData, setFormData] = useState<ResourceForm>({
    title: "",
    description: "",
    url: "",
    origin: "",
    content_type: "",
    recommended_week: "",
    evaluation: "",
    justification: "",
    tags: [""],
    author_id: userData.user_id,
  });

  const [assignedTags, setAssignedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");

  function handleFormChange(
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((previous) => {
      return { ...previous, [name]: value }; //Updates key value pair of object if they already exist which they should
    });
  }

  function handleCreateNewTag(newTag: string): void {
    setAssignedTags([...assignedTags, newTag]);
    setNewTag("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    formData["tags"] = assignedTags;
    console.log("This is form data:", formData);
    await axios.post(baseURL + "/resources", formData);
  }

  const allAssignedTagObjects = tagArrayToObject(assignedTags);
  const allAssignedTagButtons = allAssignedTagObjects.map((tagObj) => (
    <button
      key={tagObj.id}
      className="tagElement1"
      onClick={() => {
        const assignedTagsCopy = [...assignedTags];
        assignedTagsCopy.splice(tagObj.id, 1);
        setAssignedTags(assignedTagsCopy);
      }}
    >
      {tagObj.tagName}
    </button>
  ));

  return (
    <>
      <p>Hello {userData.name}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Resource-form-title">Title</label>
        <input
          className="form--input"
          name="title"
          value={formData.title}
          id="Resource-form-title"
          placeholder="Title"
          type="text"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <label htmlFor="Resource-form-Description">Description</label>
        <textarea
          className="form--descriptionArea"
          name="description"
          value={formData.description}
          id="Resource-form-description"
          placeholder="Input Description"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <br />
        <label htmlFor="Resource-form-url">URL</label>
        <textarea
          className="form--urlarea"
          name="url"
          value={formData.url}
          id="Resource-form-url"
          placeholder="Paste URL Here"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <label htmlFor="Resource-form-origin">Origin</label>
        <textarea
          className="form--originarea"
          name="origin"
          value={formData.origin}
          id="Resource-form-origin"
          placeholder="Input Origin Here"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <label htmlFor="Resource-form-content-type">content Type</label>
        <textarea
          className="form--content-type"
          name="content_type"
          value={formData.content_type}
          id="Resource-form-content-type"
          placeholder="Input content-type Here"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <label htmlFor="Resource-form-recommended-week">Recommended Week</label>
        <textarea
          className="form--recommended-week"
          name="recommended_week"
          value={formData.recommended_week}
          id="Resource-form-recommended-week"
          placeholder="Input recommended-week Here"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <label htmlFor="Resource-form-evaluation">Evaluation</label>
        <select
          className="form--evaluation"
          name="evaluation"
          defaultValue={"No evaluation selected"}
          id="Resource-form-evaluation"
          placeholder="Input evaluation Here"
          onChange={(e) => handleFormChange(e)}
        >
          <option>Select from dropdown</option>{" "}
          <option>I recommend this resource after having used it</option>
          <option>I do not recommend this resource after having used it</option>
          <option>I haven't used this resource but it looks promising</option>
        </select>
        <br />
        <label htmlFor="Resource-form-justification">Justification</label>
        <textarea
          className="form--justification"
          name="justification"
          value={formData.justification}
          id="Resource-form-justification"
          placeholder="Input justification Here"
          onChange={(e) => handleFormChange(e)}
        />
        <br />
        <button className="button">Submit</button>
      </form>
      <input
        placeholder="Please type in a single tag only"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value.trim())}
      ></input>
      <button onClick={() => handleCreateNewTag(newTag)}>Submit new Tag</button>
      <TagCloudCreateResource
        setAssignedTags={setAssignedTags}
        assignedTags={assignedTags}
      />
      <h3>Assigned Tags</h3>
      <section>{allAssignedTagButtons}</section>
    </>
  );
}

/*
Create a cloud of tags that a user can click
onClick of a tag add that to an array of tags
this also adds the tag button to a tag assignment area

Create separate input for create a tag
On submit add to the array of tags and th tags assigment area
Need to specify specific input for user when creating the tag.
Can't accept weird inputs




*/
