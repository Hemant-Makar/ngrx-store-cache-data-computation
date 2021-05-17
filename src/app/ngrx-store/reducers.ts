import { IMonitorData } from '../models/imonitor-data';
import { IState } from './istate';
import { Action, createReducer, on } from '@ngrx/store';
import { addWidgetData } from './actions';

export const widgetDataFeatureKey = 'monitorData';

export interface QueryParam {
  key: string;
  value: IMonitorData;
}

export const initialState: IState = {
  data: {},
  cache: {},
  count: 0
};

const liveDataReducer = createReducer(
  initialState,
  on(addWidgetData, (state, param: QueryParam) => {
    const count = state.count + 1;
    const data = { ...state.data, [param.key]: param.value };

    var paramCache: Array<IMonitorData> = [];
    Object.assign(paramCache, state.cache[param.key]);

    paramCache.push(param.value);
    paramCache = removeOutdatedData(paramCache);
    console.log('cache length ', paramCache.length);
    const cache = { ...state.cache, [param.key]: paramCache };
    return {
      ...state,
      count: count,
      data: data,
      cache: cache
    };
  })
);

const removeOutdatedData = (
  records: Array<IMonitorData>,
  duration: number = 120000
): Array<IMonitorData> => {
  const lastRecord = records[records.length - 1];
  if (lastRecord !== undefined) {
    const firstTime = lastRecord.time - duration;
    const matchedIndex = records.findIndex(record => {
      return record.time >= firstTime;
    });
    if (matchedIndex !== -1) {
      return records.slice(matchedIndex);
    }
  }
  return records;
};

export function reducer(state: IState | undefined, action: Action) {
  return liveDataReducer(state, action);
}
