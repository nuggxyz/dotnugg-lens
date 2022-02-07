import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

import Colors from '../../../../lib/colors';
import NLStaticImage, { NLStaticImageKey } from '../../NLStaticImage';
import Text, { TextProps } from '../Text/Text';

import styles from './CurrencyText.styles';

type PartialText = Partial<TextProps>;

interface BalanceProps extends PartialText {
    value: number;
    decimals?: number;
    unit?: string;
    prefix?: string;
    duration?: number;
    percent?: boolean;
    image?: NLStaticImageKey;
}

const CurrencyText: React.FC<BalanceProps> = ({
    value,
    decimals = 3,
    unit = '',
    prefix = '',
    duration = 2,
    percent = false,
    image,
    ...props
}) => {
    const [isGwei, setIsGwei] = useState(false);
    useEffect(() => {
        setIsGwei(value < 0.00001);
    }, [value]);

    const spring = useSpring({
        val: value,
        from: { val: 0 },
        config: config.molasses,
    });

    return (
        <Text
            {...props}
            textStyle={{
                ...styles.textStyle,
                ...props.textStyle,
            }}>
            <animated.div className="number" style={{ paddingRight: '.5rem' }}>
                {spring.val.to((val) =>
                    isGwei
                        ? (val * 10 ** 9).toFixed()
                        : val.toFixed(percent ? 2 : 5),
                )}
            </animated.div>
            {percent && '%'}
            {image && (
                <div style={{ paddingRight: '0rem' }}>
                    {isGwei ? 'gwei' : 'ETH'}
                </div>
            )}
        </Text>
    );
};

export default React.memo(CurrencyText);
