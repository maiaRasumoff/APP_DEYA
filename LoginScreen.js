import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import supabase from './lib/supabase';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const emailTrimmed = email.trim().toLowerCase();
    const passwordTrimmed = password.trim();
    
    // Validaciones básicas
    if (!emailTrimmed) {
      Alert.alert('Error', 'Por favor ingresa tu email.');
      return;
    }
    
    if (!passwordTrimmed) {
      Alert.alert('Error', 'Por favor ingresa tu contraseña.');
      return;
    }

    setLoading(true);
    try {
      // Consultar directamente en la tabla usuario
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('email', emailTrimmed)
        .eq('contrasenia', passwordTrimmed)
        .maybeSingle();

      if (error) {
        console.log('Error en consulta:', error);
        Alert.alert('Error', 'Error de conexión. Intenta nuevamente.');
        return;
      }

      if (!data) {
        Alert.alert('Error', 'Email o contraseña incorrectos.');
        return;
      }

      console.log('Usuario autenticado:', data);
      Alert.alert('Éxito', `Bienvenido ${data.nombreuser}!`);
      navigation.replace('Home');
      
    } catch (err) {
      console.log('Error en login:', err);
      Alert.alert('Error', 'Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" accessibilityLabel="Logo DEYÁ" />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Iniciá Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          accessible
          accessibilityLabel="Campo de email"
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
            accessible
            accessibilityLabel="Campo de contraseña"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
            accessible
            accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>¿No tenés una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Registrate</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Botón continuar"
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continuar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 12,
  },
  logo: {
    width: 180,
    height: 90,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
    borderRadius: 28,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 8,
    marginTop: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 22,
    color: '#222',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
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
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 18,
  },
  registerText: {
    fontSize: 13,
    color: '#888',
    marginRight: 4,
  },
  registerLink: {
    fontSize: 13,
    color: '#FF5BA0',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#FF5BA0',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default LoginScreen;
