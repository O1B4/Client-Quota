import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const ModalBase = ({ active, closeEvent, children }) => {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    document.body.style.overflowY = active ? 'hidden' : 'initial';

    let timeoutId;
    if (active) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [active]);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = 'initial';
    };
  }, []);

  if (!active && closed) return null;

  return (
    <>
      <ModalBaseContainer active={active}>
        <div className="modal_back" onClick={closeEvent} />
        <div id='modalContent'>{children}</div>
      </ModalBaseContainer>
    </>
  );
};

ModalBase.defaultProps = {
  active: false,
};

const ModalBaseContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;

  .modal_back {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(249, 249, 249, 0.85);
  }

  #modalContent {
    position: relative;
    z-index: 10;
    max-width: 400px;
    width: 100%;
    background-color: #fff;
    padding: 2rem;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    ${({ active }) =>
      active
        ? css`
            animation: popInFromBottom 0.4s forwards ease-in-out;
          `
        : css`
            animation: popOutToBottom 0.4s forwards ease-in-out;
          `}
  }

  @keyframes popInFromBottom {
    0% {
      opacity: 0;
      transform: translateY(400px) scale(0.75);
    }
    75% {
      opacity: 1;
      transform: translateY(-16px) scale(1);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes popOutToBottom {
    0% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(400px) scale(0.75);
    }
  }
`;

export default ModalBase;
