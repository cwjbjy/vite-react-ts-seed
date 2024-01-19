import { FONTSIZE, PADDING } from './constant';
import d3 from './d3.lib.js';
//画圆圈
export const drawCircle = (node, direction, textLength) => {
  let gMark = d3
    .select(`#${node.id}`)
    .append('g')
    .attr('class', 'svg-box btn')
    .attr('stroke', '#529bf5')
    .attr('stroke-width', 1)
    .attr('transform', `translate(${direction * (textLength * FONTSIZE + PADDING * 2 + 2)},0)`);

  //画圆
  gMark.append('circle').attr('fill', 'none').attr('r', 6).attr('fill', '#529bf5');

  const padding = 4;

  //横线
  gMark
    .append('path')
    .attr('d', `m -${padding} 0 l ${2 * padding} 0`)
    .attr('stroke', '#ffffff');

  //竖线
  gMark
    .append('path')
    .attr('d', `m 0 -${padding} l 0 ${2 * padding}`)
    .attr('stroke-width', 1)
    .attr('class', 'node-circle-vertical')
    .attr('stroke', '#ffffff');
};
