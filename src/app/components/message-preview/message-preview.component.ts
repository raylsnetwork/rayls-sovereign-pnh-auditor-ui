import { Component, Input } from '@angular/core';
import { MergedTransaction } from 'src/app/models/transaction';
import { HelpersService } from 'src/app/utils/helpers.service';

@Component({
  selector: 'app-message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.scss']
})
export class MessagePreviewComponent {
  @Input()
  public transaction: MergedTransaction;

  public get getPreview() {
    return this.helpersService.getPreview;
  }
  
  public getDate(date: string) {
    return this.helpersService.getDate(date).fromNow();
  }

  public get getProtocol() {
    return this.helpersService.getProtocol;
  }

  public constructor(
    private helpersService: HelpersService
  ) {}
}
