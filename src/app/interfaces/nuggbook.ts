import { PropsWithChildren, FC } from 'react';

export enum Page {
    Start,
    Welcome,
    Tldr_2,
    Tldr_1,
    Tldr_3,
    Tldr_4,
    Tldr_5,
    TableOfContents,
    WhatIsAWallet,
    WhatIsAnNFT,
    WhatIsDefi,
    Rundown_0,
    Rundown_1,
    Rundown_2,
    Rundown_3,
    Rundown_4,
    Rundown_5,
    Rundown_6,
    Rundown_7,
    Rundown_8,
    Rundown_9,
    Rundown_10,
    Setup_0,
    Setup_1,
    Setup_2,
    Setup_3,
    Status,
    HelpingTest_0,
    Feedback,
    Connect,
    AllNuggs,
    AllItems,
    Search,
}

export type NuggBookPageProps = {
    setPage: (page: Page, direction?: boolean) => void;
    close: () => void;
    clear: () => void;
};

export type NuggBookPage = FC<PropsWithChildren<NuggBookPageProps>>;
