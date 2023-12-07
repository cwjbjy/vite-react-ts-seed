/* echarts不同屏幕处理 */
export const handleScreen = (option: any, small: boolean) => {
  if (small) {
    option.xAxis = Object.assign(option.xAxis, {
      axisLabel: {
        fontSize: 10,
        rotate: -45,
      },
    });
  }
  return option;
};
