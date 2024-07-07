import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FeatureCard from "../components/FeatureCard";
import SaleCard from "../components/SaleCard";

const HomeScreen = () => {
  const Category = [
    { id: 1, name: "Teddy" },
    { id: 2, name: "Car" },
  ];

  const SaleOffData = [
    { id: 1, name: "Phone" },
    { id: 2, name: "Table" },
    { id: 3, name: "Watch" },
    { id: 4, name: "Acessories" },
    { id: 5, name: "Headphone" },
  ];

  return (
    <ScrollView className=" bg-white py-2">
      {/* Avatar section */}

      <View className="flex px-4 justify-between items-center flex-row flex-1">
        <View className="flex flex-col">
          <Text>Welcome back!</Text>
          <Text className="text-base font-semibold">
            Nguyen Huynh Minh Khoi
          </Text>
        </View>

        <View className="w-10 h-10 rounded-full">
          <Image
            source={require("../assets/avatar.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </View>
      </View>

      {/* Banner Section */}
      <View style={{ flex: 1, marginTop: 20, height: 180 }}>
        <Image
          source={require("../assets/carousel-banner-2.jpg")}
          className="h-full w-full object-cover"
        />
      </View>

      {/* Feature Section */}
      <View style={{ flex: 1, marginTop: 10, marginStart: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Category}
          renderItem={({ item }) => <FeatureCard />}
        />
      </View>

      {/* Shocking sale */}
      <View
        style={{
          flex: 1,
          height: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          marginTop: 32,
        }}
      >
        <Text style={{ fontWeight: 600, fontSize: 20 }}>Our Product</Text>
        <Text style={{ fontWeight: 400, fontSize: 16, color: "#0DA54B" }}>
          View all
        </Text>
      </View>

      {/* Product Section */}
      <View style={{ flex: 1, marginTop: 10, marginStart: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={SaleOffData}
          renderItem={({ item }) => <SaleCard title={item} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
