import { AWSAppModule } from 'common/types/interfaces/aws-app-module.interface';
import { ModuleProps } from './module-props.interface';

/**
 * Merges the controller list
 *
 * @param props
 */
export const Module = (props: ModuleProps) => {
    return (): AWSAppModule => {
        let module: AWSAppModule = {};

        props.controllers.forEach((CurrentController) => {
            module = {
                ...module,
                ...CurrentController,
            };
        });
        return module;
    };
};
