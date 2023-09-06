import { HttpRequest, HttpResponse } from "../ports";

export interface HttpProtocol {
    http(request: HttpRequest): Promise<HttpResponse>;
}