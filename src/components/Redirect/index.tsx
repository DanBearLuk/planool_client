import React from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect({ to }: { to: string }) {
    const navigate = useNavigate();
    navigate(to, { replace: true });
    
    return <></>;
}

export default Redirect;
