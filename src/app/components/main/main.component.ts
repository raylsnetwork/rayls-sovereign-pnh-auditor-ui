import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MergedTransaction, Paginated } from 'src/app/models/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { HelpersService } from 'src/app/utils/helpers.service';
import { SelectOption } from 'src/app/utils/types';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public isFocused: boolean = false;

  public onFocus = () => { this.isFocused = true };

  public onBlur = () => { this.isFocused = false };

  public form: FormGroup;

  public transactions?: Paginated<MergedTransaction>;

  public filterOptions: SelectOption[];

  public defaultFilterOption: SelectOption;

  public filter: string;

  public filters: { [filter: string]: string } = {};

  public search: string;

  public page: string = "1";

  public get getPreview() {
    return this.helpersService.getPreview;
  }

  public constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private helpersService: HelpersService
  ) {
    this.initOptions();
  }

  public async ngOnInit() {
    this.form = this.formBuilder.group({
      search: ['', Validators.required]
    });

    this.route.queryParams.subscribe(async (params: any) => {
      if (params.page) this.page = params.page;

      this.transactions = undefined;

      await this.getTransactions();
    });

    this.subscribeToValueChanges();
  }

  public subscribeToValueChanges() {
    this.form.controls['search'].valueChanges.subscribe((search: string) => {

      this.search = search;
    });
  }

  public async getTransactions() {
    if (this.page) {
      this.filters["page"] = this.page;
    }

    this.transactions = await this.transactionsService.getRecentTransactions(this.filters);
  }

  public initOptions() {
    this.filterOptions = [
      {
        viewValue: "Source ChainId",
        value: "sourceChainId"
      },
      {
        viewValue: "Source Address",
        value: "fromAddress"
      },
      {
        viewValue: "Destination ChainId",
        value: "destinationChainId"
      },
      {
        viewValue: "Destination Address",
        value: "toAddress"
      },
      {
        viewValue: "ResourceId",
        value: "resourceId"
      },
    ];

    this.defaultFilterOption = {
      viewValue: "MessageId",
      value: "messageId",
    };

    this.onFilterChange(this.defaultFilterOption.value);
  }

  public onFilterChange(filter: string | number) {
    this.filter = String(filter);
  }

  public onSubmit() {
    this.addFilter();
  }

  public async addFilter() {
    this.transactions = undefined;

    this.filters[this.filter] = this.search;

    await this.getTransactions();

    this.form.controls['search'].setValue('');
  }

  public getTags() {
    return Object.keys(this.filters);
  }

  public async handleFilterClose(filter: string) {
    delete this.filters[filter];

    await this.getTransactions();
  }

  public isNotPageFilter(tag: string) {
    return tag !== "page";
  }
}
