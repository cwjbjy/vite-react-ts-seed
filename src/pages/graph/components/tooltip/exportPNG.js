import { Canvg } from 'canvg';
import { saveAs } from 'file-saver';

// import qrcode from './img/qrcode.png';
// import search from './img/search.png';

const graphExportFooterHeight = 92;
const designX = 1920; //设计稿宽度

function read_Element(ParentNode, OrigData) {
  const ContainerElements = ['svg', 'g'],
    RelevantStyles = {
      rect: ['fill', 'stroke', 'stroke-width'],
      path: ['fill', 'stroke', 'stroke-width'],
      circle: ['fill', 'stroke', 'stroke-width', 'r', 'transform'],
      line: ['stroke', 'stroke-width'],
      text: ['fill', 'font-size', 'text-anchor', 'transform'],
      polygon: ['stroke', 'fill'],
    };

  let Children = ParentNode.childNodes,
    OrigChildDat = OrigData.childNodes;

  for (let cd = 0, len = Children.length; cd < len; cd++) {
    let Child = Children[cd];

    let TagName = Child.tagName;
    if (ContainerElements.indexOf(TagName) !== -1) {
      read_Element(Child, OrigChildDat[cd]);
    } else if (TagName in RelevantStyles) {
      let StyleDef = window.getComputedStyle(OrigChildDat[cd]);

      let StyleString = '';
      for (let st = 0; st < RelevantStyles[TagName].length; st++) {
        StyleString +=
          RelevantStyles[TagName][st] + ':' + StyleDef.getPropertyValue(RelevantStyles[TagName][st]) + '; ';
      }

      Child.setAttribute('style', StyleString);
    }
    if (TagName === 'text') Child.setAttribute('dy', parseFloat(Child.getAttribute('dy') || 0) + 5);
  }
}

