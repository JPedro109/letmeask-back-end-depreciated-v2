import { HttpRequest, HttpResponse } from "../ports";

export interface HttpProtocol {
    handle(request: HttpRequest): Promise<HttpResponse>;
}