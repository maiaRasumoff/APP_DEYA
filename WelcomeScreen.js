import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo arriba */}
      <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />

      {/* Imagen circular central con íconos decorativos */}
      <View style={styles.imageContainer}>
        <Image source={require('./assets/popup.jpg')} style={styles.popupImage} />
        {/* Íconos decorativos (pueden ser imágenes o vistas simuladas) */}
        <View style={[styles.icon, styles.iconTopRight]} />
        <View style={[styles.icon, styles.iconBottomLeft]} />
        <View style={[styles.icon, styles.iconBottomRight]} />
      </View>

      {/* Título y subtítulo */}
      <Text style={styles.title}>Pop-ups cerca tuyo.</Text>
      <Text style={styles.subtitle}>
        Deyá te muestra dónde y cuándo encontrarlos, mientras sumás puntos por visitarlos.
      </Text>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}> 
          <Text style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ICON_SIZE = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  logo: {
    width: 70,
    height: 50,
    marginBottom: 16,
    marginTop: 8,
  },
  imageContainer: {
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    position: 'absolute',
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    // Simulación de ícono: podés reemplazar por <Image ... />
  },
  iconTopRight: {
    top: 10,
    right: -18,
    backgroundColor: '#FDE68A', // Amarillo
  },
  iconBottomLeft: {
    bottom: 10,
    left: -18,
    backgroundColor: '#A7F3D0', // Verde agua
  },
  iconBottomRight: {
    bottom: 10,
    right: -18,
    backgroundColor: '#FBCFE8', // Rosa claro
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
    color: '#222',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
  },
  registerButton: {
    backgroundColor: '#F472B6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#F472B6',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen; 