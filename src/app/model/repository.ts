import { Profile } from "./profile";

export interface Repository {
    id: number;
    name: string;
    description: string;
    language: string;
    archived: boolean;
    fork: boolean;
    forks: number;
    is_template: boolean;
    private: boolean;
    stargazers_count: number;
    mirror_url: string;
    owner: string;
    created_at: string;
    updated_at: string;
}