import styled from 'styled-components';

export default styled.div`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  padding: 18px 6px;
  height: 300px;
  border-radius: 2px;
  border: none;
  background: transparent;
  color: #666;
  z-index: 1;

  :global(ul) {
    padding: 0;
    margin: 0;
  }

  :global(.ant-slider-track) {
    background: rgba(24, 144, 255, 1);
  }

  :global(.ant-slider-handle) {
    border-color: rgba(24, 144, 255, 1);
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 12px;
    &:hover {
      color: #0171f6;
    }
    &:not(:last-child) {
      margin-bottom: 22px;
    }
    &:global(.disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
