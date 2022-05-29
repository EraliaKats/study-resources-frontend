export interface ResourceInfo {
  resource_id: number;
  tag_id?: number;
  title: string;
  description: string;
  url: string;
  origin: string;
  author_id: number;
  name: string;
  is_faculty: boolean;
  creation_date: string;
  votes: number;
  content_type: string;
  recommended_week?: string | null;
  evaluation?: string | null;
  justification?: string | null;
  votesInfo: { upVotes: number; downVotes: number; totalVotes: number };
  tags: { tag_id: number; tag_name: string }[];
}

export interface ResourceForm {
  title: string;
  description: string;
  url: string;
  origin: string;
  content_type: string;
  recommended_week?: string;
  evaluation?: string;
  justification?: string;
  tags: string[];
  author_id: number;
}

export interface UserInterface {
  user_id: number;
  name: string;
  is_faculty: boolean;
}

export interface tagInterface {
  tag_id: number;
  name: string;
}

export interface NoUserInterface {
  user_id: NoUser;
}
type NoUser = "not-signed-in";
