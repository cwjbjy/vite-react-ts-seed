import Base from './base';
import { ROOTFONTSIZE, FONTSIZE, CIRCLE_R, PADDING, RECT_HEIGHT } from './constant';
import d3 from './d3.lib.js';
import { drawCircle } from './pattern';
import Util from './Util';

export default class Tree extends Base {
  init(data) {
    //将数据转为节点，加上data,depth，height，parent属性
    this.root = d3.hierarchy((this.data = data || this.data));
    //是否为首次加载
    this.rendered = false;
  }
  update() {
    let root = this.root;
    this.cut(root.children || []);
    let nodes = root.descendants(),
      links = root.links(),
      markers = []; //箭头

    //树布局，为节点增加x,y属性
    d3
      .tree()
      .nodeSize([this.height / 20, 120])
      .separation((a, b) => {
        return a.parent === b.parent ? 1 : 2;
      })(root);

    this.nodes = nodes;
    this.links = links;
    this.markers = markers;

    for (let d of nodes) {
      //为节点增加唯一标识，能复用旧节点（展开收缩）
      if (!d.id) d.id = Util.uuid();

      //收集箭头
      if (this.classify(d) === 2 && d.parent.children[0] === d) {
        markers.push(d);
      }

      //手动控制水平方向上节点之间的间距
      d.y = Math.round(this.nodeDistance(d) * this.direction);
      d.x = Math.round(d.x);

      //将坐标数据存储在_x，_y上，用于记录上一次节点的位置（展开收缩）
      !('_x' in d) && (d._x = d.x);
      !('_y' in d) && (d._y = d.y);
    }
  }

  //判断层数的奇偶，奇为1，偶为2
  classify(d) {
    return d.depth ? ((d.depth - 1) % 2) + 1 : 0;
  }

  nodeWidth(d) {
    const v = this.classify(d);
    switch (v) {
      case 0:
        return d.data.name.length * ROOTFONTSIZE + 20;
      case 1:
        return 44; //奇数项，节点为圆，直径为44
      default:
        return 240;
    }
  }
  nodeDistance(d) {
    let width = 92;

    if (this.classify(d) === 1 && d.depth > 2) {
      width += this.nodeWidth(d) * 0.5;
    }

    //上一个节点累加的距离+上一个节点的宽度+节点两个内侧边的间距
    return d.depth ? this.nodeDistance(d.parent) + this.nodeWidth(d.parent) * 0.5 + width : 0;
  }

  cut(nodes) {
    for (let node of nodes) {
      //如果节点为收起状态，则不对子节点进行数据处理
      if (!node.collapsed) {
        this.slice(node);
        node.children && this.cut(node.children);
      }
    }
  }
  toggle(node) {
    if (node.depth) {
      node.children = node.children ? undefined : node.__children__;
      node.collapsed = !node.collapsed;
    }
  }
  slice(node) {
    let children = node.__children__ || (node.__children__ = node.children);
    if (children) {
      let size = children.length,
        limit = this.limit;
      if ('children' in node) {
        if (this.classify(node) === 1 && this.limit < size && !node.unlimited) {
          node.children = children.slice(0, limit);
          var child =
            node.child ||
            (node.child = Tree.createNode({
              name: `更多 ( ${size - limit} )`,
              plus: true,
              children: [],
            }));
          child.depth = node.depth + 1;
          child.height = node.height - 1;
          child.parent = node;
          node.children.push(child);
        } else {
          node.children = children;
        }
      }
    }
  }
  render() {
    this.renderNodes();
    this.renderLinks();
    this.renderMarkers();
    this.rendered = true;
  }
  renderNodes() {
    let node = this.g.selectAll(`.node-${this.css}`).data(this.nodes, (d) => d.id);

    //需要增加的节点
    let enter = node
      .enter()
      .append('g')
      .attr('class', (d) => `node node-${this.css} node-${this.classify(d)} ${d.data.type || ''}`.trim())
      .attr('id', (d) => d.id)
      .attr('transform', this.nodeTransformFrom.bind(this))
      .attr('opacity', 0)
      .on('click', (d, i, nodeArr) => this.parent.onTreeNodeClick(d, this, nodeArr[i].firstChild))
      .on('mouseenter', (d) => this.parent.onTreeNodeMouseEnter(d, this))
      .on('mouseleave', (d) => this.parent.onTreeNodeMouseLeave(d, this))
      .on('contextmenu', (d) => this.parent.onContentMenuShow(d, this));

    //更新节点
    let update = enter
      .merge(node)
      .transition()
      .duration(this.duration)
      .attr('transform', this.nodeTransformTo.bind(this))
      .attr('opacity', 1);

    //移除多余的节点
    node.exit().transition().duration(this.duration).attr('opacity', 0).remove();

    enter.each((d) => this.renderNodeShape(d));

    update.each(() => {
      //进行节点更新操作
    });
  }
  renderNodeShape(d) {
    let tags = d.data?.tags?.join('、');
    let text = `${d.data?.name}${tags ? `[${tags}]` : ''}`;
    let reg = new RegExp(/\s/, 'g'); //消除空格影响
    let textLength = text.replace(reg, '').length;
    switch (this.classify(d)) {
      case 0:
        d3.select(`#${d.id}`)
          .append('g')
          .attr('class', 'svg-box flow')
          .append('rect')
          .attr('width', this.nodeWidth(d))
          .attr('height', 32)
          .attr('rx', 2)
          .attr('ry', 2)
          .attr('fill', '#128BED')
          .attr('x', -this.nodeWidth(d) / 2)
          .attr('y', -(32 / 2));
        d3.select(`#${d.id}`).append('g').attr('class', 'svg-box label').append('text').text(text);
        break;
      case 1:
        d3.select(`#${d.id}`).append('g').attr('class', 'svg-box flow').append('circle').attr('r', CIRCLE_R);
        d3.select(`#${d.id}`)
          .append('g')
          .attr('class', 'svg-box label')
          .append('text')
          .attr('dx', 0)
          .attr('dy', 0)
          .append('tspan')
          .attr('x', 0)
          .attr('y', 0)
          .text(text);
        break;
      case 2:
        d3.select(`#${d.id}`)
          .append('g')
          .attr('class', 'svg-box flow')
          .append('rect')
          .attr('width', d.data.plus ? 0 : textLength * FONTSIZE + PADDING * 2)
          .attr('height', RECT_HEIGHT)
          .attr('rx', 2)
          .attr('ry', 2)
          .attr('fill', 'transparent')
          .attr('stroke', ' rgb(133, 165, 255)')
          .attr('stroke-width', 0.5)
          .attr('x', this.direction > 0 ? 0 : this.direction * (textLength * FONTSIZE + PADDING * 2))
          .attr('y', -(RECT_HEIGHT / 2));

        d3.select(`#${d.id}`)
          .append('g')
          .attr('class', `svg-box label ${d.data?.plus ? 'plus' : ''}`)
          .attr('transform', `translate(${this.direction * ((textLength * FONTSIZE) / 2 + PADDING)},0)`)
          .append('text')
          .append('tspan')
          .text((d) => {
            return d.data?.name || '';
          })
          .append('tspan')
          .attr('class', 'svg-box tags')
          .text((d) => {
            return d.data?.tags?.length ? ` [${tags}]` : null;
          });
        //持股比
        d3.select(`#${d.id}`)
          .append('g')
          .attr('class', `svg-box tips`)
          .append('text')
          .append('tspan')
          .text((d) => {
            return d.data?.tips || '';
          });
        //有子节点，画圆圈
        if (d.data.hasChildren) {
          drawCircle(d, this.direction, textLength);
        }
        break;
      default:
        break;
    }
  }

