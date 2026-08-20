import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public BASE_URL: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) { }

  public getConfig() {
    return this.httpClient.get('assets/config.json');
  }

  public getBaseUrl() {
    return this.BASE_URL.value;
  }

  public async loadBaseUrl() {
    if (this.BASE_URL.value) return;

    const config: any = await firstValueFrom(this.getConfig());
    this.BASE_URL.next(config['RAYLS_API'] as string);
  }
}
