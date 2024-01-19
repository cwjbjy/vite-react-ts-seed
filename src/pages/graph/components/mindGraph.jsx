/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState, memo, useCallback } from 'react';

import { useDebounceEffect } from 'ahooks';
import styled from 'styled-components';

import { initTreeData } from './initTreeData';
import MindMap from './mindMap';
import d3 from './mindMap/d3.lib';
import Popover from './popover';
import SVG from './svg.style';
import Tooltip from './tooltip';
import Zoom from './zoom';

function classify(d) {
  return d.depth ? ((d.depth - 1) % 2) + 1 : 0;
}

const apiData = [
  {
    name: '周士力',
    type: '',
    tags: [],
    tips: '',
    children: [],
  },
  {
    name: '陈华云',
    type: '',
    tags: [],
    tips: '',
    children: [],
  },
];

const MindGraph = ({ width, height }) => {
  const ref = useRef();
  const mindMapRef = useRef(null);
  const [minMap, setMinMap] = useState(null);
  const [transform, setTransform] = useState(1);
  const [treeData, setTreeData] = useState(null);
  const screenRef = useRef(null);
  const selectedNodeRef = useRef();
  /** 节点浮窗所需参数 */
  const [popoverConfig, setPopoverConfig] = useState({});
  //点击选中节点
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  //点击选中节点数据
  const [nodeBasicData, setNodeBasicData] = useState();

  const handleNodeClick = useCallback((node, tree, element) => {
    let data = node.data;

    if (classify(node) === 0) return;

    //展开收起及更多
    if (classify(node) === 1 || data.plus) {
      if (data.plus) {
        tree.nodes.forEach((item) => {
          if (node.parent.id === item.id) {
            //将父节点unlimited置为true，通过__children__替换children，来展开更多节点
            item.unlimited = true;
          }
        });
      }

      tree.toggle(node);
      tree.update();
      tree.render();
    }

    if (classify(node) === 2 && data.hasChildren) {
      let box = d3.event.target;
      while ((box = box.parentNode)) {
        //一层层寻找父节点
        let list = box.classList;
        if (list) {
          if (list.contains('btn')) {
            //改变圆圈内竖线属性，使其呈现出来
            d3.select(`#${node.id} .btn .node-circle-vertical`)
              .transition()
              .duration(750)
              .attr('stroke-width', node.children?.length ? 1 : 0);
            if (data.children?.length) {
              tree.toggle(node);
              tree.update();
              tree.render();
            } else {
              //增加高管节点
              let nextNode = tree.constructor.createNode({
                name: '高管',
                type: 'topmanager',
                children: [],
              });
              nextNode.depth = node.depth + 1;
              nextNode.height = node.height - 1;
              nextNode.parent = node;
              node.data.children.push(nextNode.data);
              if (!node.children) node.children = [];
              node.children.push(nextNode);
              node.__children__ = node.children;
              //增加高管下人员节点
              apiData.forEach((item) => {
                let nextnextNode = tree.constructor.createNode(item);
                nextnextNode.depth = node.depth + 2;
                nextnextNode.height = node.depth - 2;
                nextnextNode.parent = node.children[0];
                node.data.children[0].children.push(nextnextNode.data);
                if (!node.children[0].children) node.children[0].children = [];
                node.children[0].children.push(nextnextNode);
              });
              node.children[0].__children__ = node.children[0].children;
              tree.update();
              tree.render();
            }
            //移动视图
            mindMapRef.current.zoomCenter(node);
            return;
          }
        }
      }
    }

    if (classify(node) === 2 && data.type === 'company') {
      setPopoverConfig((draft) => {
        return { ...draft, show: false, redWarn: false };
      });
      setSelectedNodeData(node);
      selectedNodeRef.current = element;
      setNodeBasicData(data);
    }
  }, []);

  const handleZoom = useCallback((t) => {
    setTransform(t.k);
    setSelectedNodeData(null);
  }, []);

  useEffect(() => {
    if (minMap) minMap.on('treeNodeClick', handleNodeClick);

    return () => {
      if (minMap) minMap.off('treeNodeClick', handleNodeClick);
    };
  }, [handleNodeClick, minMap]);

  useEffect(() => {
    if (minMap) minMap.on('treeTransform', handleZoom);

    return () => {
      if (minMap) minMap.off('treeTransform', handleZoom);
    };
  }, [handleZoom, minMap]);

  useEffect(() => {
    if (initTreeData) setTreeData(initTreeData);
  }, []);

  useEffect(() => {
    const minMap = new MindMap({
      svg: d3.select(ref.current),
      scale: [0.5, 2],
      limit: 10,
      duration: 750,
      svgRate: 1,
    });
    setMinMap(minMap);
    mindMapRef.current = minMap;
  }, []);

  useEffect(() => {
    if (minMap && treeData) {
      minMap.init(treeData);
    }
  }, [minMap, treeData]);

  /** 计算浮窗位置并且控制展示时机 */
  useDebounceEffect(
    () => {
      if (selectedNodeData && nodeBasicData) {
        const nodePosition = selectedNodeRef.current.getBoundingClientRect();
        const { left, top, bottom, width } = nodePosition;

        const wWidth = document.body.clientWidth;
        const wHeight = document.body.clientHeight;
        const marginY = 50;
        /** 窗口一半宽度大于节点left,则浮窗在右半部分 */
        setPopoverConfig((draft) => {
          return {
            ...draft,
            data: nodeBasicData,
            show: true,
            left: wWidth / 2 > left ? left + width + 8 : left - 360 - 8, //360为浮窗宽度
            bottom: wHeight - bottom > marginY ? wHeight - bottom : wHeight - top,
          };
        });
      } else {
        setPopoverConfig((draft) => {
          return { ...draft, show: false };
        });
      }
    },
    [nodeBasicData, selectedNodeData],
    { wait: 0 },
  );

  return (
    <div ref={screenRef}>
      <SVG ref={ref} width={width} height={height}></SVG>
      <Zoom
        zoom={transform}
        scale={[0.5, 2]}
        onZoom={(zoom) => {
          mindMapRef.current.scaleTo(zoom);
        }}
      />
      <Tooltip svgRef={ref} />
      <Popover
        {...popoverConfig}
        onClose={() => {
          setPopoverConfig((base) => {
            return { ...base, show: false };
          });
        }}
      />
    </div>
  );
};

export default memo(MindGraph);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #fff;
  background-size: contain;
  background-repeat: repeat;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 5px;
`;
