import { useEffect, useRef, useState } from 'react';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img); //接收file对象或blob，返回Base64
};

const User = () => {
  const eleFile = useRef();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    //压缩图片需要的一些元素和对象
    const img = new Image();

    //选择的文件对象
    let file = null;

    //缩放图片需要的canvas
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    eleFile.current.addEventListener('change', function (event) {
      file = event.target.files[0];
      //将未压缩的图片转为base64
      getBase64(file, (url) => {
        img.src = url;
      });
    });

    img.onload = function () {
      //图片原始尺寸
      let originWidth = this.width,
        originHeight = this.height;
      //最大尺寸限制
      let maxWidth = 400,
        maxHeight = 400;
      //目标尺寸
      let targetWidth = originWidth,
        targetHeight = originHeight;
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > 1) {
          //更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }

      //canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      //清除画布
      context.clearRect(0, 0, targetWidth, targetHeight);
      //图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      //canvas转为blob并上传
      canvas.toBlob(function (blob) {
        //获取到 blob 流，进行网络请求
        request(blob);
        //将压缩后的图片转为DOMString
        getDOMString(blob);
      }, file.type || 'image/png');
    };
  }, []);

  const request = (blob) => {
    const formData = new FormData();
    formData.append('file', blob);

    fetch('http://127.0.0.1:9000/api/uploadImage', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 123',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        // console.log('Success:', result);
      })
      .catch(() => {
        // console.error('Error:', error);
      });
  };

  const getDOMString = (img) => {
    const url = URL.createObjectURL(img);
    setImageUrl(url);
  };

  const removeUrl = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  };

  return (
    <div>
      <img src={imageUrl} onLoad={removeUrl} />
      <br />
      <input type="file" ref={eleFile} />
    </div>
  );
};

export default User;
