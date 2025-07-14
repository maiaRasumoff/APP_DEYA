import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

const { width } = Dimensions.get('window');

// Header con botón de retroceso y título centrado
const HeaderWithBack = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={26} color="#222" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
};

// Galería horizontal de imágenes
const Gallery = ({ images }) => {
  if (!images || images.length === 0) return null;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
      {images.map((img, idx) => (
        <Image
          key={idx}
          source={{ uri: img }}
          style={styles.galleryImage}
          resizeMode="cover"
        />
      ))}
      {images.length > 5 && (
        <View style={styles.galleryMore}>
          <Text style={styles.galleryMoreText}>{`+${images.length - 5}`}</Text>
        </View>
      )}
    </ScrollView>
  );
};

// Tabs de contenido
const PopupTabs = ({ popup }) => {
  const [tab, setTab] = useState(0);
  const tabColor = (i) => (tab === i ? styles.tabActive : styles.tabInactive);

  // Galería: por ahora, repetir la imagen principal
  const galleryImages = popup.imagen ? Array(5).fill(popup.imagen) : [];

  return (
    <View style={{ flex: 1 }}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setTab(0)}>
          <Text style={[styles.tabText, tabColor(0)]}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setTab(1)}>
          <Text style={[styles.tabText, tabColor(1)]}>Fecha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setTab(2)}>
          <Text style={[styles.tabText, tabColor(2)]}>Visitado</Text>
        </TouchableOpacity>
      </View>
      {/* Contenido de cada tab */}
      {tab === 0 && (
        <View style={styles.tabContent}>
          <Text style={styles.sectionTitle}>Detalles del pop-up</Text>
          <Text style={styles.sectionText} numberOfLines={5} ellipsizeMode="tail">
            {popup.detalle ? popup.detalle : 'No cargado'}
          </Text>
          {!popup.detalle && <Text style={styles.sectionLeerMas}>No cargado</Text>}
        </View>
      )}
      {tab === 1 && (
        <View style={styles.tabContent}>
          <Gallery images={galleryImages} />
          <Text style={styles.sectionTitle}>Fecha del pop-up</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateCol}>
              <Text style={styles.dateLabel}>Desde</Text>
              <View style={styles.dateInput}>
                <Icon name="calendar" size={18} color="#888" style={{ marginRight: 6 }} />
                <Text style={styles.dateText}>
                  {popup.fecha_inicio ? dayjs(popup.fecha_inicio).format('DD/MM/YYYY') : 'No cargado'}
                </Text>
              </View>
            </View>
            <View style={styles.dateCol}>
              <Text style={styles.dateLabel}>Hasta</Text>
              <View style={styles.dateInput}>
                <Icon name="calendar" size={18} color="#888" style={{ marginRight: 6 }} />
                <Text style={styles.dateText}>
                  {popup.fecha_fin ? dayjs(popup.fecha_fin).format('DD/MM/YYYY') : 'No cargado'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {tab === 2 && (
        <View style={styles.tabContent}>
          {/* Por ahora vacío, funcional */}
        </View>
      )}
    </View>
  );
};

const PopupDetailScreen = ({ route }) => {
  const popup = route?.params?.popup || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderWithBack title="Detalles del pop-up" />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 110 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Imagen principal */}
          <Image
            source={popup.imagen ? { uri: popup.imagen } : require('./assets/popup.jpg')}
            style={styles.mainImage}
            resizeMode="cover"
          />
          {/* Título y dirección */}
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{popup.nombre || 'No cargado'}</Text>
            <View style={styles.locationRow}>
              <Icon name="map-marker" size={18} color="#22C55E" style={{ marginRight: 4 }} />
              <Text style={styles.locationText}>{popup.ubicacion || 'No cargado'}</Text>
            </View>
          </View>
          {/* Tabs */}
          <PopupTabs popup={popup} />
        </ScrollView>
        {/* Botón fijo */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity style={styles.favButton} activeOpacity={0.85}>
            <Icon name="heart-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.favButtonText}>Agregar a Favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
  mainImage: {
    width: '100%',
    height: width * 0.55,
    backgroundColor: '#eee',
  },
  infoContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 10,
    marginHorizontal: 0,
    backgroundColor: '#fff',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
  },
  tabActive: {
    color: '#B91C1C',
    borderBottomWidth: 2,
    borderBottomColor: '#B91C1C',
    paddingBottom: 2,
  },
  tabInactive: {
    color: '#888',
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  tabContent: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    minHeight: 120,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  sectionText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  sectionLeerMas: {
    color: '#B91C1C',
    fontWeight: '500',
    fontSize: 14,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  dateCol: {
    flex: 1,
    marginRight: 12,
  },
  dateLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dateText: {
    fontSize: 15,
    color: '#222',
  },
  galleryScroll: {
    marginBottom: 14,
    marginTop: 2,
    minHeight: 70,
  },
  galleryImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#eee',
  },
  galleryMore: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#2226',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryMoreText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  fixedButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingBottom: 18,
    paddingTop: 8,
  },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B91C1C',
    borderRadius: 30,
    paddingHorizontal: 28,
    paddingVertical: 14,
    shadowColor: '#B91C1C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  favButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PopupDetailScreen; 