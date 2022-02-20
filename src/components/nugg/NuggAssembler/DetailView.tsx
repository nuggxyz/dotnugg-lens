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

import { DotnuggV1Helper } from '../../../contracts/DotnuggHelper';
import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrStringEmpty,
} from '../../../lib';
import AppState from '../../../state/app';
import Button from '../../general/Buttons/Button/Button';
import AnimatedCard from '../../general/Cards/AnimatedCard/AnimatedCard';
import FadeInOut from '../../general/FadeInOut/FadeInOut';
import Loader from '../../general/Loader/Loader';
import Text from '../../general/Texts/Text/Text';

import styles from './NuggAssembler.styles';

type Props = {
    selectedItems: any[];
    setSelectedItems: React.Dispatch<SetStateAction<any>>;
};

const DetailView: FunctionComponent<Props> = ({
    selectedItems,
    setSelectedItems,
}) => {
    const [isAnimated, setIsAnimated] = useState(true);
    const scrollRef = useRef<HTMLDivElement>();
    const [svg, setSvg] = React.useState('');
    const [loading, setLoading] = useState(false);
    const { height } = AppState.select.dimensions();
    const artRepo = AppState.select.artLocation();

    useEffect(() => {
        if (!isUndefinedOrNullOrArrayEmpty(selectedItems)) {
            setLoading(true);
            DotnuggV1Helper.renderOnChain(
                selectedItems.map((item) =>
                    window.dotnugg.getHex(item, artRepo),
                ),
                true,
            )
                .then((svg) => setSvg(svg))
                .catch((e) => alert(e))
                .finally(() => setLoading(false));
            // scrollRef.current.scrollTo(scrollRef.current.scrollWidth, 0);
        }
    }, [selectedItems, artRepo]);

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
                {!isUndefinedOrNullOrStringEmpty(svg) &&
                    // (isAnimated ? (
                        <div
                            style={{
                                position: 'fixed',
                            }}>
                            <AnimatedCard disabled={!isAnimated}>
                                <img
                                    src={svg}
                                    style={{
                                        height: height / 2.1,
                                        // width: '350px',
                                    }}
                                />
                            </AnimatedCard>
                        </div>
                    // ) : (
                    //     <div
                    //         style={{
                    //             position: 'fixed',
                    //         }}>
                    //         <img
                    //             src={svg}
                    //             style={{
                    //                 height: height / 2.1,
                    //                 // width: '350px',
                    //             }}
                    //         />
                    //     </div>
                    }
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
                            label="Zoom"
                            onClick={() => setIsAnimated(!isAnimated)}
                            rightIcon={
                                isAnimated ? (
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
                </FadeInOut>
                <div ref={scrollRef} style={styles.detailSelectedItems}>
                    {selectedItems.map((item, index) => (
                        <div
                            style={styles.detailSelectedItem}
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
                            <img
                                src={item.svg}
                                style={{
                                    height: '150px',
                                    width: '150px',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div
            style={{
                ...styles.detailContainer,
                ...styles.detailEmptyContainer,
            }}>
            <Text
                type="text"
                textStyle={{ color: 'white', textAlign: 'center' }}>
                Select some items to combine together
            </Text>
        </div>
    );
};

export default DetailView;
