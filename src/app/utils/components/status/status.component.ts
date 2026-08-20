import { Component, Input } from '@angular/core';
import { AtomicTeleportStatus, DvpSwapStatus } from 'src/app/models/transaction';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input()
  public status: string;

  @Input()
  public tooltip?: string;

  @Input()
  public size: 'small' | 'big' = 'big';

  public get AtomicStatus() {
    return AtomicTeleportStatus;
  }

  public get DvpStatus() {
    return DvpSwapStatus;
  }
}
