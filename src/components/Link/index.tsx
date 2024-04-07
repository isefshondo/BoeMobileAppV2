import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';

interface LinkProps {
  children: string;
  handleLinkClick: () => void;
  hasUnderline?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  children,
  handleLinkClick,
  hasUnderline,
}: LinkProps) => {
  return (
    <TouchableOpacity onPress={handleLinkClick}>
      <Text style={[styles.link, hasUnderline && styles.underline]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
