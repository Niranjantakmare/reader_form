import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { OldBook } from "app/models/oldBook";
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class DataService {
    getAllReader(): any {
        throw new Error("Method not implemented.");
    }
  private Url = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }np

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError>{
          console.log("Getting all reader from the server");
          return this.http.get<Reader[]>(this.Url + 'booktracker/allReader.php').pipe(
            catchError(err => this.handleHttpError(err))
          );
  }

  

  getAllBooks(): Observable<Book[] | BookTrackerError> {
      console.log("Getting all book from the server");
      return this.http.get<Book[]>(this.Url + "booktracker/allBook.php").pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  // tslint:disable-next-line:one-line
  private handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'an error occurred retrieving data.';
    return ErrorObservable.create(dataError);
  }

  getBookById(id: number): Observable<Book> {
    let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.get<Book>(this.Url + "booktracker/allBook.php?id=" + id, {
      headers: getHeaders
    });
  }

  getReaderById(id: number): Observable<Reader> {
    let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.get<Reader>(this.Url + "booktracker/allReader.php?id=" + id, {
      headers: getHeaders
    });
  }


  getOddBookById(id: number): Observable<OldBook> {
    return this.http.get<OldBook>(this.Url + "booktracker/allBook.php?id=" + id).pipe(
      map(b => <OldBook>{
        bookTitle: b.title,
        year: b.publicationYear
      }),
      tap(classicBook => console.log(classicBook))
    );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.Url + "booktracker/addBook.php", newBook, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(this.Url + "booktracker/updateBook.php?id=" + updatedBook.bookID, updatedBook, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  addReader(newReader: Reader): Observable<Reader> {
    return this.http.post<Reader>(this.Url+"booktracker/addReader.php", newReader, {
      headers: new HttpHeaders({
          'Content-type': 'application/json'
      })
    });
  }
updatedReader(updatedReader: Reader): Observable<void> {
      return this.http.put<void>(this.Url+"booktracker/updateReader.php?id="+updatedReader.readerID, updatedReader,{
        headers: new HttpHeaders({
          'Content-type' : 'application/json'
        })
      })
}

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(this.Url + "booktracker/deleteBook.php?id=" + bookID);

  }

  deleteReader(readerID: number): Observable<void> {
    return this.http.delete<void>(this.Url + "booktracker/deleteReader.php?id=" + readerID);

  }
}
