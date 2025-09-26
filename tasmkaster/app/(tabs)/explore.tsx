// App.js básico com componentes fundamentais
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Task() {
  const router = useRouter();
  {/*criação o router para navegação, essencial para lógica de navegação.
  🔧 Explicação

useRouter() → hook fornecido pelo Expo Router.

Ele te dá acesso ao objeto router, que tem métodos como:

router.push("/rota") → navega para a rota especificada.

router.replace("/rota") → substitui a rota atual.

router.back() → volta para a tela anterior.  
    
    */}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de task</Text>
      <Text style={styles.subtitle}>segunda página!</Text>
      {/* <Button
        title="Ir para beltranis (fora das Tabs)"
        onPress={() => router.push("/beltranis")} //tem que ter uma variável antes
      //  para recever o useRouter o "const router"é para isso
      /> */}
      {/* <Button
        title="Ir para xulambs (fora das Tabs)"
        onPress={() => router.push("/xulambs")}

      /> */}
      <Button
        title="Ir para ciclanis (fora das Tabs)"
        onPress={() => router.push("/ciclanis")}

      />

      <Button
        title="Ir para fulanis (fora das Tabs)"
        onPress={() => router.push("/fulanis")}

      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Mudando para coluna para evitar sobreposição
    alignItems: 'center', // Centraliza o conteúdo na tela
    gap: 8,
    padding: 16, // Adiciona um pouco de espaçamento
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18, // Ajuste do tamanho da fonte para o subtítulo
  },
});
