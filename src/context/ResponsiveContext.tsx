//this didnt work how I wanted...will revisit later my janky hook works for now on app.tsx and thats the only place that has probs
import React, { createContext, useContext, useState, useEffect } from 'react';


const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

const ResponsiveContext = createContext<boolean>(false);

export const ResponsiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value = isMobile || isMobileDevice;

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => useContext(ResponsiveContext);