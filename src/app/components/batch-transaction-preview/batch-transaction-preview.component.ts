import { Component, Input } from '@angular/core';
import { BatchTransaction } from 'src/app/models/transaction';
import { HelpersService } from 'src/app/utils/helpers.service';

@Component({  selector: 'app-batch-transaction-preview',
  templateUrl: './batch-transaction-preview.component.html',
  styleUrls: ['./batch-transaction-preview.component.scss']
})
export class BatchTransactionPreviewComponent {
  @Input()
  public transaction!: BatchTransaction;

  @Input()
  public hideTokenColumn: boolean = false;

  public get getPreview() {
    return this.helpersService.getPreview;
  }

  public getDate(date: string) {
    return this.helpersService.getFormattedDate(date, "MMM DD, HH:mm");
  }

  public constructor(
    private helpersService: HelpersService
  ) {}
}
