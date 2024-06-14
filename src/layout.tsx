import { Outlet, NavLink, useNavigation } from 'react-router-dom';

import styled from 'styled-components';

export default function Layout() {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <div className="header"></div>
      <div className="main">
        <aside>
          <div className="menu_item">
            <NavLink to="/user" end>
              user
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink to="/manage" end>
              manage
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink to="/file/123" end>
              file
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink to="/info" end>
              info
            </NavLink>
          </div>
        </aside>
        <section>
          {navigation.state === 'loading' && <div>数据加载中</div>}
          <Outlet />
        </section>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .header {
    height: 60px;
    border: 1px solid;
  }
  .main {
    height: calc(100vh - 60px);
    display: flex;
    aside {
      width: 260px;
      border: 1px solid;
      .active {
        color: red;
      }
    }
    section {
      flex: 1;
    }
  }
`;
