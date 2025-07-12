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

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  content: string;
  images: string[];
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  fullLocation: string;
  description: string;
  slug: string;
  thumbnailImage: string;
  images: string[];
  technologies: string[];
  completedDate: string;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  success: boolean;
  data: Project;
}

export interface ProjectListResponse {
  success: boolean;
  data: {
    projects: Project[];
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export interface ServiceResponse {
  success: boolean;
  data: Service;
}

export interface ServiceListResponse {
  success: boolean;
  data: {
    services: Service[];
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export type Services = Service[];
export type Projects = Project[];
