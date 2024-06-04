import React, { useEffect, useState } from 'react';

function useAnimatedState(initialValue: number, transition: number): [number, React.Dispatch<React.SetStateAction<number>>] {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [targetValue, setTargetValue] = useState(initialValue);

    useEffect(() => {
        let startTime: number;
        const startValue = currentValue;

        const step = (time: number) => {
            if (startTime === undefined) startTime = time;

            const percentage = (time - startTime) / transition;
            
            if (percentage >= 1) {
                setCurrentValue(targetValue);
            } else {
                setCurrentValue(startValue + (targetValue - currentValue) * percentage);
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [targetValue, transition]);

    return [currentValue, setTargetValue];
}

export default useAnimatedState;
