import type { PortableTextBlock } from "next-sanity";

//Server action response
export interface ActionResponse<T> {
    submitted: boolean;
    success: boolean
    message: string;
    errors?: {
        [K in keyof T]?: Array<string>
    };
    inputs?: T
}

//Sanity types
export interface Review {
    _id: string;
    text: string;
    person: string;
    role: string;
    company: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
}

export interface Tool {
    _id: string;
    api_image: string | null;
    url: string;
    category: Category | null;
    /** Fallback label when no logo is available */
    name?: string;
}

export interface Project {
    _id: string;
    heading: string;
    slug: string;
    heading2: string;
    overview: string;
    category: Category | null;
    pills: Array<string>;
    text: Array<PortableTextBlock>;
}

export interface ProjectDetail extends Project {
    _createdAt: string;
    _updatedAt: string;
}

export interface ProjectSlug {
    slug: string;
    _updatedAt: string;
}

export type Reviews = Array<Review>;
export type Projects = Array<Project>;
export type Categories = Array<Category>;
export type Tools = Array<Tool>;
