import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbBodyView from "../../components/BnbBodyView";
import BnbButton from "../../components/BnbButton";
import BnbError from "../../components/BnbError";
import BnbIconText from "../../components/BnbIconText";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import bnbStyleSheet from "../../constant/bnbStyleSheet";
import constants from "../../constant/constants";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";
import Clipboard from "expo-clipboard";
import Separator from "../../components/Separator";

function ProfileWalletScreen(props) {
  const [_wallet, setWallet] = useState();
  const [_is_loading, setIsLoading] = useState(true);
  const [_error, setError] = useState();
  const [_show_mnemonic, setShowMnemonic] = useState(false);

  const _handleApiResponse = (wallet) => {
    setWallet(wallet);
    console.log(wallet.address);
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const _toggleShowMnemonic = () => {
    setShowMnemonic(!_show_mnemonic);
  };

  const _copyToClipboard = () => {
    Clipboard.setString(_wallet.address);
  };

  useEffect(() => {
    BnbSecureStore.read(constants.CACHE_USER_KEY).then((user) => {
      httpGetTokenRequest(
        "GET",
        urls.URL_ME + "/wallet",
        { "x-access-token": user.auth_token },
        _handleApiResponse,
        _handleApiError
      );
    });
  }, []);

  if (_error) {
    return (
      <BnbError>
        Hubo un error al cargar la billetera, error: {_error.message}
      </BnbError>
    );
  }
  if (_is_loading) {
    return <BnbLoading text="Cargando billetera..."></BnbLoading>;
  }
  return (
    <BnbMainView>
      <BnbBodyView>
        <View style={styles.walletBalanceContainer}>
          <Text style={bnbStyleSheet.headerTextBlack}>Balance</Text>
          <BnbIconText
            iconName="ethereum"
            style={{ height: 55, alignSelf: "center" }}
            textStyle={bnbStyleSheet.normalText}
          >
            {_wallet.balance}
          </BnbIconText>
        </View>
        <Separator />
        <View style={styles.walletInfoContainer}>
          <Text style={bnbStyleSheet.headerTextBlack}>Detalles</Text>
          <Text
            style={{
              ...bnbStyleSheet.subHeaderText,
              ...bnbStyleSheet.separator,
            }}
          >
            Address
          </Text>
          <Text>{_wallet.address}</Text>
          <BnbButton title="Copiar" onPress={_copyToClipboard}></BnbButton>
          <Text
            style={{
              ...bnbStyleSheet.subHeaderText,
              ...bnbStyleSheet.separator,
            }}
          >
            Mnemonic
          </Text>
          {_show_mnemonic && <Text>{_wallet.mnemonic}</Text>}
          <BnbButton
            onPress={_toggleShowMnemonic}
            title={_show_mnemonic ? "Ocultar mnemonic" : "Mostrar mnemonic"}
          ></BnbButton>
        </View>
      </BnbBodyView>
    </BnbMainView>
  );
}

const styles = StyleSheet.create({
  walletBalanceContainer: {},
  walletInfoContainer: {},
});

export default ProfileWalletScreen;
