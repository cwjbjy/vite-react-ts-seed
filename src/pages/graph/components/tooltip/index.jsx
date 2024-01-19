/* eslint-disable react/prop-types */
import { memo } from 'react';

import styled from 'styled-components';

import downloadPNG from './exportPNG';

const Tooltip = memo(function Tooltip({ svgRef }) {
  return (
    <Wrapper>
      <div className="func">
        <div
          className="export"
          onClick={() => {
            downloadPNG('分支机构图谱', svgRef.current, '');
          }}
        >
          导出图片
        </div>
      </div>
    </Wrapper>
  );
});

export default Tooltip;

const Wrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  font-size: 13px;
  font-weight: 400;
  color: #141414;
  line-height: 24px;
  z-index: 1;
  background: #fff;
  &:hover {
    cursor: pointer;
  }
  .func {
    display: flex;
    height: 24px;
    border: 1px solid #ebebeb;
    border-radius: 2px;
    .full {
      padding: 0 15px 0 16px;
      text-align: center;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        display: block;
        right: 0px;
        top: 7px;
        bottom: 7px;
        width: 1px;
        background-color: rgb(234, 234, 234);
      }
      &:hover {
        color: rgb(1, 113, 246);
      }
    }
    .export {
      width: 83px;
      text-align: center;
      &:hover {
        color: rgb(1, 113, 246);
      }
    }
  }
  .reset {
    width: 71px;
    height: 24px;
    border: 1px solid #ebebeb;
    border-radius: 2px;
    text-align: center;
    margin-left: 24px;
    &:hover {
      color: rgb(1, 113, 246);
    }
    > i {
      font-size: 12px;
      margin-right: 3px;
      vertical-align: 0;
      color: #8c8c8c;
    }
  }
`;
