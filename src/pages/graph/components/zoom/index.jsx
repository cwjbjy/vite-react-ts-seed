/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, memo } from 'react';

import { Slider } from 'antd';

import d3 from '../mindMap/d3.lib';

import ZoomWrap from './style';

let timer;

const linearBottom = d3.scaleLinear().domain([0, 50]).range([0.5, 1]);

const linearTop = d3.scaleLinear().domain([50, 100]).range([1, 2]);

const rLinearBottom = d3.scaleLinear().domain([0.5, 1]).range([0, 50]);

const rLinearTop = d3.scaleLinear().domain([1, 2]).range([50, 100]);

const revertVal = (val) => {
  return (val > 1 ? rLinearTop(val) : rLinearBottom(val))?.toFixed(0);
};

const tipFormatter = (val) => {
  return (val > 50 ? linearTop(val) : linearBottom(val)).toFixed(2);
};

const Zoom = memo(function Zoom({ onZoom, zoom }) {
  const stopRef = useRef(false);
  const [currentZoom, setCurrentZoom] = useState(revertVal(zoom));

  useEffect(() => {
    if (!stopRef.current) setCurrentZoom(revertVal(zoom));
  }, [zoom]);

  const onChange = (val) => {
    stopRef.current = true;
    let result = val > 50 ? linearTop(val) : linearBottom(val);

    onZoom(result);
    setCurrentZoom(val);

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      stopRef.current = false;
    }, 1000);
  };

  return (
    <ZoomWrap>
      <Slider vertical value={currentZoom} onChange={onChange} tooltip={{ formatter: tipFormatter }} />
    </ZoomWrap>
  );
});

export default Zoom;
