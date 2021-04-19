import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from 'react-native-paper';

const Button = ({ title, grow = 1, operation, onPress }: { title: string, grow?: number, operation?: boolean, onPress: () => void }) => {
  return (
		<TouchableOpacity
			onPress={() => {onPress();}}
      style={[styles.container, { flexGrow: grow, paddingLeft: grow > 1 ? grow : 0 }]}
		>
			<Text style={[ styles.text, {color: operation ? Colors.blue600 : Colors.black}]}>{title}</Text>
		</TouchableOpacity>
  );
};

export { Button };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  text: {
	  fontSize: 25,
  }
});
