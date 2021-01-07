import { ModuleProps } from "./module-props.interface";

/**
 * Merges the controller list
 * 
 * @param props 
 */
export const Module = (props: ModuleProps) => {
    return (
        _constructor
    ) => {
        let module: any = {};

        props.controllers.forEach(CurrentController => {
            module = {
                ...module,
                ...CurrentController
            }
        });
        return module;
    };
}