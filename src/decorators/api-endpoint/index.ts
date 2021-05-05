import { ControllerModel } from 'decorators/controller/types/models/controller.model';
import { ApiEndpointParams } from './api-endpoint-params.interface';

/**
 * Turns a simple ApiEndpoint definition into an Aws Function
 *
 * @param functionHandler
 */
export const ApiEndpoint = (functionHandler: ApiEndpointParams) => {
    return (Controller: ControllerModel, handlerName: string) => {
        let awsFunction = Controller[handlerName];

        const getter = () => {
            return awsFunction;
        };

        const setter = (controller) => {
            const handler =
                functionHandler.handler ||
                `src/${controller.handler}.${functionHandler.provider.name}`;
            const events = functionHandler.events || [
                {
                    http: {
                        method: functionHandler.method,
                        path: `${controller.path}${functionHandler.path}`,
                        cors: {
                            origin: '*',
                            headers: [
                                'Content-Type',
                                'X-Amz-Date',
                                'Authorization',
                                'X-Api-Key',
                                'X-Amz-Security-Token',
                                'X-Amz-User-Agent',
                                'authorizationToken',
                            ],
                        },
                        authorizer: {
                            type: 'aws_iam', // Add this to the params, TODO: Controller types
                        },
                    },
                },
            ];

            awsFunction = {
                ...functionHandler,
                handler,
                events,
            };
        };

        Object.defineProperty(Controller, handlerName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
};
