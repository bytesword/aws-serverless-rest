import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class ValidationPipe {
    private type: ClassConstructor<any>;
    private param?: string;
    private value;

    constructor(type: ClassConstructor<any>, param?: string) {
        this.type = type;
        this.param = param;
    }

    public toValidate(value): Promise<void> {
        value = this.param ? value[this.param] : value;

        if (!value)
            return Promise.reject([
                {
                    target: this.type,
                    value: undefined,
                    property: this.param,
                    constraints: {
                        isNotEmpty: 'Property should not be empty',
                    },
                },
            ]);

        this.value = plainToClass(this.type, value);

        return validateOrReject(this.value);
    }
}
