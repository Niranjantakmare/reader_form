import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest  } from '@angular/common/http';

import { INSPECT_MAX_BYTES } from 'buffer';
import { Observable } from 'rxjs/Observable';
export class AddHeaderInterceptor implements HttpInterceptor {
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
     console.log(`AddHeaderInceptor - ${req.url}`);
    let jsonReq: HttpRequest<any> = req.clone({
        setHeaders: {'Content-type' : 'application/json'}
    });
    return next.handle(jsonReq);
 }
}
