const Layout = ({ children }) => (
  <div style={{ paddingTop: '125px' }}> {/* 72px header + ~53px nav */}
    {children}
  </div>
);
export default Layout;