/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Stack } from '@keystone-ui/core';
import { AlertTriangleIcon } from '@keystone-ui/icons/icons/AlertTriangleIcon';
import { SignoutButton } from '../../../../admin-ui/components/SignoutButton';
import { ErrorContainer } from '../../../../admin-ui/components/Errors';
import { i18nLang } from '../../../../lang/main';

type NoAccessPage = { sessionsEnabled: boolean };

export const getNoAccessPage = (props: NoAccessPage) => () => <NoAccessPage {...props} />;

export const NoAccessPage = ({ sessionsEnabled }: NoAccessPage) => {
  return (
    <ErrorContainer>
      <Stack align="center" gap="medium">
        <AlertTriangleIcon size="large" />
        <div>{i18nLang.AdminUIPages.NoAccessPage.Index.YouDonTHaveAccessToThisPage}</div>
        {sessionsEnabled ? <SignoutButton /> : null}
      </Stack>
    </ErrorContainer>
  );
};
