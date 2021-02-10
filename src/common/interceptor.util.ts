import { ClassConstructor, plainToClass } from "class-transformer";

export class Interceptor {
    private transform: ClassConstructor<any>;
    private bind: (value: Promise<any>) => Promise<any>;

    constructor(
        { transform, bind = value => value }:
        { transform?: ClassConstructor<any>, bind?: (response: Promise<any>) => Promise<any> }
    ){
        this.transform = transform;
        this.bind = bind;
    }

    public intercept(value: Promise<any>): Promise<any>{
        return this.bind(value)
        .then(resolvedValue => this.transform ? plainToClass(this.transform, resolvedValue) : resolvedValue);
    }
}