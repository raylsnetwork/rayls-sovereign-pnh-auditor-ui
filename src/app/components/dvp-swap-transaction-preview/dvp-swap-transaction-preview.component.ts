import { Component, Input } from '@angular/core';
import { SwapTransaction } from 'src/app/models/transaction';
import { HelpersService } from 'src/app/utils/helpers.service';

@Component({
    selector: 'app-dvp-swap-transaction-preview',
    templateUrl: './dvp-swap-transaction-preview.component.html',
    styleUrls: ['./dvp-swap-transaction-preview.component.scss']
})
export class DvpSwapTransactionPreviewComponent {
    @Input()
    public transaction: SwapTransaction;

    @Input()
    public index: number;

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