function downloadPNG(moduleName, svgDom, pngName) {
  const SVGElem = svgDom;
  const newSvgNode = SVGElem.cloneNode(true);
  newSvgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  //部分SVG新标签等API需要这个声明，否则canvg插件转canvas不识别
  newSvgNode.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  read_Element(newSvgNode, SVGElem);

  let newChart = newSvgNode.querySelector('.mind'),
    mindTransform = newChart.getAttribute('transform'),
    mindTArr = mindTransform.replace(/translate\((-?[0-9.]*)[^0-9-]*(-?[0-9.]*)\D*([0-9.]*)/g, '$1 $2 $3 ').split(' '),
    mX = parseFloat(mindTArr[0]),
    mY = parseFloat(mindTArr[1]),
    scale = parseFloat(mindTArr[2]),
    //需要导出的倍数
    needScale = 1,
    //实际原图节点
    actualMap = SVGElem.querySelector('.mind');

  //将原图缩放比例设为fixScale倍，用于获取其实际宽高
  actualMap.setAttribute('transform', `translate(${mX}, ${mY}) scale(${needScale})`);
  //源节点属性
  const originMapAttr = actualMap.getBBox();
  // console.log('originMapAttr----', originMapAttr);
  //边界填充值
  let margin = 100;
  //还原原图缩放比例
  actualMap.setAttribute('transform', `translate(${mX}, ${mY}) scale(${scale})`);
  //需要导出的新图谱的宽高
  const mapAttr = {
    width: originMapAttr.width * needScale + margin,
    height: originMapAttr.height * needScale + margin,
  };
  newSvgNode.style.width = mapAttr.width;
  newSvgNode.style.height = mapAttr.height;

  //导出图片的宽度，限定最小宽度1280
  const newMapWidth = Math.max(mapAttr.width + margin, 1280);
  //放大系数
  const k = newMapWidth / designX;
  //底部banner背景高度
  const bgHeight = Math.max(graphExportFooterHeight * k, graphExportFooterHeight);
  const marginY = 50;
  //新图的基本属性
  const newCanvasBasicAttr = {
    w: newMapWidth,
    h: mapAttr.height + bgHeight + marginY * k,
  };
  // chrome最大限制
  if (newCanvasBasicAttr.w * newCanvasBasicAttr.h > 268421360) {
    // message.error('图片超过浏览器大小限制，无法生成！');
    return;
  }
  //原svg图谱
  let graphImg = document.createElement('img');
  let graphCanvasEl = document.createElement('canvas');
  Canvg(graphCanvasEl, newSvgNode.outerHTML, {
    ignoreMouse: true,
    ignoreAnimation: true,
    log: true,
  });
  // console.log('graphCanvasEl', graphCanvasEl);
  graphImg.src = graphCanvasEl.toDataURL('image/png');

  //新生成的图片，用于下载
  let downloadCanvas = document.createElement('canvas');

  downloadCanvas.setAttribute('width', newCanvasBasicAttr.w);
  downloadCanvas.setAttribute('height', newCanvasBasicAttr.h);
  let ctx = downloadCanvas.getContext('2d');
  ctx.fillStyle = '#fff';

  /***********    用于调试   ***********/
  /*document.body.append(downloadCanvas);
  document.querySelector('#root').remove();*/
  /***********    用于调试    **********/
  ctx.fillRect(0, 0, newCanvasBasicAttr.w, newCanvasBasicAttr.h);

  //添加水印
  // const waterImg = new Image();
  // waterImg.src = require('./img/stockExportBg.png');
  // waterImg.onload = function () {
  //   ctx.fillStyle = ctx.createPattern(waterImg, 'repeat');
  //   ctx.fillRect(0, 0, newCanvasBasicAttr.w, newCanvasBasicAttr.h - bgHeight);
  //   // console.log('newCanvasBasicAttr.w', newCanvasBasicAttr.w);
  //   // console.log('22.w', newCanvasBasicAttr.h - bgHeight);
  // };

  graphImg.onload = function () {
    //画实际的图谱
    ctx.drawImage(
      graphImg,
      (newCanvasBasicAttr.w - mapAttr.width) / 2,
      (newCanvasBasicAttr.h - mapAttr.height - bgHeight - marginY * k) / 2,
    );

    //添加底部广告图
    ctx.fillStyle = '#2987f6';
    ctx.fillRect(0, newCanvasBasicAttr.h - bgHeight, newCanvasBasicAttr.w, bgHeight);

    try {
      let name = pngName;
      downloadCanvas.toBlob(function (blob) {
        saveAs(blob, `${moduleName}-${name}.png`);
      }, 'image/png');
    } catch (e) {
      // 没处理，防止出错
    }

    // const imgPromise = (imgSrc) => {
    //   return new Promise((resolve, reject) => {
    //     let img = new Image();
    //     img.src = imgSrc;
    //     img.onload = function () {
    //       resolve(img);
    //     };
    //     img.onerror = function () {
    //       reject(img);
    //     };
    //   });
    // };
    // //底部2个图片
    // Promise.all([imgPromise(search), imgPromise(qrcode)]).then((res) => {
    //   const adjustK = Math.max(k, 1);
    //   bgHeight > 0 &&
    //     ctx.drawImage(
    //       res[0],
    //       30 * adjustK,
    //       newCanvasBasicAttr.h - bgHeight + 16 * adjustK,
    //       568 * adjustK,
    //       60 * adjustK,
    //     );
    //   bgHeight > 0 &&
    //     ctx.drawImage(
    //       res[1],
    //       newCanvasBasicAttr.w - (121 + 76) * adjustK,
    //       newCanvasBasicAttr.h - bgHeight - 44 * adjustK,
    //       121 * adjustK,
    //       128 * adjustK,
    //     );
    //   try {
    //     let name = pngName;
    //     downloadCanvas.toBlob(function (blob) {
    //       saveAs(blob, `${moduleName}-${name}.png`);
    //     }, 'image/png');
    //   } catch (e) {
    //     // 没处理，防止出错
    //   }
    // });
  };
}

export default downloadPNG;
