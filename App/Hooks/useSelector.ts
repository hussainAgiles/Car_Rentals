import { TypedUseSelectorHook, useSelector as defaultUseSelector } from 'react-redux';
import { RootState } from '../Redux/Store';

const useAppSelector: TypedUseSelectorHook<RootState> = defaultUseSelector;

export default useAppSelector;
