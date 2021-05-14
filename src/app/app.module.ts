import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HomeComponent } from './home/home.component';
import { StoreDataService } from './ngrx-store/store-data.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from './ngrx-store/reducers';
import { ListenerComponent } from './shared/listener/listener.component';
import { GeneratorComponent } from './shared/generator/generator.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ liveData: reducer }),
    PlotlyModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    HomeComponent,
    ListenerComponent,
    GeneratorComponent
  ],
  bootstrap: [AppComponent],
  providers: [StoreDataService]
})
export class AppModule {}
