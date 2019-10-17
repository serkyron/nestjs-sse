declare namespace Express {
    export interface Response {
        sse(data: string): void;
    }
}
