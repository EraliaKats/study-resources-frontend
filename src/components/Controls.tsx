interface ControlsProps {
  resourceSearch: string;
  setResourceSearch: (arg0: string) => void;
}

export function Controls(props: ControlsProps): JSX.Element {
  return (
    <div className="d-flex justify-content-center mb-4">
      <input
        placeholder="Search Resources..."
        value={props.resourceSearch}
        onChange={(e) => props.setResourceSearch(e.target.value)}
      ></input>
      <button
        className="btn btn-danger"
        onClick={() => props.setResourceSearch("")}
      >
        Clear Search
      </button>
    </div>
  );
}
