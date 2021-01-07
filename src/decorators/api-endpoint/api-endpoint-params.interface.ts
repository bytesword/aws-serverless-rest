export interface ApiEndpointParams {
    provider: string;
    method: string;
    path: string;
    custom: {[key: string]: any};
}