import { APIGatewayProxyEvent as AwsAPIGatewayProxyEvent } from 'aws-lambda';
import { ApiRequestParams } from '../models/api-request.model';

export interface APIGatewayProxyEvent<T extends ApiRequestParams>
    extends AwsAPIGatewayProxyEvent {
    parsed: T;
}
