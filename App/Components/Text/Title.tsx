import * as React from 'react';
import { Text as NativeText, StyleSheet, TextStyle } from 'react-native';
import Colors from '../../Constants/Colors';

type TextParam = {
  level?: keyof typeof styles;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};

export type TextProps = TextParam & NativeText['props'];

const Title = ({ level = 1, style, children, align = 'auto', ...rest }: TextProps) => (
  <NativeText style={[styles[level], { textAlign: align }, style]} {...rest}>
    {children}
  </NativeText>
);

const commonStyles: TextStyle = {
  fontSize: 16,
  fontFamily: 'lato-bold',
  color: Colors.heading,
};

const styles = StyleSheet.create({
  1: {
    ...commonStyles,
    fontFamily: 'lora-semi-bold',
    fontSize: 30,
    lineHeight: 38,
    marginBottom: 8,
    letterSpacing: -1,
  },
  2: {
    ...commonStyles,
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 8,
  },
  3: {
    ...commonStyles,
    fontSize: 16,
    lineHeight: 24,
  },
  4: {
    ...commonStyles,
    fontSize: 14,
    lineHeight: 22,
  },
});

export default Title;
