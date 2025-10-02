import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Biblioteca de ícones

// Array de produtos com ícones associados
const products = [
  {
    id: '1',
    name: 'Tênis Esportivo',
    price: 'R$ 199,90',
    description: 'Tênis leve e confortável para suas corridas e treinos.',
   // imageUrl: '',
    icon: 'basketball-outline', // Ícone relacionado ao produto
  },
  {
    id: '2',
    name: 'Camiseta Dry Fit',
    price: 'R$ 89,90',
    description: 'Camiseta com tecnologia Dry Fit para maior respirabilidade.',
   // imageUrl: '',
    icon: 'shirt-outline', // Ícone de camiseta
  },
  {
    id: '3',
    name: 'Fone de Ouvido Bluetooth',
    price: 'R$ 149,90',
    description: 'Qualidade de som impecável e sem fios para sua liberdade.',
   // imageUrl: '',
    icon: 'headset-outline', // Ícone de fone
  },
  {
    id: '4',
    name: 'Mochila Urbana',
    price: 'R$ 120,00',
    description: 'Mochila prática e estilosa para o dia a dia.',
   // imageUrl: '',
    icon: 'bag-outline', // Ícone de mochila
  },
];

// Componente que renderiza cada item do catálogo
const ProductCard = ({ item }: { item: typeof products[0] }) => {
  return (
    <View style={styles.card}>
      {/* Imagem do produto  se quiser usar imagem descomente a linha abaixo   xD
    
      <Image source={{ uri: item.imageUrl }} style={styles.image} />*/}

      {/* Informações principais do produto */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      {/* Área de ações com ícones */}
      <View style={styles.actions}>
        {/* Ícone individual definido no array */}
        <Ionicons name={item.icon} size={26} color="#333" style={styles.productIcon} />

        {/* Botão de adicionar ao carrinho */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>

        {/* Botão de favoritar produto */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="heart-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Componente principal do catálogo
export default function Catalogo() {
  return (
    <View style={styles.container}>
      {/* Título do catálogo */}
      <Text style={styles.title}>Catálogo de Produtos</Text>

      {/* Lista que renderiza os produtos dinamicamente */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// Estilos do layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#4CAF50',
    marginVertical: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  productIcon: {
    marginRight: 8,
  },
});
