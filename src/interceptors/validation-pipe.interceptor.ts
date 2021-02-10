import { validate } from "class-validator";
import { ClassConstructor } from "class-transformer";

export class ValidationPipe<T extends ClassConstructor<any>> {
    public validate(params: T){
        validate(params);
    }
}