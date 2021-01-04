import React, { useEffect, useState } from "react";
import BnbSecureStore from "../../classes/BnbSecureStore";
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

  const _handleApiResponse = (wallet) => {
    setWallet(wallet);
    setIsLoading(false);
  };

  const _handleApiError = (error) => {
    setError(error);
    setIsLoading(false);
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
    return <BnbLoading text={_error.message}></BnbLoading>;
  }

  if (_is_loading) {
    return <BnbLoading text="Cargando..."></BnbLoading>;
  }
  return (
    <BnbMainView>
      <BnbIconText iconName="ios-wallet">{_wallet.address}</BnbIconText>
    </BnbMainView>
  );
}

export default ProfileWalletScreen;
