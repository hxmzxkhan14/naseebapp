import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { lightTheme } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  elevation?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'medium',
  margin = 'none',
  elevation = 'small',
}) => {
  const getPaddingStyle = () => {
    switch (padding) {
      case 'none': return styles.paddingNone;
      case 'small': return styles.paddingSmall;
      case 'medium': return styles.paddingMedium;
      case 'large': return styles.paddingLarge;
      default: return styles.paddingMedium;
    }
  };

  const getMarginStyle = () => {
    switch (margin) {
      case 'none': return styles.marginNone;
      case 'small': return styles.marginSmall;
      case 'medium': return styles.marginMedium;
      case 'large': return styles.marginLarge;
      default: return styles.marginNone;
    }
  };

  const getElevationStyle = () => {
    switch (elevation) {
      case 'none': return styles.elevationNone;
      case 'small': return styles.elevationSmall;
      case 'medium': return styles.elevationMedium;
      case 'large': return styles.elevationLarge;
      default: return styles.elevationSmall;
    }
  };

  const cardStyle = [
    styles.base,
    getPaddingStyle(),
    getMarginStyle(),
    getElevationStyle(),
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.borderRadius.lg,
  },
  // Padding variants
  paddingNone: {},
  paddingSmall: {
    padding: lightTheme.spacing.sm,
  },
  paddingMedium: {
    padding: lightTheme.spacing.md,
  },
  paddingLarge: {
    padding: lightTheme.spacing.lg,
  },
  // Margin variants
  marginNone: {},
  marginSmall: {
    margin: lightTheme.spacing.sm,
  },
  marginMedium: {
    margin: lightTheme.spacing.md,
  },
  marginLarge: {
    margin: lightTheme.spacing.lg,
  },
  // Elevation variants
  elevationNone: {},
  elevationSmall: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  elevationMedium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 10,
  },
  elevationLarge: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8.65,
    elevation: 15,
  },
}); 