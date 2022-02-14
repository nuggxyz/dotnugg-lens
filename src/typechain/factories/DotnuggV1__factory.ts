/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { DotnuggV1, DotnuggV1Interface } from "../DotnuggV1";

const _abi = [
  {
    type: "function",
    name: "calc",
    inputs: [
      {
        internalType: "uint256[][]",
        name: "reads",
        type: "uint256[][]",
      },
    ],
    outputs: [
      {
        internalType: "uint256[]",
        name: "calculated",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "calc",
    inputs: [
      {
        internalType: "uint256[]",
        name: "read",
        type: "uint256[]",
      },
    ],
    outputs: [
      {
        internalType: "uint256[]",
        name: "calculated",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "combo",
    inputs: [
      {
        internalType: "uint256[]",
        name: "read",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "base64",
        type: "bool",
      },
    ],
    outputs: [
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "combo",
    inputs: [
      {
        internalType: "uint256[][]",
        name: "reads",
        type: "uint256[][]",
      },
      {
        internalType: "bool",
        name: "base64",
        type: "bool",
      },
    ],
    outputs: [
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "svg",
    inputs: [
      {
        internalType: "uint256[]",
        name: "calculated",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "base64",
        type: "bool",
      },
    ],
    outputs: [
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    stateMutability: "view",
  },
];

export class DotnuggV1__factory {
  static readonly abi = _abi;
  static createInterface(): DotnuggV1Interface {
    return new utils.Interface(_abi) as DotnuggV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DotnuggV1 {
    return new Contract(address, _abi, signerOrProvider) as DotnuggV1;
  }
}
