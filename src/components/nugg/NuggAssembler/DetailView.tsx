import React, {
    FunctionComponent,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    IoCheckmarkCircle,
    IoCheckmarkCircleOutline,
    IoClose,
    IoEllipseOutline,
} from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';
import { IoSync } from 'react-icons/io5';

import { DotnuggV1Helper } from '../../../contracts/DotnuggHelper';
import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrStringEmpty,
} from '../../../lib';
import Colors from '../../../lib/colors';
import AppState from '../../../state/app';
import { Item } from '../../../state/ipcListeners';
import Button from '../../general/Buttons/Button/Button';
import AnimatedCard from '../../general/Cards/AnimatedCard/AnimatedCard';
import FadeInOut from '../../general/FadeInOut/FadeInOut';
import Loader from '../../general/Loader/Loader';
import Text from '../../general/Texts/Text/Text';
import usePrevious from '../../../hooks/usePrevious';
import constants from '../../../lib/constants';
import Label from '../../general/Label/Label';

import styles from './NuggAssembler.styles';

type Props = {
    selectedItems: Item['items'][number][];
    setSelectedItems: React.Dispatch<SetStateAction<any>>;
};

const DetailView: FunctionComponent<Props> = ({
    selectedItems,
    setSelectedItems,
}) => {
    const scrollRef = useRef<HTMLDivElement>();
    const [svg, setSvg] = React.useState('');
    const [loading, setLoading] = useState(false);
    const isZoomOn = AppState.select.isZoomOn();
    const { height } = AppState.select.dimensions();
    const artRepo = AppState.select.artLocation();

    const liveSelectedItems = AppState.hook.useCompiledItems(
        selectedItems.map((x) => x.fileUri),
    );

    const prev = usePrevious(liveSelectedItems);

    const refresh = React.useCallback(() => {
        if (!isUndefinedOrNullOrArrayEmpty(liveSelectedItems)) {
            if (JSON.stringify(prev) !== JSON.stringify(liveSelectedItems)) {
                setLoading(true);
                console.log({ liveSelectedItems });
                DotnuggV1Helper.renderOnChain(
                    liveSelectedItems.map((item) =>
                        window.dotnugg.getHex(item, artRepo),
                    ),
                    true,
                )
                    .then((svg) => setSvg(svg))
                    .catch((e) => alert(e))
                    .finally(() => setLoading(false));
                // scrollRef.current.scrollTo(scrollRef.current.scrollWidth, 0);
            }
        }
    }, [liveSelectedItems, artRepo, setLoading, prev]);

    useEffect(() => {
        refresh();
    }, [liveSelectedItems, refresh]);

    useEffect(() => {
        if (scrollRef.current) {
            const current = scrollRef.current;
            const listener = (evt) => {
                console.log(evt.deltaY);
                current.scrollLeft += evt.deltaY;
            };
            current.addEventListener('wheel', listener);
            return () => {
                current.removeEventListener('wheel', listener);
            };
        }
    }, [scrollRef.current]);

    return !isUndefinedOrNullOrArrayEmpty(selectedItems) ? (
        <div style={styles.detailContainer}>
            <div
                style={{
                    zIndex: 2,
                    width: '100%',
                    height: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}>
                {!isUndefinedOrNullOrStringEmpty(svg) && (
                    <img
                        src={svg}
                        style={{
                            width: '90%',
                        }}
                    />
                )}
            </div>
            <div style={{ position: 'relative' }}>
                <FadeInOut toggle={loading}>
                    <div style={styles.detailLoading}>
                        <Text
                            type="text"
                            textStyle={{
                                color: 'white',
                                marginRight: '.5rem',
                            }}>
                            Combining on-chain
                        </Text>
                        <Loader color="white" />
                    </div>
                </FadeInOut>
                {/* <FadeInOut toggle={!loading}>
                    <div style={styles.detailLoading}>
                        <Button
                            hoverStyle={{ filter: 'brightness(.9)' }}
                            buttonStyle={{
                                background: 'transparent',
                                padding: '0',
                            }}
                            type="text"
                            textStyle={{
                                color: 'white',
                                marginRight: '.5rem',
                            }}
                            label="Zoom"
                            onClick={() =>
                                AppState.dispatch.setIsZoomOn({
                                    _localStorageValue: !isZoomOn,
                                    _localStorageTarget: 'zoom',
                                    _localStorageExpectedType: 'unique',
                                })
                            }
                            rightIcon={
                                isZoomOn ? (
                                    <IoCheckmarkCircle
                                        color="white"
                                        size={20}
                                    />
                                ) : (
                                    <IoEllipseOutline color="white" size={20} />
                                )
                            }
                        />
                    </div>
                </FadeInOut> */}
                <FadeInOut toggle={!loading}>
                    <div style={styles.detailLoading}>
                        <Button
                            hoverStyle={{ filter: 'brightness(.9)' }}
                            buttonStyle={{
                                background: 'transparent',
                                padding: '0',
                            }}
                            type="text"
                            textStyle={{
                                color: 'white',
                                marginRight: '.5rem',
                            }}
                            label="Refresh"
                            onClick={() => refresh()}
                            rightIcon={<IoSync color="white" size={20} />}
                        />
                    </div>
                </FadeInOut>
                <div ref={scrollRef} style={styles.detailSelectedItems}>
                    {liveSelectedItems.map((item, index) => (
                        <div
                            style={{
                                ...styles.detailSelectedItem,
                                width: 150,
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            key={`item-${index}`}>
                            <Button
                                buttonStyle={styles.detailSelectedItemClose}
                                rightIcon={<IoClose />}
                                onClick={() =>
                                    setSelectedItems((items) =>
                                        items.toggle(item, 'fileName'),
                                    )
                                }
                            />
                            <Button
                                buttonStyle={styles.detailSelectedVsCode}
                                type="text"
                                size="small"
                                leftIcon={
                                    <SiVisualstudiocode
                                        color={Colors.nuggBlueText}
                                        size={20}
                                    />
                                }
                                onClick={() =>
                                    window.dotnugg.openToVSCode(item.fileUri)
                                }
                            />
                            <img
                                src={item.svg}
                                style={{
                                    height: '80%',
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ...styles.detailSelectedItemId,
                                    top: undefined,
                                    bottom: ' .5rem',
                                    right: undefined,
                                }}>
                                <Label
                                    type="text"
                                    size="small"
                                    textStyle={{
                                        color: Colors.transparentDarkGrey,
                                        // marginLeft: '.5rem',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                    }}
                                    text={
                                        constants.DOTNUGG_ITEMS[item.feature] +
                                        ' ' +
                                        item.id
                                    }></Label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null;
};

export default DetailView;
