import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from './istate';
export const selectFeatureState = createFeatureSelector<IState>('liveData');

export const widgetFeature = createSelector(
  selectFeatureState,
  (state: IState) => {
    return state.data;
  }
);

export const getWidgetData = createSelector(
  selectFeatureState,
  (state: IState, id: string) => {
    return state.data[id];
  }
);

export const getWidgetCacheData = createSelector(
  selectFeatureState,
  (state: IState, id: string) => {
    return state.cache[id];
  }
);
export const getCount = createSelector(
  selectFeatureState,
  (state: IState) => {
    return state.count;
  }
);
