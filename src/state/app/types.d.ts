declare namespace NL.Redux.App {
    interface State {
        dimensions: {
            height: number;
            width: number;
        };
        toasts: Toast[];
        modalIsOpen: Modals;
        modalData: ModalsData;
        apiKey: string;
        artLocation: string;
        compiledItems: any[];
    }

    interface Toast {
        title: string;
        message:
            | NLAccountError
            | NLAccountSuccess
            | NLEpochError
            | NLEpochSuccess
            | NLSwapError
            | NLSwapSuccess
            | NLxNUGGError
            | NLxNUGGSuccess
            | NLTransactionError
            | NLTransactionSuccess
            | string;
        error: boolean;
        duration: number;
        index: number;
        id: string;
        loading: boolean;
        action?: () => void;
        callback?: () => void;
    }

    type Views = 'Swap' | 'Search';

    type MobileViews = 'Mint' | 'Search' | 'Wallet';

    type Modals = '';

    type ModalsData = {
        backgroundStyle?: import('react').CSSProperties;
        containerStyle?: import('react').CSSProperties;
        targetId?: string;
        type?: Modals;
    };

    type Error = 'ERROR';
}
