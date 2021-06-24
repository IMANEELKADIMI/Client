import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {

  confirmForm = new FormGroup({
    password: new FormControl('', Validators.required),
  })

  get password() :FormControl {
    return this.confirmForm.get('password') as FormControl;
    }
  local_data: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private http: HttpClient
  ) {
    this.local_data = { ...data };
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onPassSubmit(): void {


    console.log(this.data.idVir)
    console.log(this.password)
  //  let pass = JSON.stringify(this.password)
    this.http.put("https://localhost:8082/client/virementmultiple/" + this.data.idVir + "/confirme", this.password).subscribe(
      (data) => {
        console.log(data);
      },

        (error) => {
          console.log(error);
        }
      
      )
    
    
    this.dialogRef.close({ data: this.local_data });
  }

  ngOnInit(): void {
    
  }
}
