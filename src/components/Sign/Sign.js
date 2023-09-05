import React, { useRef } from "react";
import { StyleSheet, View, Button } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";
import sendSignatureToAPI from "../../api/Signature/sendSignatureToAPI";
import { useNavigation } from "@react-navigation/native";

const Sign = ({ onOK }) => {
  const navigation = useNavigation();
  const ref = useRef();

  const handleOK = async (signature) => {
    const path = FileSystem.cacheDirectory + `sign_${Date.now()}.png`;
    await FileSystem.writeAsStringAsync(
      path,
      signature.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then(async () => {
        try {
          console.log("Writing signature to file completed. Path:", path);
          
          await sendSignatureToAPI(path, navigation);
          // console.log("API response---:", uploadResponse);
          // Handle the API response as needed
        } catch (error) {
          console.log("API error:", error);
          // Log the error in the console, but don't affect the mobile screen
        }
      })
      .catch(console.error);
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleEnd = () => {
  ref.current.readSignature();
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} onEnd={handleEnd} />
      <View style={styles.row}>
        <Button title="Clear" onPress={handleClear} />
      </View>
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    padding: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
