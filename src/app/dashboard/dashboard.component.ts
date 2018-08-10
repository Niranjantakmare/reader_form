import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from 'app/core/data.service';
import { ActivatedRoute } from '@angular/router'; 
import { BookTrackerError } from '../models/bookTrackerError';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title,
            private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getAllBooks().subscribe(
      (data: Book[]) => this.allBooks = data,
      (err: any) => console.log(err),
      () => this.loggerService.log("All done getting book")
    );
    let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];

    if(resolvedData instanceof BookTrackerError){
       console.log(`Dashboard component error: ${resolvedData.friendlyMessage} `);
    }else{
        this.allBooks = resolvedData;
    }
   // this.allReaders = this.dataService.getAllReaders();

    let resolvedData1: Reader[] | BookTrackerError = this.route.snapshot.data['resolvedReader'];

    if(resolvedData1 instanceof BookTrackerError){
       console.log(`Dashboard component error: ${resolvedData1.friendlyMessage} `);
    }else{
        this.allReaders = resolvedData1;
    }

    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
    this.dataService.deleteBook(bookID)
    .subscribe(
      (data: void) => {
          let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
        this.allBooks.slice(index, 1);
      },
      (err: any) => console.log(err)
    );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`); 
      this.dataService.deleteReader(readerID).subscribe(
          (data: void) => {
            let index: number = this.allReaders.findIndex(reader => reader.readerID === readerID);
            this.allReaders.slice(index, 1);
          },
          (err: any) => console.log(err)
      );

  }

}
