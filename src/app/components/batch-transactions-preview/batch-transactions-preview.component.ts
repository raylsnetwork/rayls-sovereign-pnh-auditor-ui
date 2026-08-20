import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BatchTransaction } from 'src/app/models/transaction';
import { HelpersService } from 'src/app/utils/helpers.service';

@Component({
  selector: 'app-batch-transactions-preview',
  templateUrl: './batch-transactions-preview.component.html',
  styleUrls: ['./batch-transactions-preview.component.scss']
})
export class BatchTransactionsPreviewComponent {
  @Input()
  public transactions: BatchTransaction[] = [];

  @Input()
  public isLoading: boolean = false;

  public get hideTokenColumn(): boolean {
    return this.transactions.length > 0 && this.transactions.every(tx => !tx.tokenSymbol);
  }

  public randomWidths: { [index: number]: string } = {};

  public constructor(
    private router: Router,
    private helpersService: HelpersService
  ) {
    this.randomWidths = this.helpersService.generateRandomWidths(20, 8);
  }

  public goToMessageDetails(transaction: BatchTransaction) {
    this.router.navigate([`/message/${transaction.messageId}`]);
  }

  public getRandomWidth(i: number, j: number) {
    return this.randomWidths[8 * i + j];
  }
}
