import { Text, TouchableOpacity, View } from 'react-native';
import { NewAnalysisButtonProps } from './types';
import { styles } from './styles';

export const NewAnalysisButton: React.FC<NewAnalysisButtonProps> = ({
  children,
  onPress,
  icon,
}) => {
  function renderIcon() {
    return (
      icon && (
        <>
          {icon}
          <View style={{ width: 17, height: '100%' }} />
        </>
      )
    );
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {renderIcon()}
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};
