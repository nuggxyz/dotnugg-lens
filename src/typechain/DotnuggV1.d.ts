/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
    ethers,
    EventFilter,
    Signer,
    BigNumber,
    BigNumberish,
    PopulatedTransaction,
    BaseContract,
    ContractTransaction,
    Overrides,
    CallOverrides,
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import type { TypedEventFilter, TypedEvent, TypedListener } from './common';

interface DotnuggV1Interface extends ethers.utils.Interface {
    functions: {
        'chunk(address,uint256,address,bool,bool,bool,bool,bytes,uint8,uint8)': FunctionFragment;
        'comp(address,uint256,address,bytes)': FunctionFragment;
        'dat(address,uint256,address,string,string,bool,bytes)': FunctionFragment;
        'img(address,uint256,address,bool,bool,bool,bool,bytes)': FunctionFragment;
        'lib()': FunctionFragment;
        'proc(address,uint256,address,bytes)': FunctionFragment;
        'proxyOf(address)': FunctionFragment;
        'raw(address,uint256,address,bytes)': FunctionFragment;
        'register()': FunctionFragment;
        'sim(uint256[][])': FunctionFragment;
        'template()': FunctionFragment;
    };

    encodeFunctionData(
        functionFragment: 'chunk',
        values: [string, BigNumberish, string, boolean, boolean, boolean, boolean, BytesLike, BigNumberish, BigNumberish],
    ): string;
    encodeFunctionData(functionFragment: 'comp', values: [string, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: 'dat', values: [string, BigNumberish, string, string, string, boolean, BytesLike]): string;
    encodeFunctionData(
        functionFragment: 'img',
        values: [string, BigNumberish, string, boolean, boolean, boolean, boolean, BytesLike],
    ): string;
    encodeFunctionData(functionFragment: 'lib', values?: undefined): string;
    encodeFunctionData(functionFragment: 'proc', values: [string, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: 'proxyOf', values: [string]): string;
    encodeFunctionData(functionFragment: 'raw', values: [string, BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: 'register', values?: undefined): string;
    encodeFunctionData(functionFragment: 'sim', values: [BigNumberish[][]]): string;
    encodeFunctionData(functionFragment: 'template', values?: undefined): string;

    decodeFunctionResult(functionFragment: 'chunk', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'comp', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'dat', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'img', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'lib', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'proc', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'proxyOf', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'raw', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'register', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'sim', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'template', data: BytesLike): Result;

    events: {};
}

export class DotnuggV1 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;

    listeners<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>,
    ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
    off<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>,
    ): this;
    on<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>,
    ): this;
    once<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>,
    ): this;
    removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>,
    ): this;
    removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    ): this;

    listeners(eventName?: string): Array<Listener>;
    off(eventName: string, listener: Listener): this;
    on(eventName: string, listener: Listener): this;
    once(eventName: string, listener: Listener): this;
    removeListener(eventName: string, listener: Listener): this;
    removeAllListeners(eventName?: string): this;

    queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
        event: TypedEventFilter<EventArgsArray, EventArgsObject>,
        fromBlockOrBlockhash?: string | number | undefined,
        toBlock?: string | number | undefined,
    ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

    interface: DotnuggV1Interface;

    functions: {
        chunk(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            rekt: boolean,
            back: boolean,
            stats: boolean,
            base64: boolean,
            data: BytesLike,
            chunks: BigNumberish,
            index: BigNumberish,
            overrides?: CallOverrides,
        ): Promise<[string] & { res: string }>;

        comp(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<
            [[BigNumber[], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]]] & {
                res: [BigNumber[], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]];
            }
        >;

        dat(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            name: string,
            desc: string,
            base64: boolean,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<[string] & { res: string }>;

        img(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            rekt: boolean,
            back: boolean,
            stats: boolean,
            base64: boolean,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<[string] & { res: string }>;

        lib(overrides?: CallOverrides): Promise<[string]>;

        proc(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<
            [[BigNumber[], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]]] & {
                res: [BigNumber[], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]];
            }
        >;

        proxyOf(implementer: string, overrides?: CallOverrides): Promise<[string] & { proxy: string }>;

        raw(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<
            [[BigNumber[][], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]]] & {
                res: [BigNumber[][], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]];
            }
        >;

        register(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

        sim(files: BigNumberish[][], overrides?: CallOverrides): Promise<[string] & { res: string }>;

        template(overrides?: CallOverrides): Promise<[string]>;
    };

    chunk(
        implementer: string,
        artifactId: BigNumberish,
        resolver: string,
        rekt: boolean,
        back: boolean,
        stats: boolean,
        base64: boolean,
        data: BytesLike,
        chunks: BigNumberish,
        index: BigNumberish,
        overrides?: CallOverrides,
    ): Promise<string>;

    comp(
        implementer: string,
        artifactId: BigNumberish,
        resolver: string,
        data: BytesLike,
        overrides?: CallOverrides,
    ): Promise<[BigNumber[], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]]>;

    dat(
        implementer: string,
        artifactId: BigNumberish,
        resolver: string,
        name: string,
        desc: string,
        base64: boolean,
        data: BytesLike,
        overrides?: CallOverrides,
    ): Promise<string>;

    img(
        implementer: string,
        artifactId: BigNumberish,
        resolver: string,
        rekt: boolean,
        back: boolean,
        stats: boolean,
        base64: boolean,
        data: BytesLike,
        overrides?: CallOverrides,
    ): Promise<string>;

    lib(overrides?: CallOverrides): Promise<string>;

    proc(
        implementer: string,
        artifactId: BigNumberish,
        resolver: string,
        data: BytesLike,
        overrides?: CallOverrides,
    ): Promise<[BigNumber[], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]]>;

    proxyOf(implementer: string, overrides?: CallOverrides): Promise<string>;

    raw(
        implementer: string,
        artifactId: BigNumberish,
        resolver: string,
        data: BytesLike,
        overrides?: CallOverrides,
    ): Promise<[BigNumber[][], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]]>;

    register(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    sim(files: BigNumberish[][], overrides?: CallOverrides): Promise<string>;

    template(overrides?: CallOverrides): Promise<string>;

    callStatic: {
        chunk(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            rekt: boolean,
            back: boolean,
            stats: boolean,
            base64: boolean,
            data: BytesLike,
            chunks: BigNumberish,
            index: BigNumberish,
            overrides?: CallOverrides,
        ): Promise<string>;

        comp(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<[BigNumber[], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]]>;

        dat(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            name: string,
            desc: string,
            base64: boolean,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<string>;

        img(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            rekt: boolean,
            back: boolean,
            stats: boolean,
            base64: boolean,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<string>;

        lib(overrides?: CallOverrides): Promise<string>;

        proc(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<[BigNumber[], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]]>;

        proxyOf(implementer: string, overrides?: CallOverrides): Promise<string>;

        raw(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<[BigNumber[][], [number[], number[], number[], BigNumber, string, BigNumber, string[], string[], string, string]]>;

        register(overrides?: CallOverrides): Promise<string>;

        sim(files: BigNumberish[][], overrides?: CallOverrides): Promise<string>;

        template(overrides?: CallOverrides): Promise<string>;
    };

    filters: {};

    estimateGas: {
        chunk(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            rekt: boolean,
            back: boolean,
            stats: boolean,
            base64: boolean,
            data: BytesLike,
            chunks: BigNumberish,
            index: BigNumberish,
            overrides?: CallOverrides,
        ): Promise<BigNumber>;

        comp(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<BigNumber>;

        dat(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            name: string,
            desc: string,
            base64: boolean,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<BigNumber>;

        img(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            rekt: boolean,
            back: boolean,
            stats: boolean,
            base64: boolean,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<BigNumber>;

        lib(overrides?: CallOverrides): Promise<BigNumber>;

        proc(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<BigNumber>;

        proxyOf(implementer: string, overrides?: CallOverrides): Promise<BigNumber>;

        raw(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<BigNumber>;

        register(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

        sim(files: BigNumberish[][], overrides?: CallOverrides): Promise<BigNumber>;

        template(overrides?: CallOverrides): Promise<BigNumber>;
    };

    populateTransaction: {
        chunk(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            rekt: boolean,
            back: boolean,
            stats: boolean,
            base64: boolean,
            data: BytesLike,
            chunks: BigNumberish,
            index: BigNumberish,
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        comp(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        dat(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            name: string,
            desc: string,
            base64: boolean,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        img(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            rekt: boolean,
            back: boolean,
            stats: boolean,
            base64: boolean,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        lib(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        proc(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        proxyOf(implementer: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

        raw(
            implementer: string,
            artifactId: BigNumberish,
            resolver: string,
            data: BytesLike,
            overrides?: CallOverrides,
        ): Promise<PopulatedTransaction>;

        register(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

        sim(files: BigNumberish[][], overrides?: CallOverrides): Promise<PopulatedTransaction>;

        template(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
