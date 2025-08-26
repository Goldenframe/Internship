import { useResizeObserver } from '@/shared/lib/hooks/use-resize-observer';
import styles from './styles.module.scss'


export const ResizableBox = () => {
    const { targetRef, size } = useResizeObserver<HTMLDivElement>();

    return (
        <div ref={targetRef} className={styles.resizeBox}>
            <p>Ширина: {size.width}px</p>
            <p>Высота: {size.height}px</p>
        </div>
    );
};