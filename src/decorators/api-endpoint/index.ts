import { ApiEndpointParams } from "./api-endpoint-params.interface";

/**
 * Turns a simple ApiEndpoint definition into a usable Serverless endpoint
 * 
 * @param params 
 */
export const ApiEndpoint = (params: ApiEndpointParams) => {
    return (
        target: any,
        prop: string
    ): void => {
        let val = target[prop];

        const getter = () =>  {
            return val;
        };

        const setter = (next) => {
            val = {
                handler: `src/${next.service}.${params.provider}`,
                events: [
                    {
                        http: {
                            method: params.method,
                            path: `${next.path}${params.path}`,
                            cors: {
                                origin: '*',
                                headers: [
                                    'Content-Type',
                                    'X-Amz-Date',
                                    'Authorization',
                                    'X-Api-Key',
                                    'X-Amz-Security-Token',
                                    'X-Amz-User-Agent',
                                    'authorizationToken'
                                ]
                            },
                            authorizer: {
                                type: "aws_iam"
                            }
                        }
                    }
                ],
                ...params.custom
            };
        };

        Object.defineProperty(target, prop, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}