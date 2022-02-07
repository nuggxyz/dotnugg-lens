import React, { FunctionComponent, useEffect, useState } from 'react';

import Button, { ButtonProps } from '../Button/Button';

type Props = ButtonProps & {
    feedbackText: string;
    timeout?: number;
    overrideFeedback?: boolean;
};

const FeedbackButton: FunctionComponent<Props> = ({
    feedbackText,
    onClick,
    disabled,
    label,
    timeout = 10000,
    overrideFeedback,
    ...props
}) => {
    const [clicked, setClicked] = useState(false);
    const [feedback, setFeedback] = useState(feedbackText);

    useEffect(() => {
        if (clicked) {
            const id = setTimeout(() => {
                setFeedback(overrideFeedback ? label : 'Retry?');
            }, timeout);
            return () => {
                clearTimeout(id);
            };
        }
    }, [clicked, timeout, label, overrideFeedback]);

    return (
        <Button
            {...props}
            // disabled={clicked || disabled}
            label={clicked ? feedback : label}
            onClick={() => {
                setClicked(true);
                onClick();
            }}
        />
    );
};

export default FeedbackButton;
