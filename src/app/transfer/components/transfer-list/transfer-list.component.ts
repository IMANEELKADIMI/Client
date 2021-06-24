import { Component, OnInit, ViewChild } from '@angular/core';
import { Transfer } from '../../model/transfer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TransferService } from '../../service/transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/account/model/account';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css'],
})
export class TransferListComponent implements OnInit {
  codeId: number;
  
  
  //transfers
  TRANSFERS!: Transfer[];
  dataSource = new MatTableDataSource<Transfer>(this.TRANSFERS);
  displayedColumns: string[] = [
    'dateCreation',
    'mentant',
    'nombreDeBeneficiare',
    'status',
    'client',
    'actions',
    
   
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private transferService: TransferService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.codeId = this.route.snapshot.params['id'];

  }

  ngOnInit(): void {
    //transfer
    this.transferService.findAll(this.codeId).subscribe(
      (data) => {
        this.TRANSFERS = data;

        this.dataSource = new MatTableDataSource<Transfer>(this.TRANSFERS);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.dataSource = new MatTableDataSource<Transfer>(null);
      }
    );
  }
  checkSender(name: string) {
    if (sessionStorage.getItem('name') === name) {
      return true;
    }
    {
      return false;
    }
  }
  openConfirmation(id :number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: 'Voulez vous confirmer virement ' + '?',
        idVir : id ,
        
      },
    });



  }
}
