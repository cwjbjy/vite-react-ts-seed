import d3 from './d3.lib';
import Emitter from './emitter';
import Tree from './tree';

class MindMap extends Emitter {
  init(data) {
    if (this.svg.select('.mind')) this.svg.select('.mind').remove(); //初始化时清空画布
    this.g = this.svg.append('g').attr('class', 'mind');

    //缩放器
    this.svgZoom = d3
      .zoom()
      .scaleExtent(this.scale)
      .on('zoom', () => {
        this.g.attr('transform', d3.event.transform);
        this.emit('treeTransform', d3.event.transform);
      });
    //调用缩放器
    this.svg.call(this.svgZoom).on('dblclick.zoom', null); //禁用双击缩放事件
    window.addEventListener('resize', this.resize.bind(this));
    this.left = this.createLeftTree();
    this.right = this.createRightTree();

    //一半的数据放左边，一般的数据放右边
    var i = Math.ceil((data.children?.length || 0) * 0.5);
    this.left.init(
      Object.assign(Object.create(data), {
        children: data.children?.slice(0, i) || [],
      }),
    );
    this.right.init(
      Object.assign(Object.create(data), {
        children: data.children?.slice(i) || [],
      }),
    );
    this.resize();
  }

  scaleTo(scale) {
    scale = scale.toFixed(1);
    this.svg.transition().call(this.svgZoom.scaleTo, scale);
  }

  zoomCenter(node) {
    const { x, y } = node;
    this.svg.call(this.svgZoom.scaleTo, this.svgRate);
    this.svg.transition().delay(50).duration(this.duration).call(this.svgZoom.translateTo, y, x);
  }

  resize() {
    let width = this.svg.property('clientWidth'),
      height = this.svg.property('clientHeight');
    this.width = width;
    this.height = height;
    this.left.width = width;
    this.left.height = height;
    this.right.width = width;
    this.right.height = height;
    this.svg.call(this.svgZoom.translateTo, 0, 0); //初始化平移位置;
    this.update();
    this.render();
  }

  update() {
    this.left.update();
    this.right.update();
  }

  render() {
    this.left.render();
    this.right.render();
  }

  onTreeNodeClick(d, tree, element) {
    this.emit('treeNodeClick', d, tree, element);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTreeNodeMouseEnter(d, tree, element) {
    // console.log('onTreeNodeMouseEnter', d, tree)
  }
  onTreeNodeMouseLeave(d, tree) {
    this.emit('treeNodeMouseLeave', d, tree);
    // console.log('onTreeNodeMouseLeave', d, tree)
  }
  // onContentMenuShow(d, tree) {
  //   console.log('onContentMenuShow', d, tree)
  // }
  createLeftTree() {
    return new Tree({
      parent: this,
      css: 'left', //类名
      direction: -1,
      g: this.g,
      limit: this.limit, //限制节点个数，超过用更多展示
      duration: this.duration,
    });
  }
  createRightTree() {
    return new Tree({
      parent: this,
      css: 'right',
      direction: 1,
      g: this.g,
      limit: this.limit,
      duration: this.duration,
    });
  }
}

export default MindMap;
