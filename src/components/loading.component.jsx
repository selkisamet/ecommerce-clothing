import styled from "styled-components";
import loadingGif from "../assets/loading.gif";

const Loading = () => {
    return (
        <LoadingStyle style={{ color: "black" }}>
            <img src={loadingGif} alt="Loading" />
        </LoadingStyle>
    )
}

export default Loading;

const LoadingStyle = styled.div`
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;