import { Component, OnInit } from '@angular/core';
import{   DataService } from 'app/core/data.service';
import { Book } from "app/models/book";
import { BookTrackerError } from '../models/bookTrackerError';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: []
})
export class AddBookComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  ngOnInit() { }

  saveBook(formValues: any): void {
    let newBook: Book = <Book>formValues;
    newBook.bookID = 0;
    console.log(newBook);
    this.dataservice.addBook(newBook) .subscribe(
      (data: Book) => console.log(data),
      (err: BookTrackerError) => console.log(err.friendlyMessage)
    );
    console.warn('Save new book not yet implemented.');
  }

}