import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import dos ícones

// Página de finalização da compra
export default function Checkout() {
  // Função para abrir links externos (redes sociais)
  const openLink = (url: string) => {
    Linking.openURL(url); // Core concept: interação com apps do sistema
  };

  return (
    <View style={styles.container}>
      {/* Título principal */}
      <Text style={styles.title}>Finalizar Compra 🛍️</Text>

      {/* Dados da loja */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💳 Pagamento via PIX</Text>
        <Text style={styles.text}>Chave PIX (CNPJ): 12.345.678/0001-99</Text>
        <Text style={styles.text}>Ou copie o QR Code enviado no seu e-mail.</Text>
      </View>

      {/* Redes sociais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📲 Redes Sociais</Text>

        {/* Instagram */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://www.instagram.com/sualoja')}
        >
          <Ionicons name="logo-instagram" size={20} color="#C13584" style={styles.icon} />
          <Text style={styles.link}>Instagram</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://www.facebook.com/sualoja')}
        >
          <Ionicons name="logo-facebook" size={20} color="#1877F2" style={styles.icon} />
          <Text style={styles.link}>Facebook</Text>
        </TouchableOpacity>

        {/* YouTube */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => openLink('https://www.youtube.com/sualoja')}
        >
          <Ionicons name="logo-youtube" size={20} color="#FF0000" style={styles.icon} />
          <Text style={styles.link}>YouTube</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de confirmação da compra */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.buttonText}>Confirmar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto', // joga para o final da tela
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6, // espaço entre ícone e texto
  },
});
