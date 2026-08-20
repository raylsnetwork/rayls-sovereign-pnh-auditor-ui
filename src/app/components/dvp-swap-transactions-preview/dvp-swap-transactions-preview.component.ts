import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SwapTransaction } from 'src/app/models/transaction';
import { HelpersService } from 'src/app/utils/helpers.service';

@Component({
  selector: 'app-dvp-swap-transactions-preview',
  templateUrl: './dvp-swap-transactions-preview.component.html',
  styleUrls: ['./dvp-swap-transactions-preview.component.scss']
})
export class DvpSwapTransactionsPreviewComponent {
  @Input()
  public transactions: SwapTransaction[] = [];

  @Input()
  public isLoading: boolean = false;

  public randomWidths: { [index: number]: string } = {};

  public constructor(
    private router: Router,
    private helpersService: HelpersService
  ) {
    this.randomWidths = this.helpersService.generateRandomWidths(20, 8);
  }

  public goToMessageDetails(transaction: SwapTransaction) {
    this.router.navigate([`/message/${transaction.transactionId}`], {
      queryParams: { idType: 'transaction_id', transactionId: transaction.transactionId }
    });
  }

  public getRandomWidth(i: number, j: number) {
    return this.randomWidths[8 * i + j];
  }

  public getDate(date: string) {
    return this.helpersService.getDate(date).fromNow();
  }

  public get getPreview() {
    return this.helpersService.getPreview;
  }
}
