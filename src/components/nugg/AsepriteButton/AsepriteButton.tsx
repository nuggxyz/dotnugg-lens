import React, { FunctionComponent } from 'react';
import { IoDocument } from 'react-icons/io5';

import { shortenPathName } from '../../../lib';
import AppState from '../../../state/app';
import Button from '../../general/Buttons/Button/Button';
import Text from '../../general/Texts/Text/Text';

import styles from './AsepriteButton.styles';

type Props = { file: string };

const AsepriteButton: FunctionComponent<Props> = ({ file }) => {
    const artLocation = AppState.select.artLocation();
    return (
        <Button
            buttonStyle={styles.container}
            onClick={() => window.dotnugg.convertAseprite(file, artLocation)}
            rightIcon={
                <>
                    <IoDocument size={50} />
                    <Text size="small">{shortenPathName(file)}</Text>
                </>
            }></Button>
    );
};

export default AsepriteButton;
