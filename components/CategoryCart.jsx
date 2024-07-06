import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CategoryCart = () => {
  return (
    <TouchableOpacity className="flex flex-col items-center py-2 border-[1px] border-green-500 w-20 rounded-md mx-1">
        <View className="w-10 h-10 rounded-full">
          <Image
            source={require("../assets/avatar.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "9999px",
            }}
          />
        </View>

        <Text className="text-base">Men</Text>
    </TouchableOpacity>
  )
}

export default CategoryCart