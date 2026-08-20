import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EnygmaTransaction } from 'src/app/models/transaction';
import { HelpersService } from 'src/app/utils/helpers.service';

@Component({
  selector: 'app-enygma-transactions-preview',
  templateUrl: './enygma-transactions-preview.component.html',
  styleUrls: ['./enygma-transactions-preview.component.scss']
})
export class EnygmaTransactionsPreviewComponent {

  @Input()
  public enygmaTransactions: EnygmaTransaction[] = [];

  @Input()
  public isLoading: boolean = false;

  public randomWidths: { [index: number]: string } = {};

  public constructor(
    private router: Router,
    private helpersService: HelpersService
  ) {
    this.randomWidths = this.helpersService.generateRandomWidths(20, 8);
  }

  public goToMessageDetails(tx: EnygmaTransaction) {
    this.router.navigate([`/message/${tx.messageId}/0`], { queryParams: { batchId: tx.batchId } });
  }

  public getRandomWidth(i: number, j: number) {
    return this.randomWidths[8 * i + j];
  }
}
