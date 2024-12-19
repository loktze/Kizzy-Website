// src/components/Layout.tsx
import React from 'react';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="overflow-x-hidden">{children}</div>;
};

export default Layout;
