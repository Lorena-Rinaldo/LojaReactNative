import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const getTotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const renderItem = ({ item, increase, decrease }: { item: CartItem, increase: (id: string) => void, decrease: (id: string) => void }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.price}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
    <View style={styles.quantityContainer}>
      <TouchableOpacity onPress={() => decrease(item.id)} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{item.quantity}</Text>
      <TouchableOpacity onPress={() => increase(item.id)} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function Cart() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Tênis Esportivo', price: 199.9, quantity: 1 },
    { id: '2', name: 'Camiseta Dry Fit', price: 89.9, quantity: 2 },
  ]);

  const increaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione produtos antes de finalizar a compra.');
      return;
    }

    const purchaseDetails = {
      items: cartItems,
      total: getTotal(cartItems),
    };

    // Serializando e codificando os itens para passar via URL
    const encodedItems = encodeURIComponent(JSON.stringify(purchaseDetails.items));

    router.push({
      pathname: '/checkout',
      params: {
        total: purchaseDetails.total.toFixed(2),
        items: encodedItems,
      },
    });

    // Limpa o carrinho após a navegação
    setCartItems([]);

  }, [cartItems, router]);

  const itemRenderer = useCallback(({ item }: { item: CartItem }) => (
    renderItem({ item, increase: increaseQuantity, decrease: decreaseQuantity })
  ), [increaseQuantity, decreaseQuantity]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Carrinho de Compras</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={itemRenderer}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: R$ {getTotal(cartItems).toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText} >Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9F9F9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: {
    backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginBottom: 12,
    elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '600', flex: 1 },
  price: {
    fontSize: 14, color: '#4CAF50', marginHorizontal: 10, fontWeight: '600',
    minWidth: 70, textAlign: 'right',
  },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  button: { backgroundColor: '#ddd', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
  quantity: { fontSize: 16, marginHorizontal: 10, minWidth: 20, textAlign: 'center' },
  footer: { paddingVertical: 16, borderTopWidth: 1, borderColor: '#ccc', alignItems: 'center' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  checkoutButton: {
    backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 8, width: '100%', alignItems: 'center',
  },
  checkoutText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
