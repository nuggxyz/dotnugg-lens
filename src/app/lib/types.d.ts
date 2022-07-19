type ApplyToChildren<T> = {
    [_ in string]: {
        [E in keyof T]: T[E];
    };
};

type ApplyFuncToChildren<T> = {
    [E in keyof T]: (fn?: (prev: T[E], cur: T[E]) => boolean) => T[E];
};

type AnyElementOf<T extends any[]> = T[number];

type ApplyDispatchToChildren<T> = {
    [E in keyof T]: AnyElementOf<Parameters<T[E]>> extends never
        ? () => import('react').Dispatch<T[E]>
        : (
              payload:
                  | AnyElementOf<Parameters<T[E]>>
                  | NL.Redux.LocalStoragePayload<AnyElementOf<Parameters<T[E]>>>,
          ) => import('react').Dispatch<T[E]>;
};

type NLStyleSheet = ApplyToChildren<React.CSSProperties>;

type Dictionary<T> = {
    [_: string]: T;
};

type RecursiveRequired<T> = { [K in keyof T]: Required<T[K]> };
