import { HttpStatus } from "./enums/http-status.enum";

/**
 * This class provides a HttpException object
 * util for the provider responses 
 */
export class HttpException {
    public status: HttpStatus;
    public message?: any;

    constructor(status, message){
        this.status = status;
        this.message = message;
    }
}