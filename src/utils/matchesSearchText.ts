import { ResourceInfo } from "../components/Interfaces";

export function matchesSearchText(
  resource: ResourceInfo,
  searchTerm: string
): boolean {
  const keysToSearch = ["title", "description", "name", "origin", "tags"];
  for (const key of keysToSearch) {
    const resourceSection = resource[key as keyof ResourceInfo];
    if (key === "tags" && resource["tags" as keyof ResourceInfo] !== null) {
      for (const tag of resource.tags) {
        if (tag.tag_name.toUpperCase().includes(searchTerm.toUpperCase())) {
          return true;
        }
      }
    }
    if (typeof resourceSection === "string") {
      const isMatching = resourceSection
        .toUpperCase()
        .includes(searchTerm.toUpperCase());
      if (isMatching) {
        return true;
      }
    }
  }

  return false;
}

// const isMatchOnTitle = resource.title
//   .toUpperCase()
//   .includes(resourceSearch.toUpperCase());
// const isMatchOnDesc = resource.description
//   .toUpperCase()
//   .includes(resourceSearch.toUpperCase());

/*
    Need to add functionality to search for tags and for author name
    */

// return isMatchOnTitle || isMatchOnDesc;
