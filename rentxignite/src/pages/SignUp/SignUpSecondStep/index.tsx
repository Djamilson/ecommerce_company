import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import api from '../../../_services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  FormTitle,
  Steps,
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}
export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const theme = useTheme();

  const route = useRoute();
  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação.');
    }

    if (password != passwordConfirm) {
      return Alert.alert('As senhas não são iguais.');
    }

    try {
      await api.post('/user', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      });

      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta criada!',
        message: `Agora é só fazer login\ne aproveitar.`,
      });
    } catch (error) {
      console.log('my erro: ',error.message)
      Alert.alert(
        'Falha no cadastro!',
        'Ocorreu uma falha ao tentar fazer o cadastro, tente novamente!',
      );
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>

          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Sua senha"
              onChangeText={(e: any) => setPassword(e)}
              value={password}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={(e: any) => setPasswordConfirm(e)}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Próximo"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
