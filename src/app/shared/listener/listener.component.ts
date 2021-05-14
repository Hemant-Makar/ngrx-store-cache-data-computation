import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMonitorData } from '../../models/imonitor-data';
import { StoreDataService } from '../../ngrx-store/store-data.service';

@Component({
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.css']
})
export class ListenerComponent implements OnInit {
  @Input()
  key: string;

  public cacheObservable$: Observable<IMonitorData[]>;
  public dataObservable$: Observable<IMonitorData>;
  public countObservable$: Observable<number>;

  constructor(private storeService: StoreDataService) {}

  ngOnInit() {
    this.countObservable$ = this.storeService.getCount();
    this.dataObservable$ = this.storeService.getWidgetData(this.key);
    this.cacheObservable$ = this.storeService.getWidgetCacheData(this.key);
  }
}
