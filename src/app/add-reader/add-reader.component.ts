import { Component, OnInit } from '@angular/core';

import { Reader } from "app/models/reader";
import { DataService  } from 'app/core/data.service';
import { BookTrackerError } from '../models/bookTrackerError';
@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styles: []
})
export class AddReaderComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  ngOnInit() { }

  saveReader(formValues: any): void {
    let newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;
    console.log(newReader);

  this.dataservice.addReader(newReader).subscribe(
    (data: Reader) => console.log(Reader),
    (err: BookTrackerError) =>  console.log(err.friendlyMessage)
    );
    console.warn('Save new reader not yet implemented.');
  }

}
