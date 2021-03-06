import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType  } from '@angular/common/http';

import { INSPECT_MAX_BYTES } from 'buffer';
import { Observable } from 'rxjs/Observable';
import {  tap } from 'rxjs/operators';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`LogResponseIntercetor ${req.url}`);
        return next.handle(req)
        .pipe(
                tap(event => {
                    if (event.type === HttpEventType.Response) {
                        console.log(event.body);
                    }
                })
        );
    }
}
