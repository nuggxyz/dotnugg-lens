import React, { FunctionComponent, useMemo } from 'react';
import { IoDocument } from 'react-icons/io5';

import { DotnuggV1Helper } from '../../../contracts/DotnuggHelper';
import { isUndefinedOrNullOrObjectEmpty } from '../../../lib';
import Text from '../../general/Texts/Text/Text';
import Colors from '../../../lib/colors';
import Button from '../../general/Buttons/Button/Button';
import Loader from '../../general/Loader/Loader';

import styles from './NuggAssembler.styles';

type Props = { item: any; extraData: any[]; index: number };

const ChildRenderItem: FunctionComponent<Props> = ({
    item,
    extraData,
    index,
}) => {
    const [svg, setSvg] = React.useState('');
    const isSelected = useMemo(() => {
        return !isUndefinedOrNullOrObjectEmpty(
            extraData[0].find(
                (listItem) => item.fileName === listItem.fileName,
            ),
        );
    }, [extraData, item]);

    React.useEffect(() => {
        DotnuggV1Helper.instance.sim([item.hex]).then((svg) => setSvg(svg));
    }, [item]);

    return (
        <Button
            key={index}
            buttonStyle={{
                background: isSelected
                    ? Colors.nuggBlueTransparent
                    : 'transparent',
                ...styles.childRenderItem,
            }}
            leftIcon={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IoDocument size={25} color={Colors.transparentDarkGrey} />
                    <Text
                        type="text"
                        size="small"
                        textStyle={{
                            color: Colors.transparentDarkGrey,
                            marginLeft: '.5rem',
                        }}>
                        {item.fileName}
                    </Text>
                </div>
            }
            onClick={() => {
                extraData[1]((items) => {
                    item = { ...item, svg };
                    return items
                        .toggle(item, 'fileName')
                        .sort((a, b) => a.feature - b.feature);
                });
            }}
            rightIcon={
                svg ? (
                    <img
                        src={svg}
                        style={{
                            height: '150px',
                            width: '150px',
                        }}
                    />
                ) : (
                    <div
                        style={{
                            height: '150px',
                            width: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Loader color="white" />
                    </div>
                )
            }
        />
    );
};

export default ChildRenderItem;
