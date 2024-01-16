import { HttpRequest, HttpResponse } from "./types";

export interface HttpProtocol {
    http(request: HttpRequest): Promise<HttpResponse>;
}