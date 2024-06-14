import { redirect, defer } from 'react-router-dom';

export function protectedLoader() {
  if (!localStorage.getItem('token')) {
    return redirect('/login');
  }
  return null;
}

/* 模拟网络接口 */
function getToken(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 2000);
  });
}

export async function tokenLoader() {
  const num = await getToken();
  //如果随机数大于0.5则重定向到登录页
  if (num > 0.5) {
    return redirect('/login');
  } else {
    return null;
  }
}

export interface User {
  id: number;
  name: string;
}

/* 模拟网络接口 */
function getUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'zhangsan' },
        { id: 2, name: 'lisi' },
      ]);
    }, 2000);
  });
}

export function usersLoader() {
  const userPromise = getUsers();
  return defer({ data: userPromise });
}
