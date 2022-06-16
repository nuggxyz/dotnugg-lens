import React, { FunctionComponent } from 'react';

import client from '@src/client';
import lib from '@src/lib';

import ChildRenderItem from './ChildRenderItem';
import DetailView from './DetailView';

const NuggAssembler: FunctionComponent<unknown> = () => {
    // const isEmpty = useMemo(() => {
    //     return isUndefinedOrNullOrArrayEmpty(data);
    // }, [data]);

    // React.useEffect(() => {
    //     selectedItems.forEach((x) => {
    //         data.forEach((a) => {
    //             a.items.forEach((b) => {
    //                 if (b.fileUri === x.fileUri) {
    //                     const tmp = selectedItems;

    //                     tmp[tmp.findIndex((y) => y.fileUri === x.fileUri)] = b;

    //                     setSelectedItems(tmp);
    //                 }
    //             });
    //         });
    //     });
    //     // setSelectedItems((items) => {
    //     //     console.log({ data, items });
    //     //     items.forEach((x) => {
    //     //         data.forEach((a) => {
    //     //             a.items.forEach((b) => {
    //     //                 if (b.fileUri === x.fileUri) {
    //     //                     console.log(b.fileUri, x.fileUri);

    //     //                     x = b;
    //     //                 }
    //     //             });
    //     //         });
    //     //     });
    //     //     return items;
    //     // });
    // }, [data, selectedItems]);

    // const transition = useTransition(data.length, {
    //     from: { opacity: 0 },
    //     enter: { opacity: 1 },
    //     leave: { opacity: 0 },
    //     config: config.default,
    // });
    const [viewingFeature] = React.useState(0);

    const items = client.compiled.useCompiledItems();

    // console.log({ items });

    const List = React.useMemo(() => {
        return Object.values(items)
            .filter((x) => x.feature === viewingFeature)
            .map((x, i) => <ChildRenderItem item={x} index={i} key={`${x.fileUri}-main-list`} />);
    }, [viewingFeature, items]);

    const ref = React.useRef(null);

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
                {/* <div style={styles.sticky}>
                    <TitleRenderItem
                        title={item.title}
                        setOpen={setOpen}
                        extraData={extraData}
                        open={open}
                    />
                </div> */}
                <div
                    style={{
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            flexDirection: 'row',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }}
                        ref={ref}
                    >
                        {List}
                    </div>
                </div>
            </div>
            <DetailView />
        </div>
        // <StickyList
        //     // @ts-ignore
        //     style={{ ...styles.container }}
        //     styleLeft={styles.left}
        //     styleRight={styles.right}
        //     data={data}
        //     ChildRenderItem={ChildRenderItem}
        //     TitleRenderItem={TitleRenderItem}
        //     FeatureRenderItem={FeatureRenderItem}
        //     extraData={undefined}
        //     // extraData={[selectedItems, setSelectedItems]}
        // >

        // </StickyList>
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
