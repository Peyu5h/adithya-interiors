export interface BlogPost {
  id: string;
  title: string;
  blogContent: string;
  thumbnailImgUrl: string;
  slug: string;
  isHtml: boolean;
  tags: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  author: string;
}

export interface BlogResponse {
  success: boolean;
  data: BlogPost;
}

export interface BlogListResponse {
  success: boolean;
  data: {
    blogs: Omit<BlogPost, "blogContent">[];
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
export interface Message {
  role: "user" | "assistant";
  content: string;
}
