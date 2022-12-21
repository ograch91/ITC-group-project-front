import { useContext, useEffect, useRef } from 'react';
import { MainDataContext } from '../../../Context/MainDataContext';

export const ScrollToBottom = () => {
  const containerRef = useRef(null);

  const mainData = useContext(MainDataContext);
  const messagesPerChat = mainData.refs?.messagesPerChat_valRef?.current;

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messagesPerChat]);

  return <div ref={containerRef}></div>;
};
