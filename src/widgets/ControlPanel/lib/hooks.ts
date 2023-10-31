import { useEffect } from 'react';
import InCallManager from 'react-native-incall-manager';


export const useControlPanel = () => {
  useEffect(() => {
    InCallManager.start();
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);

    return () => {
      InCallManager.stop();
    };
  }, []);
};
