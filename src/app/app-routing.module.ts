import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MessageDetailsComponent } from './components/message-details/message-details.component';
import { PageNotFoundComponent } from './utils/components/page-not-found/page-not-found.component';
import { BatchDetailsComponent } from './components/batch-details/batch-details.component';
import { EnygmaDetailsComponent } from './components/enygma-details/enygma-details.component';
import { DvpSwapDetailsComponent } from './components/dvp-swap-details/dvp-swap-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: 'message/:id', component: MessageDetailsComponent },
  { path: 'message/:id/:index', component: MessageDetailsComponent },
  { path: 'batch/:id', component: BatchDetailsComponent },
  { path: 'enygma/:id', component: EnygmaDetailsComponent },
  { path: 'dvpSwap/:id', component: DvpSwapDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
