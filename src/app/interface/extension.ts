export interface Extension {
    id: number;
    extensionNumber: string;
    loggedUser: string | null;
    user?: {
        id: number;
        name: string
        email: string
    } | null;
}