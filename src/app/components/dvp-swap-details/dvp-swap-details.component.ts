import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DvpSwapStatus, SwapTransaction } from 'src/app/models/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { HelpersService } from 'src/app/utils/helpers.service';
import { ZERO_ADDRESS, ZERO_HASH } from 'src/app/utils/constants';


@Component({
    selector: 'app-dvp-swap-details',
    templateUrl: './dvp-swap-details.component.html',
    styleUrls: ['./dvp-swap-details.component.scss']
})
export class DvpSwapDetailsComponent implements OnInit {
    public sharedId: string;
    public nodeA: SwapTransaction;
    public nodeB: SwapTransaction;
    public isLoading: boolean = true;
    public hasData: boolean = false;    
    

    public constructor(
        private route: ActivatedRoute,
        private router: Router,
        private transactionsService: TransactionsService,
        private helpersService: HelpersService        
    ) { }

    public async ngOnInit(): Promise<void> {
        const sharedId = this.route.snapshot.paramMap.get('id');

        if (!sharedId) return;

        this.sharedId = sharedId;

        await this.loadTransactions();
    }

    public async loadTransactions(): Promise<void> {
        this.isLoading = true;

        const transactions = await this.transactionsService.getDvpSwapTransactionsBySharedId(this.sharedId);

        if (transactions.length === 0) {
            this.isLoading = false;
            this.goToErrorPage();
            return;
        }

        this.nodeA = transactions[0];
        this.nodeB = transactions[1] ?? null;
        this.hasData = transactions.length >= 2;
        this.nodeA = transactions[0];
        this.nodeB = transactions[1] ?? null;
        this.hasData = transactions.length >= 2;        
        this.isLoading = false;
    }

    public get status(): string {
        return this.nodeA?.status ?? '';
    }

    public get protocol(): string {
        return this.nodeA?.protocol ?? '';
    }

    public get DvpStatus() {
        return DvpSwapStatus;
    }

    public getDate(date: string) {
        return this.helpersService.getFormattedDate(date);
    }

    public showAddress(address: string) {
        return address && address !== ZERO_ADDRESS && address !== ZERO_HASH;
    }

    public get hubTxHash(): string {
        return this.nodeA?.hubTxHash ?? '';
    }



    public goToErrorPage() {
        this.router.navigate(['404']);
    }
}
