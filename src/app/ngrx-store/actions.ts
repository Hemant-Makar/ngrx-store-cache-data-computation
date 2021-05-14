import { createAction, props } from '@ngrx/store';
import { IMonitorData } from '../models/imonitor-data';

export const addWidgetData = createAction(
  '[Data] add widget data',
  props<{ key: string; value: IMonitorData }>()
);
