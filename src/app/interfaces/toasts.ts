export interface ToastType {
    title: string;
    message: string;
    error: boolean;
    duration: number;
    index: number;
    id: string;
    loading: boolean;
    action?: (setClosed?: React.Dispatch<React.SetStateAction<boolean>>) => void;
    callback?: () => void;
    listener?: (
        setClosed: () => void,
        setClosedSoftly: () => void,
        setError: () => void,
    ) => () => void;
}
