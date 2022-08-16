/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { Button } from '@keystone-ui/button';
import { ReactNode, useEffect } from 'react';

import { useMutation, gql } from '../apollo';
import { i18nLang } from '../../lang/main';

const END_SESSION = gql`
  mutation EndSession {
    endSession
  }
`;

const SignoutButton = ({ children }: { children?: ReactNode }) => {
  const [endSession, { loading, data }] = useMutation(END_SESSION);
  useEffect(() => {
    if (data?.endSession) {
      window.location.reload();
    }
  }, [data]);

  return (
    <Button size="small" isLoading={loading} onClick={() => endSession()}>
      {children || i18nLang.AdminUIComponents.SignoutButton.SignOut}
    </Button>
  );
};
export { SignoutButton };
