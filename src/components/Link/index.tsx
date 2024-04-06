import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';

interface LinkProps {
  children: string;
  hasUnderline?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  children,
  hasUnderline,
}: LinkProps) => {
  return (
    <TouchableOpacity>
      <Text style={[styles.link, hasUnderline && styles.underline]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
