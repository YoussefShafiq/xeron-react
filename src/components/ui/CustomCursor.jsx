import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const DOT_SPRING = { stiffness: 900, damping: 35, mass: 0.15 };
const RING_SPRING = { stiffness: 220, damping: 26, mass: 0.6 };

const INTERACTIVE_SELECTOR = [
    'a',
    'button',
    '[role="button"]',
    'input',
    'textarea',
    'select',
    'label',
    '.cursor-pointer',
    '[data-cursor="pointer"]',
].join(', ');

function isInteractiveTarget(target) {
    if (!(target instanceof Element)) return false;
    if (target.closest('[data-cursor="default"]')) return false;
    return Boolean(target.closest(INTERACTIVE_SELECTOR));
}

export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const dotX = useSpring(cursorX, DOT_SPRING);
    const dotY = useSpring(cursorY, DOT_SPRING);
    const ringX = useSpring(cursorX, RING_SPRING);
    const ringY = useSpring(cursorY, RING_SPRING);

    useEffect(() => {
        const finePointer = window.matchMedia('(pointer: fine)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!finePointer || reducedMotion) return;

        setEnabled(true);
        document.documentElement.classList.add('custom-cursor-active');

        return () => {
            document.documentElement.classList.remove('custom-cursor-active');
        };
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const onMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setVisible(true);
            setHovering(isInteractiveTarget(e.target));
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);
        const onDown = () => setClicking(true);
        const onUp = () => setClicking(false);

        window.addEventListener('mousemove', onMove);
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.documentElement.addEventListener('mouseenter', onEnter);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
        };
    }, [enabled, cursorX, cursorY]);

    if (!enabled) return null;

    const ringSize = hovering ? 52 : clicking ? 28 : 36;
    const dotSize = hovering ? 4 : clicking ? 6 : 5;

    return (
        <>
            <motion.div
                aria-hidden
                className="custom-cursor-ring pointer-events-none fixed top-0 left-0 z-[99999]"
                animate={{
                    width: ringSize,
                    height: ringSize,
                    opacity: visible ? (hovering ? 1 : 0.75) : 0,
                    scale: clicking ? 0.85 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            <motion.div
                aria-hidden
                className="custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[99999]"
                animate={{
                    width: dotSize,
                    height: dotSize,
                    opacity: visible ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    );
}
