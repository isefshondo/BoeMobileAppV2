import React from 'react';
import { SafeAreaView } from 'react-native';
import {Camera, useCameraDevice, useCameraPermission} from 'react-native-vision-camera';

export const ProcessAnalysisCameraScreen = () => {
  const device = useCameraDevice("back");
  const {hasPermission, requestPermission} = useCameraPermission();
  const [permission, setPermission] = React.useState<boolean | null>(null);
  const cameraRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      const status = await requestPermission();

      setPermission(true);
    })()
  }, []);

  if (!permission) return <SafeAreaView/>;

  if (!device || device === null) return <SafeAreaView />

  return (
    <SafeAreaView>
      <Camera style={{flex: 1}} ref={cameraRef} device={device} isActive={true} orientation='portrait' resizeMode='cover' />
    </SafeAreaView>
  );
};