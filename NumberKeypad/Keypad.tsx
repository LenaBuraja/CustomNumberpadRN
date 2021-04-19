import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import { Button } from './Button';

interface IProps {
	oldValue?: string;
	handelDismiss: () => void;
	handelApply: (newValue: string) => void;
}

interface IKey {
	title: string;
	grow?: number; 
	operation?: boolean;
	onPress: () => void;

}

const Keypad = ({ oldValue, handelDismiss, handelApply }: IProps) => {
	const [expression, setExpression ] = useState('');
	const [number, setNumber ] = useState('');
	
	const handleNumberPress = ({value}: {value: string}) => {
		setNumber((prev) => {
			value = `${prev}${value}`;
			value = Number.isNaN(parseFloat(value)) ? '0' : value ?? '0';

			const validNumber = new RegExp(/^(\d{1,6}(.))?\d{0,4}$/);
			return validNumber.test(value) ? value : prev;
		});
	};

	const handleOperationPress = ({value}: {value: string}) => {
		if (!expression && !!oldValue && !number) {
			setExpression((prev) => `${prev}${oldValue}${value}`);
		}
		else if (!!number) {
			setExpression((prev) => `${prev}${number}${value}`);
			setNumber('');
		} else {
			setExpression((prev) => `${prev.slice(0, -1)}${value}`);
		}
	};

	const keys: IKey[][] = [
		[
			{ title: '7', onPress: () => handleNumberPress({value: '7'}) },
			{ title: '8', onPress: () => handleNumberPress({value: '8'}) },
			{ title: '9', onPress: () => handleNumberPress({value: '9'}) },
			{ title: 'C', onPress: () => setNumber(''), operation: true }
		],
		[
			{ title: '4', onPress: () => handleNumberPress({value: '4'}) },
			{ title: '5', onPress: () => handleNumberPress({value: '5'}) },
			{ title: '6', onPress: () => handleNumberPress({value: '6'}) },
			{ title: '−', onPress: () => handleOperationPress({value: '-'}), operation: true }
		],
		[
			{ title: '1', onPress: () => handleNumberPress({value: '1'}) },
			{ title: '2', onPress: () => handleNumberPress({value: '2'}) },
			{ title: '3', onPress: () => handleNumberPress({value: '3'}) },
			{ title: '+', onPress: () => handleOperationPress({value: '+'}), operation: true }
		],
		[
			{ title: '0', onPress: () => handleNumberPress({value: '0'}), grow: 2 },
			{ title: '.', onPress: () => handleNumberPress({value: '.'}) },
			{ title: '=', onPress: () => {handelApply(evaluate(`${expression}${number}`).toFixed(3).toString()); handelDismiss();}, operation: true }
		],
	];	
	
	return (
		<>
			<View style={{height: 50, backgroundColor: Colors.white, borderTopWidth: 1, borderColor: Colors.grey300}}>
				<Text>{expression}</Text>
				<Text style={{fontSize: 18, color: Colors.blue600}}>{number}</Text>
			</View>
			<View style={styles.keypad}>
				{
					keys.map((rowKeys, idx) => (
						<View key={idx} style={styles.keypadRow}>
							{rowKeys.map(keyProps => (<Button key={keyProps.title} {...keyProps} />))}
						</View>
					))
				}
			</View>
		</>
  );
};

export { Keypad };

const styles = StyleSheet.create({
	keypad: {
		flex: 1,
		backgroundColor: Colors.grey300,
	},
	keypadRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
});
