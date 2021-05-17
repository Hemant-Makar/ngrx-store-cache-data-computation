import { Component, Input, OnInit } from '@angular/core';
import { IMonitorData } from '../../models/imonitor-data';
import { StoreDataService } from '../../ngrx-store/store-data.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  @Input()
  key: string;

  private intervalRef: number;
  constructor(private storeService: StoreDataService) {}

  ngOnInit() {}
  onStartClicked() {
    console.log('Start writting...');
    this.clear();
    if (this.intervalRef === undefined) {
      this.intervalRef = setInterval(() => {
        const time = Date.now();
        const widget: IMonitorData = {
          id: this.key,
          value: Math.random() * 10,
          time: time
        };
        this.storeService.setWidgetData(widget);
      }, 1000);
    }
  }
  onStopClicked() {
    console.log('Stop writting...');
    this.clear();
  }

  private clear() {
    if (this.intervalRef !== undefined) {
      clearInterval(this.intervalRef);
      this.intervalRef = undefined;
    }
  }
}
