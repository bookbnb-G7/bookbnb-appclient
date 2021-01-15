import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import BnbSecureStore from "../../classes/BnbSecureStore";
import BnbButton from "../../components/BnbButton";
import BnbError from "../../components/BnbError";
import BnbIconText from "../../components/BnbIconText";
import BnbLoading from "../../components/BnbLoading";
import BnbMainView from "../../components/BnbMainView";
import constants from "../../constant/constants";
import urls from "../../constant/urls";
import httpGetTokenRequest from "../../helpers/httpGetTokenRequest";

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
    return <BnbError>{_error.message}</BnbError>;
  }

  if (_is_loading) {
    return <BnbLoading text="Cargando..."></BnbLoading>;
  }
  return (
    <BnbMainView>
      <BnbIconText iconName="ios-wallet">{_wallet.address}</BnbIconText>
      {_show_mnemonic && <Text>{_wallet.mnemonic}</Text>}
      <BnbButton
        onPress={_toggleShowMnemonic}
        title={_show_mnemonic ? "Ocultar mnemonic" : "Mostrar mnemonic"}
      ></BnbButton>
    </BnbMainView>
  );
}

export default ProfileWalletScreen;
