import { AwsAppModule } from 'common/types/interfaces/aws-app-module.interface';
import { ModuleParams } from './interfaces/module.interface';

export type AppModuleConstructor = () => AwsAppModule;

export type AppModuleDecorator = (params: ModuleParams) => AppModuleConstructor;
