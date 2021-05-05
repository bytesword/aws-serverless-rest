import Aws from 'serverless/aws';
import { ProviderExecutor } from '../provider/types/provider-executor.type';

export interface ApiEndpointParams extends Aws.AwsFunctionHandler {
    provider?: ProviderExecutor<any>;
    method?: string;
    path?: string;
}
