import { ClassConstructor } from "class-transformer";

export interface ValidationPipeParams {
    [key: string]: ClassConstructor<any>
}