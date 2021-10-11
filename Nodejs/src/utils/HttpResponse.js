class HttpResponse{
    constructor(status,response){
        this.status = status.toUpperCase();
        this.body = response
    }
}

module.exports = HttpResponse;