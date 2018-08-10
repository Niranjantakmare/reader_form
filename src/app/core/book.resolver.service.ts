import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";

import { BookTrackerError } from 'app/models/bookTrackerError';
import { DataService } from './data.service';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BookResolverService implements Resolve<Book[] | BookTrackerError> {
    constructor(private dataService: DataService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError>{
        return this.dataService.getAllBooks()
        .pipe(
            catchError(err => of(err))
        )
    }
}