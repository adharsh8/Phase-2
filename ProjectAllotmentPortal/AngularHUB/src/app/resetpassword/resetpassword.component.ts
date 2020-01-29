import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../Data/data.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  changePasswordForm: any;
  userId : string;
  oldPassword : string;
  value : string;
  setPasswordForm : any;
  formvalid : boolean = true;
  newpass : string;
  confrmpass : string;
  display: string;
  show : boolean = true;
  
  constructor(private form: FormBuilder,private dataservice : DataService,private _snackBar: MatSnackBar,
    private router: Router,public dialogRef: MatDialogRef<ResetpasswordComponent>) { }

  ngOnInit() {
    this.changePasswordForm = this.form.group({
      oldpassword: ['', Validators.required],

    })
    this.setPasswordForm = this.form.group({
      newpassword : ['',Validators.required],
      confirmPassword:['',Validators.required]
    })
  }
  Check()
  {
    this.oldPassword =  this.changePasswordForm.get('oldpassword').value;
    this.userId =localStorage.getItem('userId');
    
    this.dataservice.CheckPassword(this.userId,this.oldPassword).subscribe(
      result =>  {this.openSnackBar(result,'Close')
                  this.value = result;
                  if(this.value == "Success")
                  {
                    this.formvalid = false;
                  }
                  else{
                    this.formvalid = true;
                  }
                  },
        error =>  this.openSnackBar(error.error.message,'Close')
        
    );
    
  }
  password() {
    this.show = !this.show;
}

  onSubmit()
  {
    this.newpass = this.setPasswordForm.get('newpassword').value;
    this.confrmpass = this.setPasswordForm.get('confirmPassword').value;
    this.userId =localStorage.getItem('userId');
    this.dataservice.ChangePassword(this.userId,this.newpass).subscribe(
      
      results =>  this.openSnackBar(results.toString(),'Close'),
      error =>  this.openSnackBar(error.error.message,'Close')
    );
      this.router.navigate(['welcomepage']);
  }
  applyFilter(filterValue: string) {
    this.newpass = this.setPasswordForm.get('newpassword').value; 
    console.log(this.newpass);
    if(this.newpass == filterValue)
    {
      this.display = "Password Matches";
    }
    else{
      this.display = "Password doesn't Match";
    }
  }
  applyFilter1(filterValue: string) {
    if(this.setPasswordForm.get('confirmPassword').valid)
    {
    this.confrmpass = this.setPasswordForm.get('confirmPassword').value; 
    console.log(this.confrmpass);
    if(this.confrmpass == filterValue)
    {
      this.display = "Password Matches";
    }
    else{
      this.display = "Password doesn't Match";
    }
  }
  }
  clear()
  {
    this.dialogRef.close({event:'Cancel'});
  }
  openSnackBar(message: string, action: string) 
  {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
