import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PopupDetailScreen = ({ route }) => {
  const { popup } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{popup?.nombre || 'Detalle del Popup'}</Text>
      <Text style={styles.text}>{popup?.direccion || ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
});

export default PopupDetailScreen; 