import { Component, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-copy-and-share',
  templateUrl: './copy-and-share.component.html',
  styleUrls: ['./copy-and-share.component.scss']
})
export class CopyAndShareComponent {
  @Input()
  public field: string;

  @Input()
  public value: string | number;

  @Input()
  public explorerUrl: string;

  @Input()
  public explorerName: string;

  public constructor(
    private notificationService: NotificationService
  ) {}

  public copiedToClipboardNotification(field: string) {
    this.notificationService.copiedToClipboardSuccessfully(field);
  }
}
