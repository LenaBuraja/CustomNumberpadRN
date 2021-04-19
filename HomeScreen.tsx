import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { NumberKeypad } from './NumberKeypad/NumberKeypad';
import { TextInputWithIcon } from './NumberKeypad/TextInputWithIcon';

interface IProps {
  children?: unknown;
  stylesProp?: StyleProp<ViewStyle>;
  colorText?: string;
}

interface ITara {
  tarakey: number;
  name: string;
  type: 'paper' | 'box' | 'pan';
  quantity?: number;
  weight?: number;
}

const SubTitle = ({ children, stylesProp, colorText }: IProps) => {
  return (
    <View style={[styles.titleContainer, stylesProp]}>
      <Text style={[styles.titleText, {color: colorText }]}>{((children as string) || '').toUpperCase()}</Text>
    </View>
  );
};

interface IHeaderProps {
  text: string;
  onPress: () => void;
}

const HeaderRight = ({ text, onPress }: IHeaderProps) => {
	const { colors } = useTheme();
  return (
    <Button onPress={onPress} mode="text" color={colors.primary} style={{marginRight: 0}}>
      {text}
    </Button>
  );
};

const Section = ({ children, stylesProp }: IProps) => {
	const { colors } = useTheme();
  return (
    <View style={[styles.titleContainer, stylesProp]}>
      <Text style={[styles.titleText, {fontSize: 14}]}>{((children as string) || '').toUpperCase()}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const [goodQty, setGoodQty] = useState<string>('1');
  const [numreceive, setGoodQty2] = useState<string | undefined>();
  const tara: ITara[] | undefined = [{tarakey: 1, name: 'упаковка №1', type: 'box', quantity: 6, weight: 1}];

  const [isMyKeyboardVisible, setMyKeyboardVisible] = useState(false);
	const { colors } = useTheme();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <HeaderRight
          text="Отмена"
          onPress={() => {}}
        />
      ),
      headerRight: () => (
        <HeaderRight
          text="Готово"
          onPress={() => {}}
        />
      ),
    })});

  return (
    <View style={{flex: 1, backgroundColor: colors.card, justifyContent: 'space-between'}}>
    <View>
      <SubTitle stylesProp={[styles.title, { backgroundColor: colors.primary }]} colorText={'white'}>
        Продукт №1
      </SubTitle>
      <Section stylesProp={{ backgroundColor: colors.background, padding: 5 }}>Параметры</Section>
      <View style={{flexDirection: 'row', width: '100%', }}>
        <TextInput
          mode={'flat'}
          label={'Партия'}
          editable={true}
          onChangeText={setGoodQty2}
          onFocus={() => setMyKeyboardVisible(false)}
          value={numreceive ?? ''}
          theme={{
            colors: {
              placeholder: colors.primary,
            },
          }}
          style={{
            flex: 1,
            backgroundColor: colors.card,
          }}
        />
        <TextInputWithIcon label={'Дата производства'} value={'16.04.2021'} onPress={() => {}}>
          <MaterialIcons style={styles.marginRight} size={20} color={colors.text} name="date-range" />
        </TextInputWithIcon>
      </View>
      <Section stylesProp={{ backgroundColor: colors.background, padding: 5  }}>Отгружено</Section>
      <View style={{flexDirection: 'row', width: '100%', }}>
        <TextInput
          mode={'flat'}
          label={'По заявке'}
          editable={false}
          value={'50'}
          theme={{
            /*colors: {
              placeholder: colors.primary,
            },*/
          }}
          style={{
            flex: 1,
            backgroundColor: colors.card,
          }}
        />
        <NumberKeypad
          isMyKeyboardVisible={isMyKeyboardVisible}
          value={goodQty}
          setValue={setGoodQty}
          handlePress={() => {
            Keyboard.dismiss();
            setMyKeyboardVisible(!isMyKeyboardVisible);
          }}
          label={'Количество'}
        />
      </View>

      <TouchableOpacity style={styles.boxingsLine}>
        <View style={(styles.paddingLeft10, { width: '80%' })}>
          <Text
            style={
              // eslint-disable-next-line react-native/no-inline-styles
              {
                color: colors.primary,
                fontSize: tara && tara.length !== 0 ? 11 : 16,
              }
            }
          >
            Тара
          </Text>
          {tara && tara.length !== 0 ? (
            <Text>
              {tara.map(item => {
                return `${item.name}, `
              })}
            </Text>
          ) : null}
        </View>
        <MaterialIcons name="chevron-right" size={24} color={colors.primary} />
      </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Вы уверены, что хотите удалить позицию?', '', [
            {
              text: 'OK',
            },
            {
              text: 'Отмена',
            },
          ]);
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.button}>Удалить позицию</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxingsLine: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 60,
    padding: 10,
  },
  button: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    backgroundColor: '#FC3F4D',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    zIndex: 1,
  },
  marginRight: {
    marginRight: 10,
    alignItems: 'center',
  },
  paddingLeft10: {
  },
  title: {
    padding: 10,
  },
  titleContainer: {
    marginTop: 0,
  },
  titleText: {
    color: '#333536',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});