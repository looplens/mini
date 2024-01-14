import Layout from '../../layout';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { AnimatePresence, MotiView } from 'moti';
import { AntDesign } from '@expo/vector-icons';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WINDOW_HEIGHT } from '../../constants';

function Login() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation() as any;

  const [activeInput, setActiveInput] = useState(0);
  const [keyboardActive, setKeyboardActive] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [errMessage_1, setErrMessage_1] = useState("");
  const [errMessage_2, setErrMessage_2] = useState("");

  const sendCredentials = () => {
    setErrMessage_1("")
    setErrMessage_2("")

    if (username.length === 0) setErrMessage_1("Kullanıcı adını boş bırakamazsın!")
    if (password.length === 0) return setErrMessage_2("Şifre girmen gerekiyor!")
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardActive(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardActive(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, []);

  return (
    <Layout tabs={false} statusBar={"light"} backgroundColor={"#000"}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          ...styles.container,
          height: WINDOW_HEIGHT - (insets.top + insets.bottom) - 0
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.go_back_button_container}>
          <AntDesign name="arrowleft" size={28} color="#FFFFFFC6" />
        </TouchableOpacity>

        <AnimatePresence>
          <MotiView
            style={styles.greettings_header}
            animate={{
              height: keyboardActive ? 0 : 230,
              padding: keyboardActive ? 0 : 30,
              opacity: keyboardActive ? 0 : 1
            }}
            transition={{
              duration: 400,
              type: "timing",
            }}>
            <Image
              source={require("../../assets/icon.png")}
              style={styles.logo}
            />
            <Text style={styles.greettings_header_title}>Tekrardan hoş geldin!</Text>
            <Text style={styles.greettings_header_subtitle}>Seni tekrar aramızda gördüğümüze sevindik!</Text>
          </MotiView>
        </AnimatePresence>

        <View style={styles.form_container}>
          <View style={styles.form_item}>
            <Text style={styles.form_title}>Kullanıcı Adı</Text>
            <TextInput
              style={[styles.form_textinput, activeInput === 1 && styles.form_textinput_focus]}
              autoCapitalize={"none"}
              onFocus={() => setActiveInput(1)}
              onBlur={() => setActiveInput(0)}
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            {errMessage_1.length !== 0 && <Text style={styles.form_warning}>{errMessage_1}</Text>}
          </View>
          <View style={styles.form_item}>
            <Text style={styles.form_title}>Şifre</Text>
            <TextInput
              secureTextEntry={true}
              style={[styles.form_textinput, activeInput === 2 && styles.form_textinput_focus]}
              autoCapitalize={"none"}
              onFocus={() => setActiveInput(2)}
              onBlur={() => setActiveInput(0)}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            {errMessage_2.length !== 0 && <Text style={styles.form_warning}>{errMessage_2}</Text>}
          </View>

          <Text style={styles.form_bottom_texts}>Şifreni mi unuttun?</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              sendCredentials()
              Keyboard.dismiss()
              setActiveInput(0)
            }}
            style={styles.form_button}>
            <Text style={styles.form_button_text}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  )
}

export default Login
