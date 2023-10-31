import { useData } from '../../../shared/provider';

export const useEndCall = () => {
  const { peerConnection, setlocalStream, setType } = useData();

  function leave() {
    peerConnection.current.close();
    setlocalStream(null);
    setType('JOIN');
  }

  return () => {
    leave();
    setlocalStream(null);
  };
};
