import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import styled from 'styled-components';

const Home = () => {
  return (
    <Wrapper>
      <div className="header"></div>
      <div className="main">
        <aside>
          <div className="menu_item">
            <NavLink to="/" end>
              user
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink to="/manage" end>
              manage
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink to="/file" state={{ id: 1 }} end>
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
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </section>
      </div>
    </Wrapper>
  );
};

export default Home;

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
