
type Importance = "High" | "Medium" | "Low";
type Status = "Incomplete" | "Progress" | "Completed";

export type Todo = {
    id: string;
    description?: string;
    isCompleted?: boolean;
    status?: Status;
    importance?: Importance;
}
