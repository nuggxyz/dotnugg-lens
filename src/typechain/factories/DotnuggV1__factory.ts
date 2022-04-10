/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { DotnuggV1, DotnuggV1Interface } from "../DotnuggV1";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "feature",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "amount",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "Write",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[][]",
        name: "reads",
        type: "uint256[][]",
      },
    ],
    name: "calc",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "read",
        type: "uint256[]",
      },
    ],
    name: "calc",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "reads",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "base64",
        type: "bool",
      },
    ],
    name: "combo",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
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
    name: "combo",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "input",
        type: "uint256",
      },
    ],
    name: "decodeProof",
    outputs: [
      {
        internalType: "uint16[16]",
        name: "res",
        type: "uint16[16]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proof",
        type: "uint256",
      },
    ],
    name: "decodeProofCore",
    outputs: [
      {
        internalType: "uint8[8]",
        name: "res",
        type: "uint8[8]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "input",
        type: "bytes",
      },
    ],
    name: "encodeJsonAsBase64",
    outputs: [
      {
        internalType: "bytes",
        name: "res",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "input",
        type: "bytes",
      },
    ],
    name: "encodeJsonAsUtf8",
    outputs: [
      {
        internalType: "bytes",
        name: "res",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8[8]",
        name: "ids",
        type: "uint8[8]",
      },
    ],
    name: "encodeProof",
    outputs: [
      {
        internalType: "uint256",
        name: "proof",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[16]",
        name: "ids",
        type: "uint16[16]",
      },
    ],
    name: "encodeProof",
    outputs: [
      {
        internalType: "uint256",
        name: "proof",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "input",
        type: "bytes",
      },
    ],
    name: "encodeSvgAsBase64",
    outputs: [
      {
        internalType: "bytes",
        name: "res",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "input",
        type: "bytes",
      },
    ],
    name: "encodeSvgAsUtf8",
    outputs: [
      {
        internalType: "bytes",
        name: "res",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "feature",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "pos",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "base64",
        type: "bool",
      },
    ],
    name: "exec",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proof",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "base64",
        type: "bool",
      },
    ],
    name: "exec",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8[8]",
        name: "ids",
        type: "uint8[8]",
      },
      {
        internalType: "bool",
        name: "base64",
        type: "bool",
      },
    ],
    name: "exec",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "input",
        type: "bytes[]",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "feature",
        type: "uint8",
      },
    ],
    name: "lengthOf",
    outputs: [
      {
        internalType: "uint8",
        name: "a",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "feature",
        type: "uint8",
      },
    ],
    name: "locationOf",
    outputs: [
      {
        internalType: "address",
        name: "res",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "itemId",
        type: "uint16",
      },
      {
        internalType: "string[8]",
        name: "labels",
        type: "string[8]",
      },
    ],
    name: "parseItemIdAsString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proof",
        type: "uint256",
      },
      {
        internalType: "string[8]",
        name: "labels",
        type: "string[8]",
      },
    ],
    name: "props",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "feature",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "seed",
        type: "uint256",
      },
    ],
    name: "randOf",
    outputs: [
      {
        internalType: "uint8",
        name: "a",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "feature",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "num",
        type: "uint8",
      },
    ],
    name: "read",
    outputs: [
      {
        internalType: "uint256[]",
        name: "_read",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8[8]",
        name: "ids",
        type: "uint8[8]",
      },
    ],
    name: "read",
    outputs: [
      {
        internalType: "uint256[][]",
        name: "_reads",
        type: "uint256[][]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "input",
        type: "bytes[]",
      },
    ],
    name: "register",
    outputs: [
      {
        internalType: "contract IDotnuggV1Safe",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
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
    name: "svg",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "calculated",
        type: "uint256[]",
      },
    ],
    name: "svg",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "write",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "feature",
        type: "uint8",
      },
    ],
    name: "write",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
