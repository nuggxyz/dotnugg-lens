import React, { FunctionComponent, useEffect, useState } from 'react';

import Button, { ButtonProps } from '@src/app/components/general/Buttons/Button/Button';

type Props = {
    feedbackText: string;
    timeout?: number;
    overrideFeedback?: boolean;
    label: string;
    onClick: () => void;
} & Omit<ButtonProps, 'onClick'>;

const FeedbackButton: FunctionComponent<Props> = ({
    feedbackText,
    disabled,
    label,
    timeout = 10000,
    overrideFeedback = false,
    ...props
}) => {
    const [clicked, setClicked] = useState(false);
    const [feedback, setFeedback] = useState(feedbackText);

    useEffect(() => {
        if (clicked) {
            const id = setTimeout(() => {
                setFeedback(overrideFeedback ? label : 'Retry?');
                setClicked(false);
            }, timeout);
            return () => {
                clearTimeout(id);
            };
        }
        return () => undefined;
    }, [clicked, timeout, label, overrideFeedback]);

    return (
        <Button
            {...props}
            disabled={clicked || disabled}
            label={clicked ? feedback : label}
            buttonStyle={props.buttonStyle}
            onClick={() => {
                setClicked(true);
                if (props.onClick) props.onClick();
            }}
        />
    );
};

export default FeedbackButton;
