import { motion, useReducedMotion } from 'framer-motion';
import {
    viewport,
    revealTransition,
    getRevealVariants,
    staggerContainerVariants,
    staggerItemVariants,
    heroContainerVariants,
    heroItemVariants,
} from '@/lib/motion';

export function ScrollReveal({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    as = 'div',
    ...props
}) {
    const reduceMotion = useReducedMotion();
    const Component = motion[as] ?? motion.div;
    const variants = getRevealVariants(direction, reduceMotion);

    const visible = {
        ...variants.visible,
        transition: { ...revealTransition, ...variants.visible.transition, delay },
    };

    return (
        <Component
            className={className}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={viewport}
            variants={{ hidden: variants.hidden, visible }}
            {...props}
        >
            {children}
        </Component>
    );
}

export function StaggerReveal({
    children,
    className = '',
    stagger = 0.12,
    delayChildren = 0.06,
}) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainerVariants(reduceMotion, stagger, delayChildren)}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = '' }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            variants={staggerItemVariants(reduceMotion)}
        >
            {children}
        </motion.div>
    );
}

export function HeroReveal({ children, className = '' }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            variants={heroContainerVariants(reduceMotion)}
        >
            {children}
        </motion.div>
    );
}

export function HeroItem({ children, className = '' }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            variants={heroItemVariants(reduceMotion)}
        >
            {children}
        </motion.div>
    );
}
