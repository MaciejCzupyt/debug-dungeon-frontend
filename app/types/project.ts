export interface Project {
    id: number,
    title: string,
    description: string,
    shirt_size: string,
    tags: string[], //as in, an array of strings
    user: string,
    created: string, //date?
    modified: string, //date?
}