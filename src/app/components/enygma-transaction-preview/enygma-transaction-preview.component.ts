import { Component, Input } from '@angular/core';
import { EnygmaTransaction } from 'src/app/models/transaction';
import { HelpersService } from 'src/app/utils/helpers.service';

@Component({
  selector: 'app-enygma-transaction-preview',
  templateUrl: './enygma-transaction-preview.component.html',
  styleUrls: ['./enygma-transaction-preview.component.scss']
})
export class EnygmaTransactionPreviewComponent {
  @Input()
  public transaction: EnygmaTransaction;

  public get getPreview() {
    return this.helpersService.getPreview;
  }

  public getDate(date: string) {
    return this.helpersService.getFormattedDate(date, "MMM DD, HH:mm");
  }

  public constructor(
    private helpersService: HelpersService
  ) { }
}
