import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InstructionsDialogComponent } from '../instructions-dialog/instructions-dialog.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  userId:any;
  password:any;

  constructor(private router: Router, private dialog: MatDialog){}

  onSubmit(){
    if(this.userId && this.password){
      console.log("userId:" , this.userId);
      console.log("password:", this.password);

      localStorage.setItem("userId", this.userId);
      localStorage.setItem("password", this.password);

      this.showInstructions();
      // this.router.navigateByUrl('quiz');
    }
    else{
      alert("userId and password are required")
    }
  }
  showInstructions(): void {
    const dialogRef = this.dialog.open(InstructionsDialogComponent, {
      width: '400px',
      disableClose: true // Prevent closing the dialog without clicking the button
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/quiz']);
    });
  }

}
