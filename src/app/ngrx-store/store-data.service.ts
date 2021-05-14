import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMonitorData } from '../models/imonitor-data';
import { addWidgetData } from './actions';
import { IState } from './istate';
import * as fromStore from './selectors';
@Injectable()
export class StoreDataService {
  constructor(private store: Store<IState>) {}

  public getCount(): Observable<number> {
    return this.store.select(fromStore.getCount);
  }

  public getWidgetData(dataTag: string): Observable<IMonitorData> {
    return this.store.select(fromStore.getWidgetData, dataTag);
  }
  public getWidgetCacheData(dataTag: string): Observable<IMonitorData[]> {
    return this.store.select(fromStore.getWidgetCacheData, dataTag);
  }
  public setWidgetData(data: IMonitorData) {
    this.store.dispatch(addWidgetData({ key: data.id, value: data }));
  }
}
