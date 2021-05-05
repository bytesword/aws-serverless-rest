import * as Aws from 'serverless/aws';
import { ClassConstructor, classToPlain } from 'class-transformer';

/**
 * This class provides a utilities for build objects from an AppModule
 */
class ApiFactoryStatic {
    private apiDefinition: Aws.Functions;

    /**
     * Provides the mechanism for trigger the decorators of the AppModule
     * returns an Aws Functions plain object
     * 
     * @param AppModule 
     */
    public create(AppModule: ClassConstructor<object>): Aws.Functions {
        this.apiDefinition = classToPlain(AppModule);
        
        return this.apiDefinition;
    }
}

export const ApiFactory = new ApiFactoryStatic();
