import { OutgoingMessage } from "http";

export interface Response extends OutgoingMessage {
    sse(data: string): void;
    status(code: number): void;
}
