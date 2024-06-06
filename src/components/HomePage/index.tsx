import React from 'react';
import styles from './styles.module.css';

function HomePage() {
    const events = [
        { title: 'Comic Con USA 2024', participants: 522, preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/A_Little_Slice_of_Comic-Con_%2814772960622%29.jpg/1280px-A_Little_Slice_of_Comic-Con_%2814772960622%29.jpg' },
        { title: 'K-POP World Festival', participants: 220, preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Korea_KPOP_World_Festival_61.jpg/1920px-Korea_KPOP_World_Festival_61.jpg' },
        { title: 'Local Fortnite Tournament', participants: 100, preview: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/2801/85aaa5a31d6f8ef0c28c4fac7643ad8775bcf583eea15a2b.jpg?w=1920&thumb=false' },
        { title: 'Michael and Wendy\'s Wedding', participants: 47, preview: 'https://www.brides.com/thmb/XXZPZ4KSVLajZFyNgjEy395dKOI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/33814_05-eb9a2e4cc91544c5b78cc623c3c56222.jpg' },
    ];

    return (
        <div className={styles.homePage}>
            <div className={styles.title}>
                <h1>Planool</h1>
                <h3>Advanced event planning tool</h3>
            </div>

            <h2>Trending events</h2>

            <div className={styles.eventList}>
                {events.map(e => (
                    <div className={styles.eventWrapper}>
                        <img src={e.preview} />
                        <span>{e.participants} participants</span>
                        <h4>{e.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
