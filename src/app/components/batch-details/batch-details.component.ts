import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchTransaction, Paginated } from 'src/app/models/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { DEFAULT_PAGE, DEFAULT_BATCH_PAGE_SIZE, DEFAULT_TOTAL } from 'src/app/utils/constants';

@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.scss']
})
export class BatchDetailsComponent implements OnInit {
  public batchId: string;
  public transactionsList: BatchTransaction[] = [];
  public currentPage: number = DEFAULT_PAGE;
  public pageSize: number = DEFAULT_BATCH_PAGE_SIZE;
  public totalTransactions: number = DEFAULT_TOTAL;
  public totalPages: number = DEFAULT_TOTAL;
  public isLoading: boolean = false;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionsService: TransactionsService,
  ) { }

  public async ngOnInit(): Promise<void> {
    const batchId = this.route.snapshot.paramMap.get('id');

    if (!batchId) return;

    this.batchId = batchId;

    await this.loadTransactions();
  }

  public async loadTransactions(): Promise<void> {
    this.isLoading = true;

    const response: Paginated<BatchTransaction> = await this.transactionsService.getBatchTransactionsByBatchId(
      this.batchId,
      {
        page: this.currentPage,
        limit: this.pageSize
      }
    );

    if (this.currentPage === 1 && response.total === 0) {
      this.isLoading = false;
      this.goToErrorPage();
      return;
    }

    this.transactionsList = response.data;
    this.totalTransactions = response.total;
    this.totalPages = response.totalPages || Math.ceil(response.total / response.limit);
    this.isLoading = false;
  }

  public getPages(): number[] {
    const pages = [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2]
      .filter((page) => page > 1 && page < this.totalPages);
    return pages;
  }

  public async goToPage(page: number): Promise<void> {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    
    this.currentPage = page;
    await this.loadTransactions();
  }

  public goToErrorPage() {
    this.router.navigate(['404']);
  }
}
