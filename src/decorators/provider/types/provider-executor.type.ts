import { Context } from "aws-lambda";
import { APIGatewayProxyEvent } from "common/types/interfaces/api-gateway-proxy-event.interface";

export type ProviderExecutor<T> = (params?: APIGatewayProxyEvent<any>, context?: Context) => Promise<T>