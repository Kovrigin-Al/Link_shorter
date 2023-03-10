import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinkCard } from '../components/LinkCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/httpHooks';

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading } = useHttp(); 
    const [link, setLink] = useState (null);

    const linkId = useParams().id;
    const getLink = useCallback(
      async () => {
        try {
            console.log(linkId)
            const result = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(result);
            console.log(result)
        } catch (error) {
            
        }
      },
      [token, linkId, request],
    )
    
    useEffect(() => {
      getLink()
     
    }, [getLink])
    
    if(loading) {
        return <Loader/>
    }

    return (
        <div>
            {!loading && link && <LinkCard link={link}/>}
        </div>
    )
}