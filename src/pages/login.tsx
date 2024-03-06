import { useEffect, useRef } from 'react';

const Login = () => {
  const map = useRef<any>(null);

  //初始化
  useEffect(() => {
    import('@amap/amap-jsapi-loader').then((AMapLoader) => {
      AMapLoader.load({
        key: '', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          map.current = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 17,
            center: [116.397428, 39.90923], // 初始化地图中心点位置
          });
        })
        .catch((e) => {
          console.error('地图加载失败', e);
        });
    });
    return () => {
      map.current.destroy();
    };
  }, []);

  return <div id="container" style={{ width: '100%', height: '95vh' }}></div>;
};

export default Login;
