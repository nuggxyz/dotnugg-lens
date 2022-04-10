declare namespace NL.Redux.App {
    interface State {
        os: OS;
        dimensions: {
            height: number;
            width: number;
        };
        toasts: Toast[];
        modalIsOpen: Modals;
        modalData: ModalsData;
        apiKey: string;
        asepriteFiles: AsepriteFile[];
        artLocation: string;
        compiledItems: import('../ipcListeners').Item[];
        recents: { time: number; fileUri: string }[];
        mainProcessLoading: boolean;
        isZoomOn: boolean;
    }

    type AsepriteFile = {
        path: string;
        compiled: boolean;
        loading: boolean;
        layers?: Omit<AsepriteFile, 'layers'>[];
    };

    type OS = 'win32' | 'linux' | 'darwin';

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
        action?: (
            setClosed?: React.Dispatch<React.SetStateAction<boolean>>,
        ) => void;
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
