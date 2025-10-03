import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const formatPrice = (value: number) => `R$ ${value.toFixed(2)}`;

export default function Checkout() {
  const params = useLocalSearchParams();

  const total = parseFloat((params.total as string) || '0');

  let items: OrderItem[] = [];
  try {
    if (params.items && typeof params.items === 'string') {
      items = JSON.parse(params.items);
    }
  } catch (error) {
    console.error('Erro ao fazer parse dos itens:', error);
    items = [];
  }

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Finalizar Compra 🎉</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Resumo do Pedido</Text>
          {items.length > 0 ? (
            <>
              {items.map((item) => (
                <View key={item.id} style={styles.orderItem}>
                  <Text style={styles.orderItemName}>
                    {item.quantity}x {item.name}
                  </Text>
                  <Text style={styles.orderItemPrice}>
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </View>
              ))}
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Total a Pagar:</Text>
                <Text style={styles.finalTotal}>{formatPrice(total)}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.text}>Nenhum item encontrado no pedido.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💳 Pagamento via PIX</Text>
          <Text style={styles.text}>Chave PIX (CNPJ): 12.345.678/0001-99</Text>
          <Text style={styles.text}>
            Valor do PIX:{' '}
            <Text style={styles.pixValue}>{formatPrice(total)}</Text>
          </Text>
          <Text style={styles.text}>
            Ou copie o QR Code enviado no seu e-mail.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📲 Redes Sociais</Text>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => openLink('https://www.instagram.com/sualoja')}
          >
            <Ionicons
              name="logo-instagram"
              size={20}
              color="#C13584"
              style={styles.icon}
            />
            <Text style={styles.link}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => openLink('https://www.facebook.com/sualoja')}
          >
            <Ionicons
              name="logo-facebook"
              size={20}
              color="#1877F2"
              style={styles.icon}
            />
            <Text style={styles.link}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => openLink('https://www.youtube.com/sualoja')}
          >
            <Ionicons
              name="logo-youtube"
              size={20}
              color="#FF0000"
              style={styles.icon}
            />
            <Text style={styles.link}>YouTube</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Ionicons
          name="checkmark-circle-outline"
          size={20}
          color="#FFF"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Confirmar Pagamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 24,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  pixValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008000',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  orderItemName: {
    fontSize: 14,
    color: '#555',
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
    paddingTop: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  icon: {
    marginRight: 8,
  },
  link: {
    fontSize: 14,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
