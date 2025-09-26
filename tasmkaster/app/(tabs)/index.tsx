import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const PRODUTOS = [
  {
    id: '1',
    titulo: 'Fone de Ouvido Bluetooth A',
    preco: 'R$ 199,90',
    imagemUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '2',
    titulo: 'Fone de Ouvido Bluetooth B',
    preco: 'R$ 299,90',
    imagemUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '3',
    titulo: 'Caixa de Som Portátil',
    preco: 'R$ 399,90',
    imagemUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '4',
    titulo: 'Headset Gamer Pro',
    preco: 'R$ 499,90',
    imagemUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '5',
    titulo: 'Smartwatch Esportivo',
    preco: 'R$ 599,90',
    imagemUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
  {
    id: '6',
    titulo: 'Mouse Sem Fio Premium',
    preco: 'R$ 150,00',
    imagemUri: 'https://static.mundomax.com.br/produtos/79404/550/1.webp',
  },
];

const ProdutoCard = ({ produto }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: produto.imagemUri }}
      style={styles.productImage}
    />
    <Text style={styles.productTitle}>{produto.titulo}</Text>
    <Text style={styles.productPrice}>{produto.preco}</Text>
    <Button
      title="Comprar"
      onPress={() => alert(`Produto ${produto.titulo} adicionado ao carrinho!`)}
    />
  </View>
);

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eletrônicos</Text>
    
      <FlatList
        data={PRODUTOS}
        renderItem={({ item }) => <ProdutoCard produto={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feed}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  feed: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    width: 500,
    margin: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 8,
  },
});