import { Component, OnInit } from '@angular/core';
import { Transfer } from '../../model/transfer';
import { TransferService } from '../../service/transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/service/account.service';
import { Account } from 'src/app/account/model/account';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VirementMulttipleBeneficiare } from '../../model/VirementMulttipleBeneficiare';
import { HttpClient } from '@angular/common/http';
import { ClientService } from 'src/app/client/service/client.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css'],
})
export class TransferFormComponent implements OnInit {
  codeId: number;

  virementForm = new FormGroup({
    sommeTotal: new FormControl(0, Validators.required),
    
    listBenef: new FormArray([
        new FormControl('', Validators.required),
    ]),
    sommeBenef: new FormArray([
      new FormControl('', Validators.required),
    ]),
    

    
  })


  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private transferService: TransferService,
    private accountService: AccountService,
    public dialog: MatDialog,
    private clientService: ClientService
  ) {
    this.codeId = this.route.snapshot.params['id'];
    
  }



  onSubmit() {
   // console.log(this.listBenef.value);
    //console.log(this.sommeBenef.value);
    for (let i = 0; i < this.listBenef.length; i++) {
      console.log(this.listBenef.at(i).value);
      console.log(this.sommeBenef.at(i).value);
    }
    

        
    
    
  }

  goToTransferComplete() {
  }

  ngOnInit(): void {
  

  }

  get sommeTotal() :FormControl {
    return this.virementForm.get('sommeTotal') as FormControl;
    }
  get listBenef() : FormArray {
    return this.virementForm.get('listBenef') as FormArray;
     
  }
  get sommeBenef() : FormArray {
    return this.virementForm.get('sommeBenef') as FormArray;
     
  }
  onFormSubmit(): void {
    
    let listVmb= new Array<VirementMulttipleBeneficiare>() 
    for (let i = 0; i < this.listBenef.length; i++) {
      let vmb: VirementMulttipleBeneficiare = {
        numCompte: this.listBenef.at(i).value ,
        solde :  this.sommeBenef.at(i).value
      }
      

      console.log(vmb.solde)
      listVmb.push(vmb);
    }
   //  console.log(listVmb);
   // console.log(this.sommeTotal);
    
    this.http.post("http://localhost:8082/client/effectuervirement/" + this.codeId, listVmb).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );


    console.log(listVmb);
    this.listBenef.reset();
    this.sommeBenef.reset();


  }

  addNameField() { 
    this.listBenef.push(new FormControl('', Validators.required));
    this.sommeBenef.push(new FormControl('', Validators.required));
    
}

deleteNameField(index: number) {
    if (this.listBenef.length !== 1) { 
      this.listBenef.removeAt(index); 
    }
    if (this.sommeBenef.length !== 1) { 
      this.sommeBenef.removeAt(index); 
    }
}


  openDialog(): void {
    console.log('salam');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: 'Confirmer ce virement?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onSubmit();
      }
    });
  }
}
