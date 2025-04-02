// src/screens/auth/LoginScreen.jsx
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {useLoginMutation} from '../../api/auth';
import { setCredentials } from '../../redux/slice/authSlice';

const LoginScreen = ({navigation}) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("admin123@gmail.com");
  const [password, setPassword] = useState('admin@123');
  const [errorMsg, setErrorMsg] = useState('');

  const [login, {isLoading}] = useLoginMutation();

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMsg('Please fill in both fields.');
      return;
    }
    try {
      const userData = await login({email, password}).unwrap();
      console.log('userData :------ ', userData);
      // setEmail('');
      // setPassword('');
      // setErrorMsg('');
      dispatch(setCredentials({user: userData.user, token: userData.token}));

      // navigation.reset({index: 0, routes: [{name: 'tabs'}]});
    } catch (err) {
      
      console.error('Login error:', err);
      setErrorMsg('Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{height: 90, width: 200, alignSelf: 'center', marginTop: '25%'}}
        source={require('../../../assets/images/icon.png')}
      />
      <Text
        style={{fontSize: 30, fontWeight: 700, color: 'grey', marginTop: 10}}>
        Login
      </Text>
      <CustomInput
        value={email}
        onChangeText={setEmail}
        label="email"
        placeholder="Enter email"
      />
      <CustomPasswordInput
        value={password}
        onChangeText={setPassword}
        label="Password"
        placeholder="Enter Password"
      />
      <CustomButton
        text="login"
        style={{marginTop: 25}}
        onPress={handleSubmit}
      />
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
  },  errorText: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});

export default LoginScreen;
