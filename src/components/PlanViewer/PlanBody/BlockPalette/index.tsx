import react from 'react';
import styles from './styles.module.css';

function BlockPalette() {
    const blocks = [
        {
            title: 'Meeting Point',
            icon: 'start.svg',
            background: 'var(--second-gradient)'
        },
        {
            title: 'Route',
            icon: 'path.svg',
            background: 'var(--first-gradient)'
        },
        {
            title: 'Pit Stop',
            icon: 'clock.svg',
            background: 'linear-gradient(to bottom right, #ffb800, #ebde44)'
        },
        {
            title: 'Overnight Stay',
            icon: 'bed.svg',
            background: 'linear-gradient(to bottom right, #b300ff, #de44eb)'
        },
        {
            title: 'Destination',
            icon: 'home.svg',
            background: 'linear-gradient(to bottom right, #74c23a, #84e036  )'
        }
    ];

    return (
        <div className={styles.blockPatternsWrapper}>
            <h1>Card Patterns</h1>

            {blocks.map(b => (
                <div className={styles.cardExample} style={{ '--background': b.background } as React.CSSProperties}>
                    <h4>{b.title}</h4>
                    <img src={'/blockIcons/' + b.icon} />
                </div>
            ))}
        </div>
    )
}

export default BlockPalette;
