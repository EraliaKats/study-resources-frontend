interface ControlsProps {
  resourceSearch: string;
  setResourceSearch: (arg0: string) => void;
}

export function Controls(props: ControlsProps): JSX.Element {
  return (
    <div>
      <input
        placeholder="Search Resources..."
        value={props.resourceSearch}
        onChange={(e) => props.setResourceSearch(e.target.value)}
      ></input>
      <button onClick={() => props.setResourceSearch("")}>Clear Search</button>
    </div>
  );
}
