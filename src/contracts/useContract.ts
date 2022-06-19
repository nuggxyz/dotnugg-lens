import { useMemo } from 'react';
import { BaseContract, ContractInterface } from '@ethersproject/contracts';
import { InfuraProvider } from '@ethersproject/providers';

import web3 from '@src/web3';
import {
    DotnuggV1,
    DotnuggV1__factory,
    XNuggftV1,
    XNuggftV1__factory,
    NuggftV1,
    NuggftV1__factory,
} from '@src/typechain';

function useContract<C extends BaseContract>(
    address: string,
    abi: ContractInterface,
    provider?: InfuraProvider,
) {
    return useMemo(() => {
        return new BaseContract(address, abi, provider) as C;
    }, [address, provider, abi]);
}

export function useNuggftV1(provider?: InfuraProvider) {
    return useContract<NuggftV1>(
        web3.constants.DEFAULT_CONTRACTS.NuggftV1,
        NuggftV1__factory.abi,
        provider,
    );
}

export function useXNuggftV1(provider?: InfuraProvider) {
    return useContract<XNuggftV1>(
        web3.constants.DEFAULT_CONTRACTS.xNuggftV1,
        XNuggftV1__factory.abi,
        provider,
    );
}

export function useDotnuggV1(provider?: InfuraProvider) {
    return useContract<DotnuggV1>(
        web3.constants.DEFAULT_CONTRACTS.DotnuggV1,
        DotnuggV1__factory.abi,
        provider,
    );
}
