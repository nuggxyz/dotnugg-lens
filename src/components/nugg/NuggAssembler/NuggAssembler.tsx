import React, { FunctionComponent, useMemo } from 'react';
import { animated, config, useTransition } from 'react-spring';

import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrObjectEmpty,
} from '../../../lib';
import Colors from '../../../lib/colors';
import Layout from '../../../lib/layout';
import StickyList from '../../general/List/StickyList';
import InteractiveText from '../../general/Texts/InteractiveText/InteractiveText';
import Text from '../../general/Texts/Text/Text';
import UseOurs from '../UseOurs';

import ChildRenderItem from './ChildRenderItem';
import DetailView from './DetailView';
import FeatureRenderItem from './FeatureRenderItem';
import styles from './NuggAssembler.styles';
import TitleRenderItem from './TitleRenderItem';

type Props = { data: { title: string; items: any[] }[] };

const NuggAssembler: FunctionComponent<Props> = ({ data }) => {
    const [selectedItems, setSelectedItems] = React.useState([]);

    const isEmpty = useMemo(() => {
        return (
            isUndefinedOrNullOrArrayEmpty(data) ||
            data.every((item) => isUndefinedOrNullOrArrayEmpty(item.items))
        );
    }, [data]);

    const transition = useTransition(data.length, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.default,
    });

    return transition(({ opacity }, length) =>
        isEmpty ? (
            <animated.div
                style={{
                    position: 'absolute',
                    textAlign: 'center',
                    justifyContent: 'center',
                    opacity,
                }}>
                <Text
                    textStyle={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                    type="text">
                    Add some
                    <Text
                        type="code"
                        textStyle={{
                            background: Colors.transparentGrey,
                            borderRadius: Layout.borderRadius.smallish,
                            margin: '0rem .2rem',
                            padding: '.2rem .3rem',
                        }}>
                        .nugg
                    </Text>
                    files to your Art Directory
                </Text>
                <UseOurs />
            </animated.div>
        ) : (
            <StickyList
                //@ts-ignore
                style={{ ...styles.container, opacity }}
                styleLeft={styles.left}
                styleRight={styles.right}
                data={data}
                ChildRenderItem={ChildRenderItem}
                TitleRenderItem={TitleRenderItem}
                FeatureRenderItem={FeatureRenderItem}
                extraData={[selectedItems, setSelectedItems]}>
                <DetailView {...{ selectedItems, setSelectedItems }} />
            </StickyList>
        ),
    );
};

export default NuggAssembler;
