import state from './index';

export default store => next => action => {
    const result = next(action);

    state.save( store.getState() );

    return result;
};