  renderLinks() {
    let link = this.g.selectAll(`.link-${this.css}`).data(this.links, (d) => d.target.id),
      enter = link
        .enter()
        .insert('path', 'g')
        .attr('class', `link link-${this.css}`)
        .attr('d', this.linkTransformFrom.bind(this))
        .attr('opacity', 0);

    enter
      .merge(link)
      .transition()
      .duration(this.duration)
      .attr('d', this.linkTransformTo.bind(this))
      .attr('opacity', 1);

    //移除多余的节点
    link.exit().transition().duration(this.duration).remove().attr('opacity', 0);
  }
  renderMarkers() {
    let marker = this.g.selectAll(`.marker-${this.css}`).data(this.markers, (d) => d.id),
      enter = marker
        .enter()
        .append('polygon')
        .attr('points', '0,0 6,-3, 6,3')
        .attr('class', `marker marker-${this.css}`)
        .attr('transform', this.markerTransformFrom.bind(this))
        .attr('opacity', 0);
    enter
      .merge(marker)
      .transition()
      .duration(this.duration)
      .attr('transform', this.markerTransformTo.bind(this))
      .attr('opacity', 1);

    marker.exit().transition().duration(this.duration).remove().attr('opacity', 0);
  }

  linkTransformFrom(d) {
    var p = this.rendered ? d.source : this.root,
      x = p._y,
      y = p._x;
    return `
                M${x}, ${y}
                L${x}, ${y}
                ${x}, ${y}
                ${x}, ${y}
            `.replace(/\s+/g, ' ');
  }
  linkTransformTo({ source, target }) {
    let p = source,
      d = target,
      d0 = this.direction,
      x0 = p.y,
      y0 = p.x,
      x1 = d.y,
      y1 = d.x,
      split = 0.5;
    switch (this.classify(p)) {
      //设置偏移量，实现线与节点产生间隔
      case 0:
        x0 += this.nodeWidth(p) * 0.5 * d0;
        x1 -= (CIRCLE_R + 4) * d0;
        break;
      case 1:
        x0 += (CIRCLE_R + 4) * d0;
        break;
      default:
        break;
    }
    return `
              M${x0}, ${y0}
              L${(x0 + x1) * split}, ${y0}
              ${(x0 + x1) * split}, ${y1}
              ${x1}, ${y1}
          `.replace(/\s+/g, ' ');
  }
  markerTransformFrom(d) {
    let p = this.rendered ? d.parent : this.root;
    return `translate(${p._y}, ${p._x})`;
  }
  markerTransformTo(d) {
    let p = d.parent,
      w = 3,
      d0 = this.direction,
      x = p.y + (this.nodeWidth(p) * 0.5 + 2) * d0 - w * d0;
    return `translate(${x}, ${p.x + 0.5}) scale(${d0}, 1)`;
  }
  nodeTransformFrom(d) {
    var p = this.rendered ? d.parent : this.root;
    return `translate(${p._y}, ${p._x})`;
  }
  nodeTransformTo(d) {
    return `translate(${d.y}, ${d.x})`;
  }
  static createNode() {
    return d3.hierarchy(Object.assign({}, ...arguments));
  }
}
