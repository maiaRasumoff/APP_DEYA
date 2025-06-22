import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import supabase from './lib/supabase';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // 🔍 Verifica conexión con Supabase y muestra datos
  useEffect(() => {
    const fetchTestData = async () => {
      const { data, error } = await supabase.from('usuario').select('*');
      if (error) {
        console.error('Error al cargar datos:', error.message);
      } else {
        setTestData(data);
      }
      setLoadingData(false);
    };
    fetchTestData();
  }, []);

  const handleRegister = async () => {
    const emailTrimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailTrimmed || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
  
    if (!emailRegex.test(emailTrimmed)) {
      Alert.alert('Error', 'El email ingresado no es válido.');
      return;
    }
  
    setLoading(true);
  
    try {
      // 1. Crear usuario en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: emailTrimmed,
        password: password,
      });
  
      if (error) throw error;
  
      // 2. Obtener el ID del nuevo usuario
      const userId = data.user?.id;
      if (!userId) throw new Error("No se pudo obtener el ID del usuario");
  
      // 3. Insertar datos personalizados en tabla "usuario"
      const { error: dbError } = await supabase.from('usuario').insert([
        {
          mail: emailTrimmed,
          // Agregá aquí más campos si los pedís en el formulario (nombreUser, idEstilo, etc.)
        },
      ]);
  
      if (dbError) throw dbError;
  
      Alert.alert('¡Registro exitoso!', 'Revisa tu correo para confirmar tu cuenta.');
      navigation.replace('Home');
    } catch (err) {
      console.error('Registro fallido:', err.message);
      Alert.alert('Error', err.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Icono volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#222" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Contenedor tipo tarjeta */}
      <View style={styles.card}>
        <Text style={styles.title}>Crea tu cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword((prev) => !prev)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Separador */}
        <View style={styles.separatorRow}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>registrate con</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Íconos sociales */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('./assets/X_Logo.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('./assets/Google_Logo.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('./assets/Facebook_Logo.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {/* 🔍 Verificación conexión a Supabase */}
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Datos desde Supabase:</Text>
          {loadingData ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <FlatList
              data={testData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={{ fontSize: 12, marginBottom: 4 }}>{JSON.stringify(item)}</Text>
              )}
            />
          )}
        </View>

        {/* Botón registrarse */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerButtonText}>Registrarse</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  backButton: {
    position: 'absolute',
    top: 32,
    left: 18,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 12,
  },
  logo: {
    width: 70,
    height: 50,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 28,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 8,
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 22,
    color: '#222',
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 13,
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  separatorLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 13,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 22,
    gap: 18,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  registerButton: {
    backgroundColor: '#F472B6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },});

export default RegisterScreen;
