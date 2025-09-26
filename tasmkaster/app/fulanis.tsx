import { Image } from "expo-image"
import { View, Text, StyleSheet } from "react-native";

export default function ExploreOutsideTabs4() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{ uri: 'https://s2.glbimg.com/K6ATOQWJq-g1Z6pWk3JTCuudiF4=/620x455/e.glbimg.com/og/ed/f/original/2021/01/15/tulipa-dicas-cuidados-plantio.jpg' }}
          transition={1000}
        >

        </Image>
      </View>
      <View>
        <Text style={styles.title}>Tulipas</Text>
        <Text style={styles.paragraph}>A tulipa (Tulipa) é uma das flores mais populares do mundo, imediatamente reconhecida por sua forma de taça simétrica e pétalas aveludadas. Originária das montanhas da Ásia Central, sua fama foi consolidada na Turquia (onde eram cultivadas nos jardins do Império Otomano) e, posteriormente, nos Países Baixos, onde desencadeou a famosa "Tulipomania" no século XVII — um dos primeiros exemplos de bolha econômica da história.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 350, height: 350 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  paragraph: { fontSize: 16, fontWeight: "normal", textAlign: "center" },
});
