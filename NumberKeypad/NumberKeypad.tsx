import { useFocusEffect, useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View, BackHandler } from 'react-native';
import { Keypad } from './Keypad';
import { useHeaderHeight } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInputWithIcon } from './TextInputWithIcon';

const NumberKeypad = React.memo(({ isMyKeyboardVisible, label, value, setValue, handlePress }: { isMyKeyboardVisible: boolean, label: string, value: string, setValue: (newValue: string) => void, handlePress: () => void }) => {
	const { colors } = useTheme();
	const headerHeight = useHeaderHeight();

	 useFocusEffect(
		React.useCallback(() => {
			const handleBack = () => {
				if (isMyKeyboardVisible) {
					handlePress();
					return true;
				}
				return false;
		};
  
		  BackHandler.addEventListener('hardwareBackPress', handleBack);
  
		  return () =>
			 BackHandler.removeEventListener('hardwareBackPress', handleBack);
		}, [isMyKeyboardVisible, handlePress])
	 );

	return (
		<>
			<TextInputWithIcon label={label} onPress={handlePress} isFocus={isMyKeyboardVisible} value={value}>
				<MaterialCommunityIcons style={styles.marginRight} size={20} color={colors.text} name="calculator-variant" />
			</TextInputWithIcon>
			{ isMyKeyboardVisible &&
				<View style={[styles.keypad, {top: (Dimensions.get('window').height / 2.6) - (StatusBar.currentHeight || 0) - headerHeight + 8} ]}>
					<Keypad oldValue={value} handelApply={setValue} handelDismiss={() => handlePress()} />
				</View>
			}
		</>
	);
});

export { NumberKeypad };

const styles = StyleSheet.create({
	keypad: {
		height: Dimensions.get('window').height / 2.6,
		width: '100%',
		backgroundColor: '#DDD',
		position: 'absolute',
		zIndex: 99999,
	},
	marginRight: {
		marginRight: 10,
		alignItems: 'center',
	 },  
});
