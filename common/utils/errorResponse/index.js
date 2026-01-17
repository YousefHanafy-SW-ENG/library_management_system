export class ErrorResponse extends Error{
    constructor(message, status, errorCode, errors, data){
        super(message);
        this.status=status;
        this.errorCode=errorCode;
        this.errors =errors;
        this.data = data;
    }
}

export class NotFoundErrorResponse extends Error{
    constructor(message){
        super(message);
        this.status=404;
        this.errorCode="NOTFOUND";
        this.errors =null;
        this.data = null;
    }
}