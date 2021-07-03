import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Container, Header, Title, SubTitle, Form, Footer } from './styles';


export function SignIn() {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
  const theme = useTheme();
  const navigation = useNavigation();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate({ email, password });
      Alert.alert('Tudo certo');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Error na autenticação!',
          'Ocorreu um erro ao tentar fazer login, tente novamente',
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title>
              Etamos{'\n'}
              quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={(e: any) => setEmail(e)}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Sua senha"
              onChangeText={(e: any) => setPassword(e)}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              color={theme.colors.background_secundary}
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light={true}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
