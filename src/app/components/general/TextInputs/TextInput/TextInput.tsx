import { UseSpringProps, animated } from '@react-spring/web';
import React, { CSSProperties, FunctionComponent, SetStateAction, useEffect, useRef } from 'react';

import Text from '@src/app/components/general/Texts/Text/Text';

import styles from './TextInput.styles';

export interface TextInputProps {
    label?: string;
    value: string;
    setValue: React.Dispatch<SetStateAction<string>> | ((value: string) => void);
    disabled?: boolean;
    warning?: string;
    style?: React.CSSProperties | UseSpringProps;
    styleInputContainer?: CSSProperties | UseSpringProps;
    styleHeading?: CSSProperties;
    styleInput?: CSSProperties;
    type?: 'text' | 'password' | 'number';
    multi?: boolean;
    border?: boolean;
    placeholder?: string;
    borderBottom?: boolean;
    code?: boolean;
    rightToggles?: JSX.Element[];
    leftToggles?: JSX.Element[];
    pattern?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    className?: string;
    styleLabel?: CSSProperties;
    shouldFocus?: boolean;
    triggerFocus?: boolean;
    onFocus?: () => void;
    onClick?: React.DOMAttributes<HTMLTextAreaElement | HTMLInputElement>['onClick'];
    // https://stackoverflow.com/a/53803282
    restrictToNumbers?: boolean;
    // restrictToNumbersWithDecimal?: boolean;
}

const TextInput: FunctionComponent<TextInputProps> = ({
    label,
    value,
    setValue,
    disabled,
    warning,
    style,
    styleInputContainer,
    styleHeading,
    styleInput,
    type,
    multi = false,
    border = false,
    borderBottom = false,
    placeholder,
    code,
    rightToggles,
    leftToggles,
    pattern = '',
    inputMode,
    className,
    styleLabel,
    shouldFocus,
    onFocus,
    onClick,
    restrictToNumbers,
    triggerFocus,
    // restrictToNumbersWithDecimal,
}) => {
    const inputStyle = {
        ...styles.textInput,
        ...(multi && styles.multi),
        ...(code && styles.code),
        ...styleInput,
    };

    const headingStyle = label
        ? {
              ...styles.headingContainer,
              ...(label && styles.marginTop),
              ...styleHeading,
          }
        : {};

    const containerStyle = {
        ...styles.container,
        ...style,
        ...(multi && styles.containerMulti),
        ...(borderBottom && !border && styles.bottomBorder),
    };

    const subContainerStyle = {
        ...styles.subContainer,
        ...styleInputContainer,
        ...(border && styles.border),
    };

    const ref = useRef<HTMLInputElement | HTMLTextAreaElement>();

    useEffect(() => {
        if (ref.current && shouldFocus) {
            ref.current.focus();
        }
    }, [ref, shouldFocus]);

    useEffect(() => {
        if (ref.current && triggerFocus) {
            ref.current.focus();
        }
    }, [ref, triggerFocus]);

    return (
        <animated.div style={containerStyle}>
            <div style={headingStyle}>
                <Text
                    textStyle={{
                        ...styles.headingText,
                        ...styleLabel,
                    }}
                >
                    {label}
                </Text>
                {warning && (
                    <span style={styles.warningContainer}>
                        <Text type="text" size="smaller" textStyle={styles.warningText}>
                            {warning}
                        </Text>
                    </span>
                )}
            </div>
            {leftToggles && leftToggles.map((Toggle) => <div key={Toggle.key}>{Toggle}</div>)}
            <animated.div style={subContainerStyle}>
                {multi ? (
                    <textarea
                        // @ts-ignore
                        ref={ref}
                        className={className}
                        placeholder={placeholder}
                        style={inputStyle}
                        value={value}
                        onChange={(v: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setValue(v.target.value);
                        }}
                        disabled={disabled}
                        onFocus={onFocus}
                        onClick={onClick}
                    />
                ) : (
                    <input
                        // @ts-ignore
                        ref={ref}
                        className={className}
                        placeholder={placeholder}
                        type={type}
                        style={inputStyle}
                        value={value}
                        onChange={(v: React.ChangeEvent<HTMLInputElement>) => {
                            setValue(v.target.value);
                        }}
                        pattern={!pattern || pattern === '' ? undefined : pattern}
                        disabled={disabled}
                        inputMode={restrictToNumbers ? 'numeric' : inputMode}
                        onFocus={onFocus}
                        onClick={onClick}
                        onKeyPress={
                            restrictToNumbers
                                ? (event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                      }
                                  }
                                : undefined
                        }
                    />
                )}
                {rightToggles && rightToggles.map((Toggle) => <div key={Toggle.key}>{Toggle}</div>)}
            </animated.div>
        </animated.div>
    );
};

export default React.memo(TextInput);
