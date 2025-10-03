import React, { useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  FlatList, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';

const MOCK_PRODUCTS = [
  {
    id: '1',
    title: 'Fone de Ouvido Bluetooth A',
    price: 199.90,
    imageUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '2',
    title: 'Fone de Ouvido Bluetooth B',
    price: 299.90,
    imageUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '3',
    title: 'Caixa de Som Portátil',
    price: 399.90,
    imageUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '4',
    title: 'Headset Gamer Pro',
    price: 499.90,
    imageUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '5',
    title: 'Smartwatch Esportivo',
    price: 599.90,
    imageUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '6',
    title: 'Mouse Sem Fio Premium',
    price: 150.00,
    imageUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
];


/**

 * @param {number} value 
 * @returns {string} 
 */
const formatPrice = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
};

const ProductCard = ({ product }) => {
  const handleBuy = useCallback(() => {
    Alert.alert(
      'Adicionado ao Carrinho',
      `${product.title} foi adicionado com sucesso!`,
      [{ text: 'OK' }]
    );
  }, [product.title]);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.imageUri }}
        style={styles.image}
        resizeMode="contain" 
      />
      <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
      
      <TouchableOpacity 
        style={styles.buyButton} 
        onPress={handleBuy}
      >
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ProductListScreen() {
  const router = useRouter();

  const renderProduct = useCallback(({ item }) => (
    <ProductCard product={item} />
  ), []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Catálogo de Eletrônicos</Text>
      
      <FlatList
        data={MOCK_PRODUCTS} 
        renderItem={renderProduct} 
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feed}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    paddingTop: 16,
  },
  headerTitle: { 
    fontSize: 28,
    marginBottom: 20,
    fontWeight: '700', 
    textAlign: 'center',
    color: '#333',
  },
  feed: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  card: {
    width: '48%', 
    marginVertical: 8, 
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  image: { 
    width: '100%',
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: { 
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
    height: 36,
  },
  price: {
    fontSize: 18,
    color: '#007bff', 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#28a745', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});