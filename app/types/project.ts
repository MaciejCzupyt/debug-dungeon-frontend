export interface Project {
    id: number,
    title: string,
    description: string,
    repository_link: string,
    shirt_size: string,
    tags: string[],
    user: string,
    created: string, //date?
    modified: string, //date?
}