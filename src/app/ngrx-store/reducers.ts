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

    const cache = { ...state.cache, [param.key]: paramCache };
    return {
      ...state,
      count: count,
      data: data,
      cache: cache
    };
  })
);

export function reducer(state: IState | undefined, action: Action) {
  return liveDataReducer(state, action);
}
