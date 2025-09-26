import { Image } from "expo-image"
import { View, Text, StyleSheet } from "react-native";

export default function ExploreOutsideTabs3() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{ uri: 'https://blog.giulianaflores.com.br/wp-content/uploads/2016/05/como-cuidar-de-girassol.jpg' }}
          transition={1000}
        >

        </Image>
      </View>
      <View>
        <Text style={styles.title}>Girassol</Text>
        <Text style={styles.paragraph}>Símbolo de felicidade, vitalidade e calor, suas grandes pétalas amarelas radiantes emolduram um miolo que é, na verdade, uma inflorescência composta por centenas de pequenas flores. Além de sua beleza ornamental, o girassol tem grande importância econômica: suas sementes são ricas em óleo de cozinha e são um alimento nutritivo, e a planta em si é um testemunho espetacular da energia e da alegria que a luz do sol representa.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 350, height: 350 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center"},
  paragraph: { fontSize: 16, fontWeight: "normal", textAlign: "center"},
});
