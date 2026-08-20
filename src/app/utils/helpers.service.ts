import { Injectable } from '@angular/core';
import { ProtocolType } from '../models/transaction';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  constructor() { }

  public getPreview(field: string) {
    if (!field || field.length < 8) return field || "";

    return field.slice(0, 5) + "..." + field.slice(-3);
  }

  public getProtocol(type: string) {
    switch (type) {
      case ProtocolType.custom:
        return 'Custom';
      case ProtocolType.vanilla:
        return 'Standard';
      case ProtocolType.atomic:
        return 'Atomic';
      case ProtocolType.enygma:
        return 'Enygma';
      case ProtocolType.dvp_deposit:
        return 'DvP Deposit';
      case ProtocolType.dvp_withdraw:
        return 'DvP Withdraw';
      case ProtocolType.dvp_swap:
        return 'DvP Swap';
      default:
        return 'Unknown';
    }
  }

  public getDate(date: string) {
    const dateIsNumeric = !isNaN(date as unknown as number);

    if (dateIsNumeric) {
      const dateNumber = this.convertDateNumberToMilliseconds(parseInt(date));

      return moment(dateNumber);
    }

    return moment(date);
  }

  public getFormattedDate(date: string, format?: string) {
    return this.getDate(date).format(format ?? 'MMMM Do YYYY, HH:mm:ss');
  }

  public convertDateNumberToMilliseconds(date: number) {
    const absoluteDifferenceInSeconds = Math.abs(Date.now() - date);
    const absoluteDifferenceInMilliseconds = Math.abs(Date.now() - date * 1000);

    if (absoluteDifferenceInSeconds < absoluteDifferenceInMilliseconds) {
      return date;
    }

    return date * 1000;
  }

  public generateRandomWidths(rows: number, columns: number): { [index: number]: string } {
    const min = 25;
    const max = 85;
    const widths: { [index: number]: string } = {};

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        widths[columns * i + j] = `${Math.random() * (max - min) + min}%`;
      }
    }

    return widths;
  }
}
