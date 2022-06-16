import React, { FunctionComponent } from 'react';

import client from '@src/client';
import lib from '@src/lib';
import Text from '@src/components/general/Texts/Text/Text';

import ChildRenderItem from './ChildRenderItem';
import DetailView from './DetailView';

const NuggAssembler: FunctionComponent<unknown> = () => {
    const selectedFeature = client.compiled.useSelectedFeature();
    const items = client.compiled.useCompiledItems();
    const document = client.compiled.useDocument();
    const updateSelectedFeature = client.compiled.useUpdateSelectedFeature();

    const List = React.useMemo(() => {
        return Object.values(items)
            .filter((x) => x.feature === selectedFeature)
            .map((x, i) => <ChildRenderItem item={x} index={i} key={`${x.fileUri}-main-list`} />);
    }, [selectedFeature, items]);

    const ref = React.useRef(null);

    const featureList = React.useMemo(() => {
        return Object.values(document?.collection.features || {})
            .reverse()
            .map((x, i) => (
                <div
                    key={`featureList-${i}`}
                    className="mobile-pressable-div"
                    style={{
                        display: 'flex',
                        width: 200,
                        height: 59,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 10,
                        background:
                            selectedFeature === i
                                ? lib.colors.transparentWhite
                                : lib.colors.transparent,
                        borderRadius: lib.layout.borderRadius.medium,
                        cursor: 'pointer',
                    }}
                    role="button"
                    aria-hidden="true"
                    onClick={() => {
                        updateSelectedFeature(i);
                    }}
                >
                    <Text>{x.name?.toLowerCase()}</Text>
                </div>
            ));
    }, [document, updateSelectedFeature, selectedFeature]);

    return (
        <div
            style={{
                border: 'none',
                overflow: 'hidden',
                height: '90%',
                display: 'flex',
                width: '90%',
                justifyContent: 'space-between',
                alignItems: 'center',
                // position: 'absolute',
            }}
        >
            <div
                style={{
                    boxShadow: `${lib.layout.boxShadow.prefix} ${lib.layout.boxShadow.basic}`,
                    borderRadius: lib.layout.borderRadius.medium,
                    border: 'none',
                    overflow: 'hidden',
                    background: lib.colors.gradient3Transparent,
                    height: '90%',
                    width: '66%',
                    // position: 'absolute',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>{featureList}</div>

                <div
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        flexWrap: 'wrap',
                        overflow: 'scroll',
                        height: '100%',
                        width: '100%',

                        alignItems: 'flex-start',
                    }}
                    ref={ref}
                >
                    <div
                        style={{
                            justifyContent: 'space-evenly',

                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            overflow: 'scroll',
                        }}
                    >
                        {List}
                    </div>
                </div>
            </div>
            <DetailView />
        </div>
    );
};

export default NuggAssembler;

// {
//     /* <animated.div
// style={{
//     position: 'absolute',
//     textAlign: 'center',
//     justifyContent: 'center',
//     opacity,
// }}
// >
// <Text
//     textStyle={{
//         display: 'flex',
//         alignItems: 'center',
//         textAlign: 'center',
//     }}
//     type="text"
// >
//     Add some
//     <Text
//         type="code"
//         textStyle={{
//             background: Colors.transparentGrey,
//             borderRadius: Layout.borderRadius.smallish,
//             margin: '0rem .2rem',
//             padding: '.2rem .3rem',
//         }}
//     >
//         .nugg
//     </Text>
//     files to your Art Directory
// </Text>
// <UseOurs />
// </animated.div>
// fasdfasd */
// }
