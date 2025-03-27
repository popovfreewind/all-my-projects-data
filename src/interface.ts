export interface Project {
    name: string;
    type: "game" | "app" | "web";
    platforms: ("roku" | "web" | "amazon")[];
}