import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from './Button';

/*interface IProps {
	children?: ReactNode;
	title?: string;
	handelDismiss: () => void;
	handelApply: () => void;
}*/

const Keypad = (/*{ children, title, handelDismiss, handelApply }: IProps*/) => {
	return (
		<View style={styles.container}>
			<View style={styles.keypad}>
			{/*<TouchableWithoutFeedback accessible >*/}
			{/*<BottomSheetModal ref={sheetRef} snapPoints={snapPoints} backdropComponent={BottomSheetBackdrop}>*/}
				<View style={styles.keypadRow}>
					<Button title={'7'} />
					<Button title={'8'} />
					<Button title={'9'} />
					<Button title={'C'} operation />
				</View>
				<View style={styles.keypadRow}>
					<Button title={'4'} />
					<Button title={'5'} />
					<Button title={'6'} />
					<Button title={'−'} operation />
				</View>
				<View style={styles.keypadRow}>
					<Button title={'1'} />
					<Button title={'2'} />
					<Button title={'3'} />
					<Button title={'+'} operation />
				</View>
				<View style={styles.keypadRow}>
					<Button title={'0'} grow={2} />
					<Button title={'.'} />
					<Button title={'='} operation />
				</View>
			</View>
			{/*</TouchableWithoutFeedback>*/}
			{/*</BottomSheetModal>*/}
		</View>
  );
};

export { Keypad };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//width: '100%',
		//height: '100%',
		//position: 'absolute',
		//backgroundColor: '#ddd',
		//alignItems: 'center',
		//justifyContent: 'flex-end',
		//height: '40%',
	},
	keypad: {
		flex: 1,
		//height: '40%',
	},
	keypadRow: {
		flex: 1,
		flexDirection: 'row',
		//alignItems: 'stretch',
		justifyContent: 'space-evenly',
	},
});
