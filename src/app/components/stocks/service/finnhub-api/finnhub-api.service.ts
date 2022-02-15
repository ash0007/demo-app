import { Injectable } from '@angular/core';
import * as finnhub from 'finnhub';

@Injectable({
  providedIn: 'root'
})
export class FinnhubApiService {

  private _api_key: any;
  private finnhubClient: any;

  constructor() {
    this._api_key = "FH18MFFK6GR1VQ1B"; /// Alpha vantage key
    this._api_key = finnhub.ApiClient.instance.authentication['c7q4jmiad3i9it65vql0'];
    this._api_key.apiKey = "<API_KEY>"
    this.finnhubClient = new finnhub.DefaultApi();
  }
}
