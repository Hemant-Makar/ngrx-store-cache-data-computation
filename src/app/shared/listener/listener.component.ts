import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMonitorData } from '../../models/imonitor-data';
import { StoreDataService } from '../../ngrx-store/store-data.service';
declare const Plotly;
@Component({
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.css']
})
export class ListenerComponent implements OnInit {
  @Input()
  key: string;
  public cacheObservable$: Observable<
    IMonitorData[]
  > = this.storeService.getWidgetCacheData('A');
  public dataObservable$: Observable<IMonitorData>;
  public countObservable$: Observable<number>;

  public graph = {
    data: [
      {
        x: [],
        y: [],
        type: 'line',
        mode: 'lines'
      }
    ],
    layout: {
      width: 420,
      height: 240,
      xaxis: {
        range: [],
        // visible: false
        showticklabels: false
      },
      yaxis: {
        range: [0, 10]
      }
    },
    config: {
      displayModeBar: false
    }
  };

  constructor(private storeService: StoreDataService) {}

  ngOnInit() {
    this.countObservable$ = this.storeService.getCount();
    this.dataObservable$ = this.storeService.getWidgetData(this.key);
    this.cacheObservable$ = this.storeService.getWidgetCacheData(this.key);
    this.cacheObservable$.subscribe(widgetCache => {
      this.graph.data[0].x = widgetCache.map(cache => cache.time);
      this.graph.data[0].y = widgetCache.map(cache => cache.value);
      const maxRange = this.graph.data[0].x.pop();
      this.graph.data[0].x.push(maxRange);
      const minRange = maxRange - 60000;
      this.graph.layout.xaxis.range = [minRange, maxRange];
      Plotly.react(
        this.key,
        this.graph.data,
        this.graph.layout,
        this.graph.config
      );
      // Plotly.update(this.key);
    });
  }
}
