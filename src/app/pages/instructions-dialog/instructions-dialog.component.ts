import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-instructions-dialog',
  templateUrl: './instructions-dialog.component.html',
  styleUrl: './instructions-dialog.component.css'
})
export class InstructionsDialogComponent {

  constructor(private dialogRef: MatDialogRef<InstructionsDialogComponent>){}
  onUnderstandClick(){
    this.dialogRef.close();
  }
}
