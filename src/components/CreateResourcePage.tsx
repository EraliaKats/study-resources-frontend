import { useState } from "react"
import { resourceForm } from "./Interfaces";

export default function CreateResourcePage(): JSX.Element {
  const [formData, setFormData] = useState<resourceForm>({
  title: "",
  description: "",
  url: "",
  origin: "",
  //is_faculty: "";
  content_type: "",
  recommended_week: "",
  evaluation: "",
  justification: "",
  tags:""
  })


  function handleFormChange(
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;
    console.log("This is name,value:",name,value)
    setFormData((previous) => {
      return { ...previous, [name]: value };
    });
  }
  const handleSubmit = () => {console.log(formData)}
  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   await axios.post(baseUrl + "/pastes", formData);
  //   setFormData({ title: "", text: "" });
  //   props.changeToggle(!props.toggle);
  // }

  return (
  <>
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
          {/* <label htmlFor="Resource-form-tag">Tag</label>
          <textarea
            className="form--tagarea"
            name="tag"
            value={formData.tag}
            id="Resource-form-tags"
            placeholder="Input Tags"
            onChange={(e) => handleFormChange(e)}
          /> */}
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
          <label htmlFor="Resource-form-content-type">content-type</label>
          <textarea
            className="form--content-type"
            name="content-type"
            value={formData.content_type}
            id="Resource-form-content-type"
            placeholder="Input content-type Here"
            onChange={(e) => handleFormChange(e)}
          />
          <br />
          <label htmlFor="Resource-form-recommended-week">recommended-week</label>
          <textarea
            className="form--recommended-week"
            name="recommended-week"
            value={formData.recommended_week}
            id="Resource-form-recommended-week"
            placeholder="Input recommended-week Here"
            onChange={(e) => handleFormChange(e)}
          />
          <br />
          <label htmlFor="Resource-form-evaluation">Evaluation</label>
          <textarea
            className="form--evaluation"
            name="evaluation"
            value={formData.evaluation}
            id="Resource-form-evaluation"
            placeholder="Input evaluation Here"
            onChange={(e) => handleFormChange(e)}
          />
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

  </>)
}
