export interface ResourceInfo {
  id: number;
  title: string;
  description: string;
  url: string;
  origin: string;
  author_id: number;
  author_name: string;
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
export interface UserInterface {
  id: number;
  name: string;
  is_faculty: boolean;
}
