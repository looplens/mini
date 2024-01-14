import Layout from '../../layout';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../Login/styles';
import { AntDesign } from '@expo/vector-icons';
import {
  ScrollView,
  Image,
  Keyboard,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { API_URL, THEME_COLOR, WINDOW_HEIGHT } from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiRequest from '../../utils/apiRequest';
import { saveLocal } from '../../utils/localStorage';
import { setToken, setSessionStatus, setUser } from '../../store/reducers/sessionSlice';
import { useDispatch } from 'react-redux';

function Register() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation() as any;
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    errMessage_1: "",
    errMessage_2: "",
    errMessage_3: "",
    errMessage_4: "",
  });

  const [activeInput, setActiveInput] = useState<number>(0);
  const [onLoading, setLoading] = useState<boolean>(false);

  const handleInputFocus = useCallback((index: number) => {
    setActiveInput(index);
  }, []);

  const handleInputBlur = useCallback(() => {
    setActiveInput(0);
  }, []);

  const resetErrorMessages = () => {
    setErrorMessages({
      errMessage_1: "",
      errMessage_2: "",
      errMessage_3: "",
      errMessage_4: "",
    });
  };

  const sendCredentials = async () => {
    resetErrorMessages();
    setLoading(true);

    if (username.length === 0)
      setErrorMessages((prevState) => ({
        ...prevState,
        errMessage_1: "Kullanıcı adını boş bırakamazsın!",
      }));

    if (password.length === 0)
      setErrorMessages((prevState) => ({
        ...prevState,
        errMessage_2: "Şifre girmen gerekiyor!",
      }));

    if (email.length === 0)
      setErrorMessages((prevState) => ({
        ...prevState,
        errMessage_3: "E-Posta adresini boş bırakamazsın!",
      }));

    if (rePassword.length === 0)
      setErrorMessages((prevState) => ({
        ...prevState,
        errMessage_4: "Şifre girmen gerekiyor!",
      }));

    if (password !== rePassword)
      return setErrorMessages((prevState) => ({
        ...prevState,
        errMessage_4: "Şifre takrarı, ilk girdiğin şifre ile eşleşmiyor!",
      }));

    apiRequest({
      url: "/users/register",
      data: {
        name: username,
        email: email,
        username: username,
        password: password,
        password_control: rePassword,
      },
      method: "POST",
      callback: (response) => {
        setLoading(false);

        if (response.data.status) {
          const token = String(response.data.user.token)

          saveLocal("user_token", token);
          dispatch(setToken(token))
          dispatch(setSessionStatus(true))
          dispatch(setUser(response.data.user))
        } else {
          if (response.data.message_code) {
            switch (response.data.message_code) {
              case 6:
                setErrorMessages((prevState) => ({
                  ...prevState,
                  errMessage_3: "E-Posta adresinde bir terslik var!",
                }));
                break;

              case 4:
                if (response.data.message === "username") {
                  setErrorMessages((prevState) => ({
                    ...prevState,
                    errMessage_1: username.length === 0 ? "Kullanıcı adı boş bırakılamaz" : "Bu kullanıcı adı zaten kullanılıyor.",
                  }));
                } else {
                  setErrorMessages((prevState) => ({
                    ...prevState,
                    errMessage_3: "Bu e-posta adresi zaten kullanılıyor.",
                  }));
                }
                break;

              case 3:
              case 2:
                setErrorMessages((prevState) => ({
                  ...prevState,
                  errMessage_1: "Kullanıcı adı çok uzun (maksimum 32 karakter)",
                }));
                break;
            }
          }
        }
      },
    });
  };

  return (
    <Layout tabs={false} statusBar={"light"} backgroundColor={"#000"}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ ...styles.container, height: WINDOW_HEIGHT - (insets.top + insets.bottom) }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.go_back_button_container}>
          <AntDesign name="arrowleft" size={28} color="#fff" />
          <Text style={styles.go_back_title}>Kayıt Ol</Text>
        </TouchableOpacity>

        {onLoading && (
          <View style={styles.loading_container}>
            <ActivityIndicator size="large" color={THEME_COLOR} />
          </View>
        )}

        {!onLoading && (
          <ScrollView>
            <View style={styles.form_container}>
              <View style={styles.form_item}>
                <Text style={styles.form_title}>Kullanıcı Adı</Text>
                <TextInput
                  style={[
                    styles.form_textinput,
                    activeInput === 1 && styles.form_textinput_focus,
                  ]}
                  autoComplete={"username"}
                  autoCapitalize={"none"}
                  onFocus={() => handleInputFocus(1)}
                  onBlur={handleInputBlur}
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                />
                {errorMessages.errMessage_1.length !== 0 && (
                  <Text style={styles.form_warning}>{errorMessages.errMessage_1}</Text>
                )}
              </View>
              <View style={styles.form_item}>
                <Text style={styles.form_title}>E-Posta</Text>
                <TextInput
                  style={[
                    styles.form_textinput,
                    activeInput === 3 && styles.form_textinput_focus,
                  ]}
                  autoComplete={"email"}
                  autoCapitalize={"none"}
                  onFocus={() => handleInputFocus(3)}
                  onBlur={handleInputBlur}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />
                {errorMessages.errMessage_3.length !== 0 && (
                  <Text style={styles.form_warning}>{errorMessages.errMessage_3}</Text>
                )}
              </View>
              <View style={styles.form_item}>
                <Text style={styles.form_title}>Şifre</Text>
                <TextInput
                  secureTextEntry={true}
                  style={[
                    styles.form_textinput,
                    activeInput === 2 && styles.form_textinput_focus,
                  ]}
                  autoCapitalize={"none"}
                  onFocus={() => handleInputFocus(2)}
                  onBlur={handleInputBlur}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                />
                {errorMessages.errMessage_2.length !== 0 && (
                  <Text style={styles.form_warning}>{errorMessages.errMessage_2}</Text>
                )}
              </View>
              <View style={styles.form_item}>
                <Text style={styles.form_title}>Şifre Tekrarı</Text>
                <TextInput
                  secureTextEntry={true}
                  style={[
                    styles.form_textinput,
                    activeInput === 4 && styles.form_textinput_focus,
                  ]}
                  autoCapitalize={"none"}
                  onFocus={() => handleInputFocus(4)}
                  onBlur={handleInputBlur}
                  onChangeText={(text) => setRePassword(text)}
                  value={rePassword}
                />
                {errorMessages.errMessage_4.length !== 0 && (
                  <Text style={styles.form_warning}>{errorMessages.errMessage_4}</Text>
                )}
              </View>

              <Text style={styles.form_bottom_texts_gray}>
                Looplens, hesabınızla ilgili bilgi vermek için e-posta adresinize ileti gönderebilir.
              </Text>
              <Text style={styles.form_bottom_texts_gray}>
                Kaydol düğmesine tıklandığında Looplens'in hizmet koşullarını kabul etmiş ve gizlilik
                sözleşmesini onaylamış sayılırsınız.
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  sendCredentials();
                  Keyboard.dismiss();
                  setActiveInput(0);
                }}
                style={styles.form_button}>
                <Text style={styles.form_button_text}>Kaydol</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </Layout>
  );
}

export default Register;
