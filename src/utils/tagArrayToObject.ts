interface tagObject {
  id: number;
  tagName: string;
}

export function tagArrayToObject(tagNames: string[]): tagObject[] {
  const tagObject = tagNames.map((tagName, index) => {
    const obj = { id: index, tagName: tagName };
    return obj;
  });

  return tagObject;
}
