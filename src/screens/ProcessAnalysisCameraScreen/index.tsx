import { RootStackParams } from '@/navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import {Camera, useCameraDevice, useCameraPermission} from 'react-native-vision-camera';

type Props = NativeStackScreenProps<RootStackParams, 'ProcessAnalysisCamera'>;

export const ProcessAnalysisCameraScreen = ({route}: Props) => {
  const cowID = route.params.id ?? null;
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