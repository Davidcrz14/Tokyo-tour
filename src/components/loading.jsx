import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1" />
          <span className="side side2" />
          <span className="side side3" />
          <span className="side side4" />
          <span className="shadow" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .pyramid-loader {
    position: relative;
    width: 450px; /* Increased width */
    height: 450px; /* Increased height */
    display: block;
    transform-style: preserve-3d;
    transform: rotateX(-20deg);
  }

  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotateY(360deg);
    }
  }

  .pyramid-loader .wrapper .side {
    width: 105px; /* Increased side width */
    height: 105px; /* Increased side height */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform-origin: center top;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  .pyramid-loader .wrapper .side1 {
    transform: rotateZ(-30deg) rotateY(90deg);
    background: conic-gradient(#e0115f, #ff6f61, #e0115f);
  }

  .pyramid-loader .wrapper .side2 {
    transform: rotateZ(30deg) rotateY(90deg);
    background: conic-gradient(#ff6f61, #e0115f, #ff6f61);
  }

  .pyramid-loader .wrapper .side3 {
    transform: rotateX(30deg);
    background: conic-gradient(#e0115f, #ff6f61, #e0115f);
  }

  .pyramid-loader .wrapper .side4 {
    transform: rotateX(-30deg);
    background: conic-gradient(#ff6f61, #e0115f, #ff6f61);
  }

  .pyramid-loader .wrapper .shadow {
    width: 90px; /* Increased shadow width */
    height: 90px; /* Increased shadow height */
    background: #ff6f61;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotateX(90deg) translateZ(-60px); /* Adjusted translateZ */
    filter: blur(18px); /* Increased blur */
  }`;

export default Loader;
