/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface DotnuggV1Interface extends utils.Interface {
  contractName: "DotnuggV1";
  functions: {
    "calc(uint256[][])": FunctionFragment;
    "combo(uint256[][],bool)": FunctionFragment;
    "encodeJsonAsBase64(bytes)": FunctionFragment;
    "encodeJsonAsUtf8(bytes)": FunctionFragment;
    "encodeSvgAsBase64(bytes)": FunctionFragment;
    "encodeSvgAsUtf8(bytes)": FunctionFragment;
    "exec(uint8,uint8,bool)": FunctionFragment;
    "execute(uint256[][])": FunctionFragment;
    "factory()": FunctionFragment;
    "init(bytes[])": FunctionFragment;
    "lengthOf(uint8)": FunctionFragment;
    "locationOf(uint8)": FunctionFragment;
    "props(uint8[8],string[8])": FunctionFragment;
    "randOf(uint8,uint256)": FunctionFragment;
    "read(uint8,uint8)": FunctionFragment;
    "register(bytes[])": FunctionFragment;
    "svg(uint256[],bool)": FunctionFragment;
    "write(bytes[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calc",
    values: [BigNumberish[][]]
  ): string;
  encodeFunctionData(
    functionFragment: "combo",
    values: [BigNumberish[][], boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeJsonAsBase64",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeJsonAsUtf8",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeSvgAsBase64",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeSvgAsUtf8",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "exec",
    values: [BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [BigNumberish[][]]
  ): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(functionFragment: "init", values: [BytesLike[]]): string;
  encodeFunctionData(
    functionFragment: "lengthOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "locationOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "props",
    values: [BigNumberish[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "randOf",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "read",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "register",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "svg",
    values: [BigNumberish[], boolean]
  ): string;
  encodeFunctionData(functionFragment: "write", values: [BytesLike[]]): string;

  decodeFunctionResult(functionFragment: "calc", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "combo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "encodeJsonAsBase64",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeJsonAsUtf8",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeSvgAsBase64",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeSvgAsUtf8",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exec", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lengthOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "locationOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "props", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "randOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "read", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "svg", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "write", data: BytesLike): Result;

  events: {
    "Write(uint8,uint8,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Write"): EventFragment;
}

export type WriteEvent = TypedEvent<
  [number, number, string],
  { feature: number; amount: number; sender: string }
>;

export type WriteEventFilter = TypedEventFilter<WriteEvent>;

export interface DotnuggV1 extends BaseContract {
  contractName: "DotnuggV1";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DotnuggV1Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    calc(
      reads: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    combo(
      reads: BigNumberish[][],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<[string]>;

    encodeJsonAsBase64(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { res: string }>;

    encodeJsonAsUtf8(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { res: string }>;

    encodeSvgAsBase64(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { res: string }>;

    encodeSvgAsUtf8(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { res: string }>;

    "exec(uint8,uint8,bool)"(
      feature: BigNumberish,
      pos: BigNumberish,
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "exec(uint8[8],bool)"(
      ids: BigNumberish[],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<[string]>;

    execute(
      files: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { res: BigNumber[] }>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    init(
      input: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    lengthOf(
      feature: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number] & { a: number }>;

    locationOf(
      feature: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { res: string }>;

    props(
      ids: BigNumberish[],
      labels: string[],
      overrides?: CallOverrides
    ): Promise<[string]>;

    randOf(
      feature: BigNumberish,
      seed: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number] & { a: number }>;

    "read(uint8,uint8)"(
      feature: BigNumberish,
      num: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { _read: BigNumber[] }>;

    "read(uint8[8])"(
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[][]] & { _reads: BigNumber[][] }>;

    register(
      input: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    svg(
      calculated: BigNumberish[],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<[string] & { res: string }>;

    write(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  calc(
    reads: BigNumberish[][],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  combo(
    reads: BigNumberish[][],
    base64: boolean,
    overrides?: CallOverrides
  ): Promise<string>;

  encodeJsonAsBase64(
    input: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  encodeJsonAsUtf8(
    input: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  encodeSvgAsBase64(
    input: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  encodeSvgAsUtf8(input: BytesLike, overrides?: CallOverrides): Promise<string>;

  "exec(uint8,uint8,bool)"(
    feature: BigNumberish,
    pos: BigNumberish,
    base64: boolean,
    overrides?: CallOverrides
  ): Promise<string>;

  "exec(uint8[8],bool)"(
    ids: BigNumberish[],
    base64: boolean,
    overrides?: CallOverrides
  ): Promise<string>;

  execute(
    files: BigNumberish[][],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  factory(overrides?: CallOverrides): Promise<string>;

  init(
    input: BytesLike[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  lengthOf(feature: BigNumberish, overrides?: CallOverrides): Promise<number>;

  locationOf(feature: BigNumberish, overrides?: CallOverrides): Promise<string>;

  props(
    ids: BigNumberish[],
    labels: string[],
    overrides?: CallOverrides
  ): Promise<string>;

  randOf(
    feature: BigNumberish,
    seed: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  "read(uint8,uint8)"(
    feature: BigNumberish,
    num: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "read(uint8[8])"(
    ids: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[][]>;

  register(
    input: BytesLike[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  svg(
    calculated: BigNumberish[],
    base64: boolean,
    overrides?: CallOverrides
  ): Promise<string>;

  write(
    data: BytesLike[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    calc(
      reads: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    combo(
      reads: BigNumberish[][],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<string>;

    encodeJsonAsBase64(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    encodeJsonAsUtf8(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    encodeSvgAsBase64(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    encodeSvgAsUtf8(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "exec(uint8,uint8,bool)"(
      feature: BigNumberish,
      pos: BigNumberish,
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<string>;

    "exec(uint8[8],bool)"(
      ids: BigNumberish[],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<string>;

    execute(
      files: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    factory(overrides?: CallOverrides): Promise<string>;

    init(input: BytesLike[], overrides?: CallOverrides): Promise<void>;

    lengthOf(feature: BigNumberish, overrides?: CallOverrides): Promise<number>;

    locationOf(
      feature: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    props(
      ids: BigNumberish[],
      labels: string[],
      overrides?: CallOverrides
    ): Promise<string>;

    randOf(
      feature: BigNumberish,
      seed: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    "read(uint8,uint8)"(
      feature: BigNumberish,
      num: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "read(uint8[8])"(
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[][]>;

    register(input: BytesLike[], overrides?: CallOverrides): Promise<string>;

    svg(
      calculated: BigNumberish[],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<string>;

    write(data: BytesLike[], overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Write(uint8,uint8,address)"(
      feature?: null,
      amount?: null,
      sender?: null
    ): WriteEventFilter;
    Write(feature?: null, amount?: null, sender?: null): WriteEventFilter;
  };

  estimateGas: {
    calc(
      reads: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    combo(
      reads: BigNumberish[][],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeJsonAsBase64(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeJsonAsUtf8(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeSvgAsBase64(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeSvgAsUtf8(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "exec(uint8,uint8,bool)"(
      feature: BigNumberish,
      pos: BigNumberish,
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "exec(uint8[8],bool)"(
      ids: BigNumberish[],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    execute(
      files: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    init(
      input: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    lengthOf(
      feature: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    locationOf(
      feature: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    props(
      ids: BigNumberish[],
      labels: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    randOf(
      feature: BigNumberish,
      seed: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "read(uint8,uint8)"(
      feature: BigNumberish,
      num: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "read(uint8[8])"(
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    register(
      input: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    svg(
      calculated: BigNumberish[],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    write(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    calc(
      reads: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    combo(
      reads: BigNumberish[][],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeJsonAsBase64(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeJsonAsUtf8(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeSvgAsBase64(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeSvgAsUtf8(
      input: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "exec(uint8,uint8,bool)"(
      feature: BigNumberish,
      pos: BigNumberish,
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "exec(uint8[8],bool)"(
      ids: BigNumberish[],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    execute(
      files: BigNumberish[][],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    init(
      input: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    lengthOf(
      feature: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    locationOf(
      feature: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    props(
      ids: BigNumberish[],
      labels: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    randOf(
      feature: BigNumberish,
      seed: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "read(uint8,uint8)"(
      feature: BigNumberish,
      num: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "read(uint8[8])"(
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    register(
      input: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    svg(
      calculated: BigNumberish[],
      base64: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    write(
      data: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
