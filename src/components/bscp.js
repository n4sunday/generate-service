import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import styled from 'styled-components'
// import Editor from '../Editor';
import Viewer from '../Viewer';
import makePDF from '../makePDF';
import { ProjectService } from '../service';

const defaultValue = makePDF
    .toString()
    .split('\n')
    .slice(1, -1)
    .join('\n')
    .replace(/^ {2}/gm, '');

const Container = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
`


function BSCP_APP() {
    const search = queryString.parse(window.location.search)
    const [project, setProject] = useState({});
    const [container, setContainer] = useState([]);

    const renderContainer = (type, container) => {
        if (type === 'A') {
            return []
        }
        else if (type === 'B') {
            return container
        }
    }

    const fetchData = async () => {
        const { id, type, token, container } = search
        let payload = {
            id,
            type,
            container: renderContainer(type, container),
        }
        let res = await ProjectService.get(id, token, payload)
        if (res.data) {
            setProject(res.data.project)
            if (type === 'B') {
                setContainer(res.data.container)
            }
            else if (type === ' A') {
                setContainer([])
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Container>
            {/*<Editor value={value} onChange={onChange} />*/}
            <Viewer value={defaultValue} project={project} container={container} />
        </Container>
    )
}

export default BSCP_APP