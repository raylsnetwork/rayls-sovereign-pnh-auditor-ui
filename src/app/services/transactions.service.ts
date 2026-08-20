import { Injectable } from '@angular/core';
import { BatchTransaction, EnygmaTransaction, FlatTransaction, SwapTransaction, MergedTransaction, Paginated, PaginationParams } from '../models/transaction';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { ConfigService } from './config.service';
import { DEFAULT_TOTAL, DEFAULT_PAGE, DEFAULT_LIMIT } from '../utils/constants';

const ENDPOINTS = {
  getRecentTransactions: '/audit/transactions',
  getTransactionByMessageId: (messageId: string) => `/audit/transactions/${messageId}`,
  getTransactionByTransactionId: (transactionId: string) => `/audit/transactions/dvp/${transactionId}`,
  getDvpSwapTransactionsBySharedId: (sharedId: string) => `/audit/transactions/dvp/swap/${sharedId}`,
  getBatchTransactionsByBatchId: (batchId: string) => `/audit/transactions/batch/${batchId}`,
  getEnygmaTransactionsByBatchId: (batchId: string) => `/audit/transactions/enygma/batch/${batchId}`
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  private buildPaginationParams(pagination?: PaginationParams): Record<string, string> {
    const params: Record<string, string> = {};
    if (pagination?.page !== undefined && pagination.page > 0) {
      params['page'] = pagination.page.toString();
    }
    if (pagination?.limit !== undefined && pagination.limit > 0) {
      params['limit'] = pagination.limit.toString();
    }
    return params;
  }

  public async getRecentTransactions(filters: { [filter: string]: string }): Promise<Paginated<MergedTransaction>> {
    await this.configService.loadBaseUrl();

    const url = this.configService.getBaseUrl() + ENDPOINTS.getRecentTransactions;

    const transactions = await firstValueFrom<Paginated<MergedTransaction>>(
      this.httpClient.get<Paginated<MergedTransaction>>
        (url, {
          params: filters
        })
        .pipe(catchError((error) => {
          return of(error);
        }))
    );

    return transactions;
  }

  public async getTransactionByMessageId(messageId: string): Promise<{ data: FlatTransaction | null; error: Error | null }> {
    await this.configService.loadBaseUrl();

    try {
      const transaction = await firstValueFrom<FlatTransaction>(
        this.httpClient.get<FlatTransaction>(
          this.configService.getBaseUrl() + ENDPOINTS.getTransactionByMessageId(messageId)
        )
      );
      return { data: transaction || null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  public async getTransactionByTransactionId(transactionId: string): Promise<{ data: FlatTransaction | null; error: Error | null }> {
    await this.configService.loadBaseUrl();

    try {
      const transaction = await firstValueFrom<FlatTransaction>(
        this.httpClient.get<FlatTransaction>(
          this.configService.getBaseUrl() + ENDPOINTS.getTransactionByTransactionId(transactionId)
        )
      );
      return { data: transaction || null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  public async getDvpSwapTransactionsBySharedId(sharedId: string): Promise<SwapTransaction[]> {
    await this.configService.loadBaseUrl();

    const transactions = await firstValueFrom<SwapTransaction[]>(
      this.httpClient.get<SwapTransaction[]>
        (this.configService.getBaseUrl() + ENDPOINTS.getDvpSwapTransactionsBySharedId(sharedId))
        .pipe(
          map((transactions: SwapTransaction[]) => {
            return transactions.map((it) => ({
              ...it,
              sharedId: sharedId
            } as SwapTransaction));
          }),
          catchError(() => of([]))
        )
    );

    return transactions;
  }

  public async getTransactionById(id: string, idType: string): Promise<{ data: FlatTransaction | null; error: Error | null }> {
    switch (idType) {
      case 'message_id':
        return this.getTransactionByMessageId(id);
      case 'transaction_id':
        return this.getTransactionByTransactionId(id);
      default:
        return this.getTransactionByMessageId(id);
    }
  }

  public async getEnygmaTransactionsByBatchId(
    batchId: string,
    pagination?: PaginationParams
  ): Promise<Paginated<EnygmaTransaction>> {
    await this.configService.loadBaseUrl();

    const response = await firstValueFrom<Paginated<EnygmaTransaction>>(
      this.httpClient.get<Paginated<EnygmaTransaction>>
        (this.configService.getBaseUrl() + ENDPOINTS.getEnygmaTransactionsByBatchId(batchId), {
          params: this.buildPaginationParams(pagination)
        })
        .pipe(
          map((response: Paginated<EnygmaTransaction>) => {
            const transactions = (response.data || []).map((it) => ({
              ...it,
              batchId: batchId
            } as EnygmaTransaction));

            const total = response.total || DEFAULT_TOTAL;
            const limit = response.limit || DEFAULT_LIMIT;

            return {
              data: transactions,
              total,
              limit,
              page: response.page || DEFAULT_PAGE,
              totalPages: response.totalPages || (limit > 0 ? Math.ceil(total / limit) : DEFAULT_PAGE)
            };
          }),
          catchError(() => of({ data: [], total: DEFAULT_TOTAL, limit: DEFAULT_LIMIT, page: DEFAULT_PAGE, totalPages: DEFAULT_PAGE }))
        )
    );

    return response;
  }

  public async getBatchTransactionsByBatchId(
    batchId: string,
    pagination?: PaginationParams
  ): Promise<Paginated<BatchTransaction>> {
    await this.configService.loadBaseUrl();

    const response = await firstValueFrom<Paginated<BatchTransaction>>(
      this.httpClient.get<Paginated<BatchTransaction>>
        (this.configService.getBaseUrl() + ENDPOINTS.getBatchTransactionsByBatchId(batchId), {
          params: this.buildPaginationParams(pagination)
        })
        .pipe(
          catchError(() => of({ data: [], total: DEFAULT_TOTAL, limit: DEFAULT_LIMIT, page: DEFAULT_PAGE, totalPages: DEFAULT_PAGE }))
        )
    );

    return response;
  }
}
