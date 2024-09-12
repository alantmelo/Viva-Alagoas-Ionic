import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferService } from 'src/app/services/transfers.service'; 
import { Transfer } from 'src/app/models/transfer';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  transfer: Transfer | null = null;

  constructor(
    private route: ActivatedRoute,
    private transferService: TransferService
  ) {}

  ngOnInit() {
    const transferId = +this.route.snapshot.paramMap.get('id')!;
    this.transferService.getTransferById(transferId).subscribe((transferData) => {
      console.log(transferData);
      this.transfer = transferData;
    });
  }
}
