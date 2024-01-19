/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useClickAway } from 'ahooks';
import styled from 'styled-components';

const Popover = ({ show, data, left, bottom, onClose }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setVisible(show);
  }, [show]);
  useClickAway(() => {
    if (visible) setVisible(false);
  }, ref);
  return (
    <Wrapper ref={ref} left={left} bottom={bottom}>
      <CSSTransition appear unmountOnExit in={visible} classNames={'fade'} timeout={200}>
        <div>
          <div onClick={onClose} className="close" />
          {data ? (
            <div className="pop-content">
              <div className="pop-top">
                <div className="avatar">
                  <div className="word-logo">
                    <span>{data.name?.substring(0, 2)}</span>
                    <span>{data.name?.substring(2, 4)}</span>
                  </div>
                </div>
                <div className="info">
                  <h1>{data.name}</h1>
                </div>
              </div>
              <div className="operate-wrapper">
                <div onClick={() => {}}>
                  <span>查看公司详情</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </CSSTransition>
    </Wrapper>
  );
};

export default Popover;

const Wrapper = styled.div`
  > div {
    width: 360px;
    min-height: 113px;
    bottom: ${(props) => props.bottom}px;
    left: ${(props) => props.left}px;
    z-index: 5;
    background: #ffffff;
    position: fixed;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    box-shadow:
      0 2px 9px 2px rgba(0, 0, 0, 0.09),
      0px 1px 2px -2px rgba(0, 0, 0, 0.16);
  }

  /*入场动画开始*/
  .fade-enter {
    opacity: 0;
  }
  /*入场动画过程*/
  .fade-enter-active {
    opacity: 1;
    transition: opacity 1s ease-in;
  }
  /*入场动画结束*/
  .fade-enter-done {
    opacity: 1;
  }
  /*离场动画开始*/
  .fade-exit {
    opacity: 1;
  }
  /*离场动画过程*/
  .fade-exit-active {
    opacity: 0;
    transition: opacity 1s ease-in;
  }
  /*离场动画结束*/
  .fade-exit-done {
    opacity: 0;
  }
  /*页面第一次加载时的开始状态*/
  .fade-appear {
    opacity: 0;
  }
  /*页面第一次加载时的动画过程*/
  .fade-appear-active {
    opacity: 1;
    transition: opacity 1s ease-in;
  }

  .close {
    position: absolute;
    right: 14px;
    top: 20px;
    width: 12px;
    height: 12px;
    cursor: pointer;
    background-size: contain;
  }
  .pop-top {
    display: flex;
    padding: 16px;
    margin-bottom: 38px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
      .word-logo {
        width: 100%;
        height: 100%;
        background-size: contain;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        flex-direction: column;
        span {
          line-height: 13px;
          font-size: 13px;
          &:first-of-type {
            margin-bottom: 1px;
          }
        }
      }
    }
    .info {
      margin-left: 8px;
      flex: 1;
      min-width: 1px;
      align-items: center;
      display: flex;
      h1 {
        font-size: 15px;
        font-weight: 600;
        text-align: left;
        color: #262626;
        line-height: 19px;
        max-width: 248px;
        margin: 0;
      }
      .cancel {
        display: flex;
        margin-top: 6px;

        .zx {
          margin-left: 18px;
        }
        .describe {
          font-size: 12px;
          font-weight: 300;
          color: #8c8c8c;
        }
        .date {
          color: #111111;
          font-size: 13px;
          margin-left: 11px;
        }
      }
      ul {
        margin: 7px 0 0 0;
        display: flex;
        flex-wrap: wrap;
        li {
          font-size: 13px;
          font-weight: 400;
          text-align: left;
          color: #262626;
          line-height: 17px;
          margin-right: 16px;
          margin-bottom: 2px;
          position: relative;
          &:not(:last-of-type)::after {
            content: '';
            border-right: 1px solid #e6e6e6;
            height: 10px;
            display: inline-block;
            position: absolute;
            top: 3.5px;
            right: -8px;
          }
          &:last-of-type {
            margin-right: 0;
          }
        }
      }
    }
  }
  .operate-wrapper {
    display: flex;
    border-top: 1px solid #efefef;
    height: 38px;
    position: absolute;
    width: 100%;
    bottom: 0;
    > div {
      flex: 1;
      justify-content: center;
      align-items: center;
      display: flex;
      cursor: pointer;
      &.disable {
        cursor: not-allowed;
        filter: opacity(0.6) grayscale();
      }
      span {
        position: relative;
      }
      &:first-of-type {
        position: relative;
        span {
          color: #ff7500;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      &:last-of-type {
        span {
          color: #0171f6;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;
