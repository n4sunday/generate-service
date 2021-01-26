import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
`

function Home() {
    return (
        <Container>
            Generate Service
        </Container>
    )
}
export default Home