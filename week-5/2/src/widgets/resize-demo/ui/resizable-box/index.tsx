import { useResizeObserver } from '@/shared/lib/hooks/use-resize-observer';
import styles from './styles.module.scss'
import { useRef } from 'react';


export const ResizableBox = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { size } = useResizeObserver<HTMLDivElement>(targetRef);

    return (
        <div ref={targetRef} className={styles.resizeBox}>
            <p>Ширина: {size.width}px</p>
            <p>Высота: {size.height}px</p>
        </div>
    );
};