import _emitter from './core';
import { EmitEventNames } from './interfaces';

const emitter = {
    ..._emitter,
    events: EmitEventNames,
};

export default emitter;
