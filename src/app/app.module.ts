import { NgModule } from '@angular/core';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageDetailsComponent } from './components/message-details/message-details.component';
import { PageComponent } from './utils/components/page/page.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NzNotificationModule, NzNotificationServiceModule } from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CopyAndShareComponent } from './utils/components/copy-and-share/copy-and-share.component';
import { PageNotFoundComponent } from './utils/components/page-not-found/page-not-found.component';
import { ButtonComponent } from './utils/components/button/button.component';
import { StatusComponent } from './utils/components/status/status.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonLoadingComponent } from './utils/components/skeleton-loading/skeleton-loading.component';
import { BatchTransactionPreviewComponent } from './components/batch-transaction-preview/batch-transaction-preview.component';
import { MessagePreviewComponent } from './components/message-preview/message-preview.component';
import { MessagesPreviewComponent } from './components/messages-preview/messages-preview.component';
import { BatchDetailsComponent } from './components/batch-details/batch-details.component';
import { BatchTransactionsPreviewComponent } from './components/batch-transactions-preview/batch-transactions-preview.component';
import { SelectComponent } from './utils/components/select/select.component';
import { EnygmaDetailsComponent } from './components/enygma-details/enygma-details.component';
import { EnygmaTransactionsPreviewComponent } from './components/enygma-transactions-preview/enygma-transactions-preview.component';
import { EnygmaTransactionPreviewComponent } from './components/enygma-transaction-preview/enygma-transaction-preview.component';
import { DvpSwapDetailsComponent } from './components/dvp-swap-details/dvp-swap-details.component';
import { DvpSwapTransactionsPreviewComponent } from './components/dvp-swap-transactions-preview/dvp-swap-transactions-preview.component';
import { DvpSwapTransactionPreviewComponent } from './components/dvp-swap-transaction-preview/dvp-swap-transaction-preview.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MessageDetailsComponent,
    PageComponent,
    CopyAndShareComponent,
    PageNotFoundComponent,
    ButtonComponent,
    StatusComponent,
    SkeletonLoadingComponent,
    BatchTransactionPreviewComponent,
    MessagePreviewComponent,
    MessagesPreviewComponent,
    BatchDetailsComponent,
    BatchTransactionsPreviewComponent,
    SelectComponent,
    EnygmaDetailsComponent,
    EnygmaTransactionsPreviewComponent,
    EnygmaTransactionPreviewComponent,
    DvpSwapDetailsComponent,
    DvpSwapTransactionsPreviewComponent,
    DvpSwapTransactionPreviewComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    NzNotificationServiceModule,
    NzToolTipModule,
    NgxSkeletonLoaderModule.forRoot(),
    NzBreadCrumbModule,
    NzTagModule,
    NzCheckboxModule,
    NzSwitchModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
