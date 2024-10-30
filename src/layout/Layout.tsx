import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Main from './Main';
import HeaderDefault from './HeaderDefault';
import HeaderBack from './HeaderBack';

const Layout = () => {
  const location = useLocation();

  // Footer를 보여줄 경로를 정의합니다.
  const showFooterPaths = ['/home', '/chat', '/create', '/user', '/map']; // Footer를 표시할 경로를 여기에 추가
  const showFooter = showFooterPaths.includes(location.pathname);

  const showHeaderDefaultPaths = ['/home', '/chat', '/create', '/user', '/map'];
  const showHeaderDefault = showHeaderDefaultPaths.includes(location.pathname);

  const showHeaderBackPaths = ['/create/createForm','/user/profile'];
  const showHeaderBack = showHeaderBackPaths.includes(location.pathname);


  return (
    <>
      {showHeaderDefault && <HeaderDefault />}
      {showHeaderBack && <HeaderBack />}
      <Main />
      {showFooter && <Footer />} {/* 조건에 따라 Footer를 렌더링 */}
    </>
  );
};

export default Layout;
