import { i18nLang } from '@keystone-6/core';
import { AuthTokenRedemptionErrorCode } from '../types';

export function getAuthTokenErrorMessage({ code }: { code: AuthTokenRedemptionErrorCode }): string {
  switch (code) {
    case 'FAILURE':
      return i18nLang.Auth.Lib.GetErrorMessage.AuthTokenRedemptionFailed;
    case 'TOKEN_EXPIRED':
      return i18nLang.Auth.Lib.GetErrorMessage.TheAuthTokenProvidedHasExpired;
    case 'TOKEN_REDEEMED':
      return i18nLang.Auth.Lib.GetErrorMessage
        .AuthTokensAreSingleUseAndTheAuthTokenProvidedHasAlreadyBeenRedeemed;
  }
}
