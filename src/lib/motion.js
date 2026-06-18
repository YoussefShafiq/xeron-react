export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

export const revealTransition = {
    duration: 0.75,
    ease: EASE_OUT_EXPO,
};

export const viewport = {
    once: true,
    margin: '-8% 0px -5% 0px',
    amount: 0.15,
};

export function getRevealVariants(direction = 'up', reduceMotion = false) {
    if (reduceMotion) {
        return {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.2 } },
        };
    }

    const offset = 44;
    const hidden = { opacity: 0 };
    const visible = { opacity: 1, transition: revealTransition };

    switch (direction) {
        case 'left':
            hidden.x = -offset;
            visible.x = 0;
            break;
        case 'right':
            hidden.x = offset;
            visible.x = 0;
            break;
        case 'down':
            hidden.y = -offset;
            visible.y = 0;
            break;
        default:
            hidden.y = offset;
            visible.y = 0;
    }

    return { hidden, visible };
}

export function staggerContainerVariants(reduceMotion, stagger = 0.12, delayChildren = 0.06) {
    if (reduceMotion) {
        return {
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
        };
    }

    return {
        hidden: {},
        visible: {
            transition: { staggerChildren: stagger, delayChildren },
        },
    };
}

export function staggerItemVariants(reduceMotion) {
    if (reduceMotion) {
        return {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.2 } },
        };
    }

    return {
        hidden: { opacity: 0, y: 36 },
        visible: { opacity: 1, y: 0, transition: revealTransition },
    };
}

export function heroContainerVariants(reduceMotion) {
    if (reduceMotion) {
        return {
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
        };
    }

    return {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.18, delayChildren: 0.15 },
        },
    };
}

export function heroItemVariants(reduceMotion) {
    if (reduceMotion) {
        return {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.2 } },
        };
    }

    return {
        hidden: { opacity: 0, y: 48 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: EASE_OUT_EXPO },
        },
    };
}
