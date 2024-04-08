import * as React from 'react';
import { Text as NativeText, TextStyle } from 'react-native';
import { getLineHeight } from '../../Constants/Font';
import Colors from '../../Constants/Colors';

export type TextColorType =
  | 'regular'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'disabled'
  | 'white';

export type TextWeightType = 'regular' | 'bold' | 'medium' | 'semi-bold';

type TextParam = {
  color?: TextColorType;
  weight?: TextWeightType;
  size?: number;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  strike?: boolean;
  underline?: boolean;
};

export type TextProps = TextParam & NativeText['props'];

const getTextStyle = ({
  color = 'regular',
  weight = 'regular',
  size = 16,
  align = 'auto',
  strike,
  underline,
}: TextParam): TextStyle => ({
  color: Colors[`text-${color}`] ?? Colors.text,
  fontSize: size,
  lineHeight: getLineHeight(size),
  fontFamily: `lato-${weight}`,
  textAlign: align,
  textDecorationLine: strike ? 'line-through' : underline ? 'underline' : undefined,
});

const Text = ({
  color,
  weight,
  size,
  align,
  strike,
  underline,
  style,
  children,
  ...props
}: TextProps) => {
  const textStyles = React.useMemo<TextStyle>(
    () => getTextStyle({ color, weight, size, align, strike, underline }),
    [color, weight, size, align],
  );
  return (
    <NativeText style={[textStyles, style]} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;
