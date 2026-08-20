import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) { }

  public copiedToClipboardSuccessfully(field: string): void {
    this.notification
      .success(
        'Copied to Clipboard',
        `You have successfully copied the <span class="field">${field}</span> to the clipboard.`,
        {
          nzClass: 'nz-notification',
          nzPlacement: 'bottomRight',
        }
      );
  }
}
