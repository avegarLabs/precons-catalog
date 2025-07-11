import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
})
export class ContactInfoComponent implements OnInit {
  developerEmail = 'vegaramirezalfredo@gmail.com';
  workEmail = 'alfredo.vega@vertice.cu';
  constructor(
    private dialogRef: MatDialogRef<ContactInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  cancel() {
    this.dialogRef.close();
  }
}
