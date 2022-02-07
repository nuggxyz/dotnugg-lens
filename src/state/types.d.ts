declare namespace NL.Redux {
    type RootState = import('./store').NLRootState;

    type Reducer = import('@reduxjs/toolkit').Reducer<
        import('@reduxjs/toolkit').Action,
        any
    >;

    type Actions = import('@reduxjs/toolkit').CaseReducerActions<
        import('@reduxjs/toolkit').SliceCaseReducers<any>
    >;

    type Middleware<A, B, C> = import('@reduxjs/toolkit').Middleware<A, B, C>;

    type Middlewares = Dictionary<
        Middleware<{}, RootState, import('@reduxjs/toolkit').Dispatch<any>>
    >;

    type Dispatch<A> = import('@reduxjs/toolkit').Dispatch<A>;

    type Updater = import('react').FC;
    type Hook = (any) => any;
    type Hooks = Hook[];

    type Thactions = Dictionary<
        import('@reduxjs/toolkit').AsyncThunk<any, any, any>
    >;

    type LocalStoragePayload<T> = {
        _localStorageValue?: T;
        _localStorageTarget: string;
        _localStorageExpectedType?: 'array' | 'object' | 'unique';
    };
}
