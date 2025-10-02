import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Tipo para representar um produto dentro do carrinho
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Página principal do carrinho
export default function Cart() {
  // Estado do carrinho: lista de produtos
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Tênis Esportivo', price: 199.9, quantity: 1 },
    { id: '2', name: 'Camiseta Dry Fit', price: 89.9, quantity: 2 },
  ]);

  // Função para aumentar a quantidade
  const increaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Função para diminuir a quantidade
  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // remove item se quantidade = 0
    );
  };

  // Função para calcular total do carrinho
  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Renderização de cada item da lista
  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Carrinho de Compras</Text>

      {/* Lista de produtos */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Rodapé com total */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: R$ {getTotal().toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText} >Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#4CAF50',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
