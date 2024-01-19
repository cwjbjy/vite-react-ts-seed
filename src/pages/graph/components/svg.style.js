import styled from 'styled-components';

export default styled.svg`
  position: relative;
  z-index: 1;
  min-height: 240px;
  .mind {
    .node-0 .label text {
      font: 14px / 16px microsoft yahei;
      vertical-align: top;
      fill: #fff;
    }

    /* 股东 */
    .holders .flow circle {
      fill: #ff9347;
    }

    .holders .label text {
      fill: #ffffff;
    }

    /* 实控人 */
    .controller .flow circle {
      fill: #fb7171;
    }

    .controller .label text {
      fill: #ffffff;
    }

    /* 供应商 */
    .suppliers .flow circle {
      fill: #f99c29;
    }

    .suppliers .label text {
      fill: #ffffff;
    }

    /* 高管 */
    .topmanager .flow circle {
      fill: #7288e5;
    }

    .topmanager .label text {
      fill: #ffffff;
    }

    /* 文字节点 */
    .node-2 .tips text {
      fill: #999999;
    }

    .node-2 .label {
      fill: #111111;
    }

    .node-2 .tags {
      fill: #5c5c5c;
    }

    .node-2 .plus text {
      fill: #1482f0;
    }

    .marker {
      fill: #e6e6e6;
    }

    .link {
      fill: none;
      stroke: #dfdfdf;
      shape-rendering: crispEdges;
    }

    .node {
      .label,
      .tags,
      .warn,
      .anchor text {
        cursor: pointer;
      }
    }

    .node-2 {
      &.node-left .tips text {
        transform: translate(24px, -9px) scale(0.8);
      }

      &.node-right .tips text {
        transform: translate(-24px, -9px) scale(0.8);
      }
    }
  }

  .svg-box {
    text {
      text-anchor: middle;
      dominant-baseline: central;
      vertical-align: middle;
      transform: translate(0, 0);
      font: 13px / 1em Microsoft YaHei;
    }
  }
`;
