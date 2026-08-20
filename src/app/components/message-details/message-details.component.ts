import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatTransaction, MessageType, ProtocolType, TransactionMessageType } from 'src/app/models/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ZERO_ADDRESS, ZERO_HASH } from 'src/app/utils/constants';
import { HelpersService } from 'src/app/utils/helpers.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {
  public transactionId?: string;

  public transaction: FlatTransaction;

  public showTokenInformationDescription: boolean = false;

  // Holds the originating Enygma batchId when navigated from Enygma Details
  public enygmaBatchId?: string;


  @ViewChild('description')
  public descriptionRef: ElementRef<HTMLDivElement>;

  public get MessageType() {
    return TransactionMessageType;
  }

  public get ProtocolType() {
    return ProtocolType;
  }

  public getDate(date: string) {
    return this.helpersService.getFormattedDate(date);
  }

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionsService: TransactionsService,
    private helpersService: HelpersService
  ) { }

  public async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.transactionId = id ?? undefined;

    const index = this.route.snapshot.paramMap.get('index');

    // Read optional batchId from query params to restore state
    const qpBatchId = this.route.snapshot.queryParamMap.get('batchId') || undefined;
    if (qpBatchId) this.enygmaBatchId = qpBatchId;

    // Read idType from query params to determine which endpoint to use
    // idType can be 'message_id' or 'aggregation_key'
    const idType = this.route.snapshot.queryParamMap.get('idType') || 'message_id';

    if (this.transactionId) {
      // Call the appropriate endpoint based on idType
      const { data: transaction, error } = await this.transactionsService.getTransactionById(this.transactionId, idType);

      if (error || !transaction) {
        this.goToErrorPage();
        return;
      }

      this.transaction = transaction;

      const isBatchTransaction = this.isBatchTransaction();
      const isIndexDefined = index !== undefined && index !== null;

      if (isBatchTransaction && !isIndexDefined) {
        this.goToBatchDetailsPage();
        return;
      }

      const isEnygmaTransaction = this.isEnygmaTransaction();

      if (isEnygmaTransaction && !isIndexDefined) {
        this.goToEnygmaDetailsPage(this.enygmaBatchId || this.transaction.messageId);
        return;
      }
    }
  }

  public getProtocolField() {
    return this.transaction.protocol;
  }

  public openTokenInformationDescription() {
    this.showTokenInformationDescription = !this.showTokenInformationDescription;

    setTimeout(() => this.descriptionRef.nativeElement.scrollIntoView({ behavior: 'smooth' }), 100);
  }

  public getTokenMetadataDescriptionTraits() {
    try {
      const traits = JSON.parse(this.transaction.tokenMetadataDescription ?? '[]');
      if (!Array.isArray(traits)) return [];
      return traits.map((trait: any) => ({
        type: trait.trait_type,
        value: trait.value
      }));
    } catch {
      return [];
    }
  }

  public goToErrorPage() {
    this.router.navigate(['404']);
  }

  public goToBatchDetailsPage() {
    this.router.navigate([`/batch/${this.transaction.messageId}`]);
  }

  public goToEnygmaDetailsPage(batchId?: string) {
    const id = batchId || this.enygmaBatchId || this.transaction.messageId;
    this.router.navigate([`/enygma/${id}`]);
  }

  public showDestinationTimestamp() {
    return !this.isEnygmaTransaction() &&
      this.transaction.destinationTimestamp &&
      this.transaction.destinationTimestamp != "0";
  }

  public showAddress(address: string) {
    return address && address !== ZERO_ADDRESS && address !== ZERO_HASH;
  }

  public isBatchTransaction() {
    return this.transaction && this.transaction.type === MessageType.regular_batch;
  }

  public isEnygmaTransaction() {
    return this.transaction?.messageType === TransactionMessageType.enygma && this.transaction?.type === MessageType.enygma_batch;
  }

  public isCustom(messageType: string) {
    return messageType === this.MessageType.custom;
  }
}
