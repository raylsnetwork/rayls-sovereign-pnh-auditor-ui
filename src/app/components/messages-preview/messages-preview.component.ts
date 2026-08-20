import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MergedTransaction, ProtocolType, Paginated } from 'src/app/models/transaction';
import { HelpersService } from 'src/app/utils/helpers.service';

@Component({
  selector: 'app-messages-preview',
  templateUrl: './messages-preview.component.html',
  styleUrls: ['./messages-preview.component.scss']
})
export class MessagesPreviewComponent {
  @Input()
  public transactions?: Paginated<MergedTransaction>;

  @Input()
  public page: string;

  public randomWidths: { [index: number]: string } = {};

  public get pages() {
    if (this.transactions)
      return Math.ceil(this.transactions.total / this.transactions.limit);

    return;
  }

  public constructor(
    private router: Router,
    private helpersService: HelpersService
  ) {
    this.randomWidths = this.helpersService.generateRandomWidths(20, 5);
  }

  public goToMessageDetails(transaction: MergedTransaction) {
    if (transaction.idType === 'shared_id') {
      this.router.navigate([`/dvpSwap/${transaction.id}`]);
    } else if (transaction.idType === 'batch_id' && transaction.type === ProtocolType.enygma) {
      this.router.navigate([`/enygma/${transaction.id}`]);
    } else if (transaction.idType === 'batch_id') {
      this.router.navigate([`/batch/${transaction.id}`]);
    } else {
      this.router.navigate([`/message/${transaction.id}`], {
        queryParams: { idType: transaction.idType }
      });
    }
  }

  public getRandomWidth(i: number, j: number) {
    return this.randomWidths[5 * i + j];
  }

  public getPages() {
    if (!this.transactions) return;

    const pageNumber = +this.page;

    return [pageNumber - 2, pageNumber - 1, pageNumber, pageNumber + 1, pageNumber + 2]
      .filter((page) => page > 1 && page < this.pages!)
  }

  public isCurrentPage(page: number) {
    return +this.page === page;
  }

  public goToPage(page: number) {
    this.router.navigate([''], {
      queryParams: {
        page
      }
    });
  }
}
