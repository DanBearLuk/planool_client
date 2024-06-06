import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Outlet from '../Outlet';
import PlanHeader from './PlanHeader';
import ErrorPage from '../ErrorPage';
import { useUser } from '../../contexts/UserContext';
import PlanBody from './PlanBody';
import EditModeButton from '../EditModeButton';
import { usePlanEditor } from '../../controllers/PlanEditorController';
import { useSocketController } from '../../contexts/SocketControllerContext';
import { AuthorInfo, PlanInfo } from './types';
import { FetchError } from '../../services/utilities';
import { handleUnknownError } from '../../handlers/errorHandlers';
import { viewPlan } from '../../services/plans';

interface StaticPlanInfo {
    plan?: PlanInfo,
    authorInfo?: AuthorInfo
    roles: string[],
    isFetched: boolean
}

function PlanViewer() {
    const { user } = useUser();
    const { planId } = useParams();

    const [staticPlanInfo, setStaticPlanInfo] = useState<StaticPlanInfo>({ roles: [], isFetched: false }); 
    const [fetchError, setFetchError] = useState<FetchError | undefined>();

    useEffect(() => {
        if (fetchError) setFetchError(undefined);

        const tryToFetch = async () => {
            try {
                const result = await viewPlan(planId);

                setStaticPlanInfo({
                    plan: result.plan,
                    roles: result.roles,
                    authorInfo: result.authorInfo,
                    isFetched: true
                });
            } catch (e) {
                if (e instanceof FetchError) {
                    setFetchError(e);
                } else {
                    handleUnknownError(e as Error);
                }
            }
        };

        tryToFetch();
    }, [planId, user]);

    const { 
        plan: dynamicPlan,
        handleEdit,
        isConnected: isEditorConnected
    } = usePlanEditor(planId || '');

    const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);

    const plan = isEditorConnected ? dynamicPlan : staticPlanInfo.plan;

    if (staticPlanInfo.isFetched) {
        return (
            <Outlet 
                header={<PlanHeader planInfo={plan!} authorInfo={staticPlanInfo.authorInfo!} />}
                isHeaderFixed
            >
                <PlanBody planInfo={plan!} isEditMode={isEditModeEnabled} onEdit={handleEdit} />
                
                {isEditorConnected && 
                    <EditModeButton onStateChanged={(isEnabled) => setIsEditModeEnabled(isEnabled)} />
                }
            </Outlet>
        );
    } else if (fetchError !== undefined) {
        return (
            <ErrorPage errorCode={fetchError.status} description={fetchError.message} />
        );
    } else {
        return (<></>);
    };
}

export default PlanViewer;
