import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export const directionsForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = () => {
    console.log("Form submitted!", origin, destination);
    // Add your submission logic here
  };

  return (
    <View>
      <TextInput
        placeholder="Origin"
        value={origin}
        onChangeText={(text) => setOrigin(text)}
      />
      <TextInput
        placeholder="Destination"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};
