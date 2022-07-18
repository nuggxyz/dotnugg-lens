import { CSSProperties } from 'react';

export enum ModalEnum {
    Aseprite,
}

export interface ModalDataBase {
    modalType: ModalEnum;
    backgroundStyle?: CSSProperties;
    containerStyle?: CSSProperties;
    previousModal?: ModalType;
}

export interface AsepriteModalData extends ModalDataBase {
    modalType: ModalEnum.Aseprite;
}

export type ModalType = AsepriteModalData;
