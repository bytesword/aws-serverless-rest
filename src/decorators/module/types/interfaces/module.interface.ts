import { ClassConstructor } from "class-transformer";

export interface ModuleParams {
    imports?: Array<ClassConstructor<any>>;
    controllers?: Array<ClassConstructor<any>>;
}
