import { AwsAppModule } from 'common/types/interfaces/aws-app-module.interface';
import { AppModuleDecorator } from './types/module.type';

/**
 * Merges the controller list
 *
 * @param params
 */
export const Module: AppModuleDecorator = params => {
    return () => {
        let module: AwsAppModule = {};
        const imports = params.imports || [];
        const controllers = params.controllers || [];

        [...imports, ...controllers].forEach(CurrentController => {
            module = {
                ...module,
                ...CurrentController
            }
        });

        return module;
    };
};
