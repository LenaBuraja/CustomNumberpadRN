import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Colors } from 'react-native-paper';

const Button = ({ title, grow, operation/*, onPress*/ }: { title: string, grow?: number, operation?: boolean/*, onPress: () => void */}) => {
  return (
    <View style={[styles.container, { flexGrow: grow || 1 }]}>
		<TouchableOpacity
			onPress={() => {console.log(title); /*onPress();*/}}
		>
			<Text style={[ styles.text, {color: operation ? Colors.blue600 : Colors.black}]}>{title}</Text>
		</TouchableOpacity>
    </View>
  );
};

export { Button };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	 borderColor: Colors.grey300,
	 borderWidth: 1,
	 //height: '25%',
  },
  text: {
	  fontSize: 25,
  }
});
