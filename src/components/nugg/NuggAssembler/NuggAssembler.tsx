import React, { FunctionComponent } from 'react';
import { animated, config, useTransition } from 'react-spring';

import StickyList from '../../general/List/StickyList';

import ChildRenderItem from './ChildRenderItem';
import DetailView from './DetailView';
import FeatureRenderItem from './FeatureRenderItem';
import styles from './NuggAssembler.styles';
import TitleRenderItem from './TitleRenderItem';

type Props = { data: { title: string; items: any[] }[] };

const NuggAssembler: FunctionComponent<Props> = ({ data }) => {
    const [selectedItems, setSelectedItems] = React.useState([]);

    const transition = useTransition(data.length, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.default,
    });

    return transition(
        ({ opacity }, length) =>
            length > 0 && (
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
