import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();
  //错误信息，可用来错误上报
  // eslint-disable-next-line no-console
  console.log(error);
  return <>错误页面</>;
}
