import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/URL";
import { ResourceInfo, tagInterface } from "./Interfaces";

interface TagCloudInt {
  setFilteredByTag: (arg0: ResourceInfo[]) => void;
  filteredByTag: ResourceInfo[];
}

export function TagCloud(props: TagCloudInt): JSX.Element {
  const [tags, setTags] = useState<tagInterface[]>([]);
  const [classid, setclass] = useState<number[]>();
  useEffect(() => {
    async function fetchTags() {
      const tagRes = await axios.get(baseURL + "/tags");
      setTags(tagRes.data);
    }
    fetchTags();
  }, []);

  async function handleClick(id: number) {
    const resourcesForTag = await axios.get(`${baseURL}/tags/${id}`);
    if (props.filteredByTag.length > 0) {
      if (props.filteredByTag[0].tag_id === id) {
        props.setFilteredByTag([]);
        setclass([0]);
      } else {
        props.setFilteredByTag(resourcesForTag.data);
      }
    } else {
      props.setFilteredByTag(resourcesForTag.data);
    }
  }

  const tagCloud: JSX.Element[] = tags.map((tag) => {
    return (
      <div
        onClick={() => {
          handleClick(tag.tag_id);
          setclass([tag.tag_id]);
        }}
        className={
          classid
            ? classid[0] === tag.tag_id
              ? "tagElement" + 1
              : "tagElement0"
            : "tagElement0"
        }
        key={tag.tag_id}
      >
        {tag.name}
      </div>
    );
  });

  return (
    <>
      <h1>Tag Cloud</h1>
      <section className="tagCloudContainer">{tagCloud}</section>
    </>
  );
}
