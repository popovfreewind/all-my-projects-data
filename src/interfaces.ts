export type Platform = "roku" | "web" | "amazon";
export interface Project {
    name: string;
    poster: string;
    type: "game" | "app" | "web";
    platforms: Platform[];
    links?: Partial<Record<Platform, string>>;
}