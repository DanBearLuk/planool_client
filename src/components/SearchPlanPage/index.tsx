import React from 'react';
import styles from './styles.module.css';

function SearchPlanPage() {
    const events = [
        { title: 'Comic Con USA 2024', description: 'The most popular event in the world!', preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/A_Little_Slice_of_Comic-Con_%2814772960622%29.jpg/1280px-A_Little_Slice_of_Comic-Con_%2814772960622%29.jpg' },
        { title: 'K-POP World Festival', description: 'For K-POP fans.', preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Korea_KPOP_World_Festival_61.jpg/1920px-Korea_KPOP_World_Festival_61.jpg' },
        { title: 'Local Fortnite Tournament', description: 'An e-sport tournament.', preview: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/2801/85aaa5a31d6f8ef0c28c4fac7643ad8775bcf583eea15a2b.jpg?w=1920&thumb=false' },
        { title: 'Michael and Wendy\'s Wedding', description: 'Finally we made it!', preview: 'https://www.brides.com/thmb/XXZPZ4KSVLajZFyNgjEy395dKOI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/33814_05-eb9a2e4cc91544c5b78cc623c3c56222.jpg' },
    ];

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.searchBarWrapper}>
                <img src='/general/search.svg' />
                <input type='text' placeholder='Search' />
            </div>

            <div className={styles.searchBody}>
                <div className={styles.results}>
                    {events.map(e => (
                        <div className={styles.resultWrapper}>
                            <h2>{e.title}</h2>
                            <div>
                                <p>{e.description}</p>
                            </div>
                            <img src={e.preview} />
                        </div>
                    ))}
                </div>
                
                <div className={styles.filters}>
                    <div>
                        <label>Event Type</label>
                        <select></select>
                    </div>
                    
                    <div>
                        <label>Country</label>
                        <select></select>
                    </div>

                    <div>
                        <label>Duration</label>
                        <input type='range' min='1' max='365' /> <span>1d</span>
                    </div>

                    <div>
                        <label>Participation Type</label>
                        <input type='checkbox' /> <span>Free</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPlanPage;
