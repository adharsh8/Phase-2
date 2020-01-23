import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StreamService } from 'src/app/Data/stream.service';
import { Streamdetails } from 'src/app/Data/streamdetails';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { streamallocation } from 'src/app/Data/employeestream';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface Streams
{
  key: string;
  value: number;
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [StreamService] 
})
export class ModalComponent implements OnInit {

public streams : Streamdetails[];
streamform: FormGroup;
result : FormGroup;
employeeId: any;

strallocate : streamallocation = new streamallocation();
streamTypelist: Array<Streams> = [
  { key: '.Net', value: 1002 },
  { key: 'EDM', value: 1003 }
]

  constructor(private dataservice : StreamService,private form: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalComponent>,
    private _snackBar: MatSnackBar, private router: Router) {
 
    } 

  onNoClick(): void {
    this.dialogRef.close();
  }
  OnSumbit() {
    if(this.streamform.valid){
      this.finalvalue();

      this.dialogRef.close();
  }
}
  finalvalue()
  {
    this.strallocate.Stream_Id = this.streamform.get('streamid').value.value;
    console.log(this.strallocate.Stream_Id);
    this.strallocate.Employee_Id = JSON.parse(localStorage.getItem('EmployeId'));
    this.employeeId = this.strallocate.Employee_Id;
    console.log(this.employeeId);
    console.log(this.strallocate);
    
    this.dataservice.createStreamEmployee(this.strallocate).subscribe(
      
      results =>  this.openSnackBar(results,'Close'),
          error =>  this.openSnackBar(error.error.message,'Close')
    );
    this.dataservice.UpdateStatus(this.employeeId).subscribe();
    
  }
  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    this.router.navigate(['stream']);
  }

  ngOnInit(){
    this.streamform = this.form.group({    
      streamid: ['',Validators.required]   // will use the property in html page  
      })  
      this.getstream();
    
  }
  getstream(){
    this.dataservice.getStream().subscribe(
      value =>{ this.streams = value;
      console.log(this.streams);
      
    },
      err =>{console.log(err);
      }
    )
  }

}

 
