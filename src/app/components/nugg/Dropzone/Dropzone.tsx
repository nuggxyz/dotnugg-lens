/* eslint-disable no-restricted-syntax */
import React, {
    CSSProperties,
    FunctionComponent,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { animated, useSpring } from '@react-spring/web';

import Text from '@src/app/components/general/Texts/Text/Text';

import styles from './Dropzone.styles';

type Props = PropsWithChildren<{
    onDrop: (filePaths: string[]) => void;
    style?: CSSProperties;
}>;

const Dropzone: FunctionComponent<Props> = ({ onDrop, children }) => {
    const [dragging, setDragging] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const onDragOverEvent = useCallback(
        (event: DragEvent) => {
            event.stopPropagation();
            event.preventDefault();
            setDragging(true);
        },
        [setDragging],
    );

    const onDragLeaveEvent = useCallback(
        (event: DragEvent) => {
            event.stopPropagation();
            event.preventDefault();
            setDragging(false);
        },
        [setDragging],
    );

    const onDropEvent = useCallback(
        (event: DragEvent) => {
            event.stopPropagation();
            event.preventDefault();
            setDragging(false);
            const files: string[] = [];
            // @ts-ignore
            for (const file of event.dataTransfer.files) {
                // @ts-ignore
                files.push(file.path as string);
            }
            // @ts-ignore
            onDrop(files);
        },
        [setDragging, onDrop],
    );

    useEffect(() => {
        if (ref.current) {
            const { current } = ref;
            current.addEventListener('dragover', onDragOverEvent);
            current.addEventListener('dragleave', onDragLeaveEvent);
            current.addEventListener('drop', onDropEvent);

            return () => {
                current.removeEventListener('dragover', onDragOverEvent);
                current.removeEventListener('dragleave', onDragLeaveEvent);
                current.removeEventListener('drop', onDropEvent);
            };
        }
        return undefined;
    }, [ref, onDragOverEvent, onDragLeaveEvent, onDropEvent]);

    const textStyle = useSpring({
        ...styles.text,
        opacity: dragging ? 1 : 0,
        zIndex: dragging ? 1001 : -1,
        immediate: (key) => key === 'zIndex',
    });

    const containerStyle = useSpring({
        ...styles.background,
        zIndex: dragging ? 1000 : -1,
        opacity: dragging ? 1 : 0,
        immediate: (key) => key === 'zIndex',
    });

    return (
        <div ref={ref} style={styles.container}>
            <Text textStyle={textStyle}>Drop your .aseprite files here</Text>
            <animated.div style={containerStyle} />
            {children}
        </div>
    );
};

export default Dropzone;
