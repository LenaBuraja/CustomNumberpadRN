import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Colors } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

const TextInputWithIcon = ({ label, value, onPress, children: icon, isFocus = false }: { label: string, value: string, onPress: () => void, children: ReactNode, isFocus?: boolean }) => {
	const { colors } = useTheme();
  return (
	<TouchableOpacity
		onPress={onPress}
		style={[
			styles.container,
			{
				backgroundColor: colors.card,
				borderBottomWidth: isFocus ? 2 : 1,
				borderColor: isFocus ? colors.primary : Colors.grey400,
				marginBottom: isFocus ? 0 : 0.5,
			},
		]}
	>
		<Text style={[styles.subdivisionText, { color: colors.primary, paddingLeft: 12 }]}>{label}</Text>
		<View
			style={styles.containerDate}
		>
			<Text style={[styles.textDate, { color: colors.text, fontSize: 16 }]}>{value}</Text>
			{icon}
		</View>
 </TouchableOpacity>
);
};

export { TextInputWithIcon };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
	},
	containerDate: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
	},
	subdivisionText: {
		fontSize: 11,
		textAlign: 'left',
	 },
	 textDate: {
		flex: 1,
		flexGrow: 4,
		fontSize: 20,
		paddingLeft: 12,
	 },
	 
  });
