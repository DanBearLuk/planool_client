import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import ProfileMainInfo from './ProfileMainInfo';
import { useUser } from '../../contexts/UserContext';
import AdditionalProfileInfo from './AdditionalProfileInfo';
import { getPlans } from '../../services/plans';
import PlansList from './PlansList';

function ProfilePage() {
    const { user } = useUser();
    const [favoritePlans, setFavoritePlans] = useState<any[]>([]);
    const [createdPlans, setCreatedPlans] = useState<any[]>([]);

    console.log(favoritePlans, createdPlans);

    useEffect(() => {
        const get = async () => {
            user?.favoritePlans.length && setFavoritePlans(await getPlans(user?.favoritePlans));
            user?.createdPlans.length &&setCreatedPlans(await getPlans(user?.createdPlans));
        };

        get();
    }, [user])

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.leftContainer}>
                <ProfileMainInfo avatarUrl='' username={user?.username || ''} />
            </div>
            
            <div className={styles.rightContainer}>
                {user?.info && (
                    <AdditionalProfileInfo text={user.info} />
                )}

                <PlansList title='Favorite Plans' plans={favoritePlans} />
                <PlansList title='Created Plans' plans={createdPlans} />
            </div>
        </div>
    );
}

export default ProfilePage;
