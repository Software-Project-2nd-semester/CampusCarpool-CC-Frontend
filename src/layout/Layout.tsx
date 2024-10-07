import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Main from './Main';

const Layout = () => {
  const location = useLocation();

  // Footer를 보여줄 경로를 정의합니다.
  const showFooterPaths = ['/home', '/chat', '/create', '/user', '/map']; // Footer를 표시할 경로를 여기에 추가

  const showFooter = showFooterPaths.includes(location.pathname);

  return (
    <>
      <Main />
      {showFooter && <Footer />} {/* 조건에 따라 Footer를 렌더링 */}
    </>
  );
};

export default Layout;
