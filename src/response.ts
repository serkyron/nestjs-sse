import { Response as ExpressResponse } from "express";

export interface Response extends ExpressResponse {
    sse(data: string): void;
}
