import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { HttpResponse } from "common/api-response.util";
import { HttpStatus } from "common/enums/http-status.enum";
import { HttpException } from "common/http-exception.util";
import { Interceptor } from "common/interceptor.util";
import { logApiExecution } from "common/logger.util";
import { ApiRequestParams } from "common/types/models/api-request.model";
import { ValidationPipe } from "common/validation-pipe.util";
import { ProviderExecutor } from "./types/provider-executor.type";

/**
 * Method responsible for providing a decorator for turn a function into a API Gateway Proxy Function
 * 
 * @param executor 
 */
export const Provider = <T> (
    executor: ProviderExecutor<T>,
    ...args: Array<ValidationPipe | Interceptor>
): (
    event: APIGatewayProxyEvent,
    context: Context
) => Promise<APIGatewayProxyResult> => {
    return (
        event: APIGatewayProxyEvent,
        context: Context
    ) => {
        logApiExecution(event, context);

        const parsed: ApiRequestParams = {
            body: event.body && JSON.parse(event.body),
            pathParameters: event.pathParameters,
        };
        let interceptor: Interceptor;
        let validationPipes: Array<Promise<void>> = [];

        args.forEach(arg => {
            arg instanceof ValidationPipe && validationPipes.push(arg.toValidate(parsed));
            !interceptor && arg instanceof Interceptor && (interceptor = arg);
        });

        return Promise.all(validationPipes)
        .catch(error => {
            console.log(error);
            throw new HttpException(HttpStatus.BAD_REQUEST, error);
        })
        .then(() => 
            interceptor ? interceptor.intercept(executor({ ...event, parsed })) : executor({ ...event, parsed })
        )
        .then(response => HttpResponse(
            HttpStatus.OK,
            response
        ))
        .catch((error) => HttpResponse(
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error.message
        ));
    }
}