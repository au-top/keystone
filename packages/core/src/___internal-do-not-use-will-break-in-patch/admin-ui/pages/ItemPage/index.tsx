/** @jsxRuntime classic */
/** @jsx jsx */

import copyToClipboard from 'clipboard-copy';
import { useRouter } from 'next/router';
import {
  Fragment,
  HTMLAttributes,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button } from '@keystone-ui/button';
import { Box, Center, Stack, Text, jsx, useTheme } from '@keystone-ui/core';
import { LoadingDots } from '@keystone-ui/loading';
import { ClipboardIcon } from '@keystone-ui/icons/icons/ClipboardIcon';
import { AlertDialog } from '@keystone-ui/modals';
import { Notice } from '@keystone-ui/notice';
import { useToasts } from '@keystone-ui/toast';
import { Tooltip } from '@keystone-ui/tooltip';
import { FieldLabel, TextInput } from '@keystone-ui/fields';
import { ListMeta } from '../../../../types';
import {
  DataGetter,
  DeepNullable,
  makeDataGetter,
  deserializeValue,
  ItemData,
  useInvalidFields,
  Fields,
  useChangedFieldsAndDataForUpdate,
} from '../../../../admin-ui/utils';

import { gql, useMutation, useQuery } from '../../../../admin-ui/apollo';
import { useList } from '../../../../admin-ui/context';
import { PageContainer, HEADER_HEIGHT } from '../../../../admin-ui/components/PageContainer';
import { GraphQLErrorNotice } from '../../../../admin-ui/components/GraphQLErrorNotice';
import { usePreventNavigation } from '../../../../admin-ui/utils/usePreventNavigation';
import { BaseToolbar, ColumnLayout, ItemPageHeader } from './common';
import { i18nLang } from '../../../../lang/main';

type ItemPageProps = {
  listKey: string;
};

function useEventCallback<Func extends (...args: any) => any>(callback: Func): Func {
  const callbackRef = useRef(callback);
  const cb = useCallback((...args: any[]) => {
    return callbackRef.current(...args);
  }, []);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return cb as any;
}

function ItemForm({
  listKey,
  itemGetter,
  selectedFields,
  fieldModes,
  showDelete,
}: {
  listKey: string;
  itemGetter: DataGetter<ItemData>;
  selectedFields: string;
  fieldModes: Record<string, 'edit' | 'read' | 'hidden'>;
  showDelete: boolean;
}) {
  const list = useList(listKey);

  const [update, { loading, error, data }] = useMutation(
    gql`mutation ($data: ${list.gqlNames.updateInputName}!, $id: ID!) {
      item: ${list.gqlNames.updateMutationName}(where: { id: $id }, data: $data) {
        ${selectedFields}
      }
    }`,
    { errorPolicy: 'all' }
  );
  itemGetter =
    useMemo(() => {
      if (data) {
        return makeDataGetter(data, error?.graphQLErrors).get('item');
      }
    }, [data, error]) ?? itemGetter;

  const [state, setValue] = useState(() => {
    const value = deserializeValue(list.fields, itemGetter);
    return { value, item: itemGetter };
  });
  if (
    !loading &&
    state.item.data !== itemGetter.data &&
    (itemGetter.errors || []).every(x => x.path?.length !== 1)
  ) {
    const value = deserializeValue(list.fields, itemGetter);
    setValue({ value, item: itemGetter });
  }

  const { changedFields, dataForUpdate } = useChangedFieldsAndDataForUpdate(
    list.fields,
    state.item,
    state.value
  );

  const invalidFields = useInvalidFields(list.fields, state.value);

  const [forceValidation, setForceValidation] = useState(false);
  const toasts = useToasts();
  const onSave = useEventCallback(() => {
    const newForceValidation = invalidFields.size !== 0;
    setForceValidation(newForceValidation);
    if (newForceValidation) return;

    update({ variables: { data: dataForUpdate, id: state.item.get('id').data } })
      // TODO -- Experimenting with less detail in the toasts, so the data lines are commented
      // out below. If we're happy with this, clean up the unused lines.
      .then(({ /* data, */ errors }) => {
        // we're checking for path.length === 1 because errors with a path larger than 1 will
        // be field level errors which are handled seperately and do not indicate a failure to
        // update the item
        const error = errors?.find(x => x.path?.length === 1);
        if (error) {
          toasts.addToast({
            title: i18nLang.AdminUIPages.ItemPage.FailedToUpdateItem,
            tone: 'negative',
            message: error.message,
          });
        } else {
          toasts.addToast({
            // title: data.item[list.labelField] || data.item.id,
            tone: 'positive',
            title: i18nLang.AdminUIPages.ItemPage.SavedSuccessfully,
            // message: 'Saved successfully',
          });
        }
      })
      .catch(err => {
        toasts.addToast({ title: 'Failed to update item', tone: 'negative', message: err.message });
      });
  });
  const labelFieldValue = state.item.data?.[list.labelField];
  const itemId = state.item.data?.id!;
  const hasChangedFields = !!changedFields.size;
  usePreventNavigation(useMemo(() => ({ current: hasChangedFields }), [hasChangedFields]));
  return (
    <Box marginTop="xlarge">
      <GraphQLErrorNotice
        networkError={error?.networkError}
        // we're checking for path.length === 1 because errors with a path larger than 1 will be field level errors
        // which are handled seperately and do not indicate a failure to update the item
        errors={error?.graphQLErrors.filter(x => x.path?.length === 1)}
      />
      <Fields
        fieldModes={fieldModes}
        fields={list.fields}
        forceValidation={forceValidation}
        invalidFields={invalidFields}
        onChange={useCallback(
          value => {
            setValue(state => ({ item: state.item, value: value(state.value) }));
          },
          [setValue]
        )}
        value={state.value}
      />
      <Toolbar
        onSave={onSave}
        hasChangedFields={!!changedFields.size}
        onReset={useEventCallback(() => {
          setValue(state => ({
            item: state.item,
            value: deserializeValue(list.fields, state.item),
          }));
        })}
        loading={loading}
        deleteButton={useMemo(
          () =>
            showDelete ? (
              <DeleteButton
                list={list}
                itemLabel={(labelFieldValue ?? itemId) as string}
                itemId={itemId}
              />
            ) : undefined,
          [showDelete, list, labelFieldValue, itemId]
        )}
      />
    </Box>
  );
}

function DeleteButton({
  itemLabel,
  itemId,
  list,
}: {
  itemLabel: string;
  itemId: string;
  list: ListMeta;
}) {
  const toasts = useToasts();
  const [deleteItem, { loading }] = useMutation(
    gql`mutation ($id: ID!) {
      ${list.gqlNames.deleteMutationName}(where: { id: $id }) {
        id
      }
    }`,
    { variables: { id: itemId } }
  );
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Fragment>
      <Button
        tone="negative"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {i18nLang.AdminUIPages.ItemPage.Delete}
      </Button>
      <AlertDialog
        // TODO: change the copy in the title and body of the modal
        title={i18nLang.AdminUIPages.ItemPage.DeleteConfirmation}
        isOpen={isOpen}
        tone="negative"
        actions={{
          confirm: {
            label: i18nLang.AdminUIPages.ItemPage.Delete,
            action: async () => {
              try {
                await deleteItem();
              } catch (err: any) {
                return toasts.addToast({
                  title: `${i18nLang.AdminUIPages.ItemPage.FailedToDelete} ${list.singular} ${i18nLang.AdminUIPages.ItemPage.Item}: ${itemLabel}`,
                  message: err.message,
                  tone: 'negative',
                });
              }
              router.push(`/${list.path}`);
              return toasts.addToast({
                title: itemLabel,
                message: `${i18nLang.AdminUIPages.ItemPage.Deleted} ${list.singular} ${i18nLang.AdminUIPages.ItemPage.ItemSuccessfully}`,
                tone: 'positive',
              });
            },
            loading,
          },
          cancel: {
            label: 'Cancel',
            action: () => {
              setIsOpen(false);
            },
          },
        }}
      >
        {i18nLang.AdminUIPages.ItemPage.AreYouSureYouWantToDelete} <strong>{itemLabel}</strong>?
      </AlertDialog>
    </Fragment>
  );
}

export const getItemPage = (props: ItemPageProps) => () => <ItemPage {...props} />;

const ItemPage = ({ listKey }: ItemPageProps) => {
  const list = useList(listKey);
  const id = useRouter().query.id as string;
  const { spacing, typography } = useTheme();

  const { query, selectedFields } = useMemo(() => {
    let selectedFields = Object.entries(list.fields)
      .filter(
        ([fieldKey, field]) =>
          field.itemView.fieldMode !== 'hidden' ||
          // the id field is hidden but we still need to fetch it
          fieldKey === 'id'
      )
      .map(([fieldKey]) => {
        return list.fields[fieldKey].controller.graphqlSelection;
      })
      .join('\n');
    return {
      selectedFields,
      query: gql`
        query ItemPage($id: ID!, $listKey: String!) {
          item: ${list.gqlNames.itemQueryName}(where: {id: $id}) {
            ${selectedFields}
          }
          keystone {
            adminMeta {
              list(key: $listKey) {
                hideCreate
                hideDelete
                fields {
                  path
                  itemView(id: $id) {
                    fieldMode
                  }
                }
              }
            }
          }
        }
      `,
    };
  }, [list]);
  let { data, error, loading } = useQuery(query, {
    variables: { id, listKey },
    errorPolicy: 'all',
    skip: id === undefined,
  });
  loading ||= id === undefined;

  const dataGetter = makeDataGetter<
    DeepNullable<{
      item: ItemData;
      keystone: {
        adminMeta: {
          list: { fields: { path: string; itemView: { fieldMode: 'edit' | 'read' | 'hidden' } }[] };
        };
      };
    }>
  >(data, error?.graphQLErrors);

  let itemViewFieldModesByField = useMemo(() => {
    let itemViewFieldModesByField: Record<string, 'edit' | 'read' | 'hidden'> = {};
    dataGetter.data?.keystone?.adminMeta?.list?.fields?.forEach(field => {
      if (field !== null && field.path !== null && field?.itemView?.fieldMode != null) {
        itemViewFieldModesByField[field.path] = field.itemView.fieldMode;
      }
    });
    return itemViewFieldModesByField;
  }, [dataGetter.data?.keystone?.adminMeta?.list?.fields]);

  const metaQueryErrors = dataGetter.get('keystone').errors;

  const pageTitle: string = loading
    ? undefined
    : (data && data.item && (data.item[list.labelField] || data.item.id)) || id;

  return (
    <PageContainer
      title={pageTitle}
      header={
        <ItemPageHeader
          list={list}
          label={
            loading
              ? `${i18nLang.AdminUIPages.ItemPage.Loading}...`
              : (data && data.item && (data.item[list.labelField] || data.item.id)) || id
          }
        />
      }
    >
      {loading ? (
        <Center css={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
          <LoadingDots
            label={i18nLang.AdminUIPages.ItemPage.LoadingItemData}
            size="large"
            tone="passive"
          />
        </Center>
      ) : metaQueryErrors ? (
        <Box marginY="xlarge">
          <Notice tone="negative">{metaQueryErrors[0].message}</Notice>
        </Box>
      ) : (
        <ColumnLayout>
          {data?.item == null ? (
            <Box marginY="xlarge">
              {error?.graphQLErrors.length || error?.networkError ? (
                <GraphQLErrorNotice
                  errors={error?.graphQLErrors}
                  networkError={error?.networkError}
                />
              ) : (
                <Notice tone="negative">
                  {i18nLang.AdminUIPages.ItemPage.TheItemWithId}"{id}"{' '}
                  {i18nLang.AdminUIPages.ItemPage.CouldNotBeFoundOrYouDonTHaveAccessToIt}
                </Notice>
              )}
            </Box>
          ) : (
            <Fragment>
              <ItemForm
                fieldModes={itemViewFieldModesByField}
                selectedFields={selectedFields}
                showDelete={!data.keystone.adminMeta.list!.hideDelete}
                listKey={listKey}
                itemGetter={dataGetter.get('item') as DataGetter<ItemData>}
              />
              <StickySidebar>
                <FieldLabel>{i18nLang.AdminUIPages.ItemPage.ItemID}</FieldLabel>
                <div
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TextInput
                    css={{
                      marginRight: spacing.medium,
                      fontFamily: typography.fontFamily.monospace,
                      fontSize: typography.fontSize.small,
                    }}
                    readOnly
                    value={data.item.id}
                  />
                  <Tooltip content="Copy ID">
                    {props => (
                      <Button
                        {...props}
                        aria-label="Copy ID"
                        onClick={() => {
                          copyToClipboard(data.item.id);
                        }}
                      >
                        <ClipboardIcon size="small" />
                      </Button>
                    )}
                  </Tooltip>
                </div>
              </StickySidebar>
            </Fragment>
          )}
        </ColumnLayout>
      )}
    </PageContainer>
  );
};

// Styled Components
// ------------------------------

const Toolbar = memo(function Toolbar({
  hasChangedFields,
  loading,
  onSave,
  onReset,
  deleteButton,
}: {
  hasChangedFields: boolean;
  loading: boolean;
  onSave: () => void;
  onReset: () => void;
  deleteButton?: ReactElement;
}) {
  return (
    <BaseToolbar>
      <Button
        isDisabled={!hasChangedFields}
        isLoading={loading}
        weight="bold"
        tone="active"
        onClick={onSave}
      >
        {i18nLang.AdminUIPages.ItemPage.SaveChanges}
      </Button>
      <Stack align="center" across gap="small">
        {hasChangedFields ? (
          <ResetChangesButton onReset={onReset} />
        ) : (
          <Text weight="medium" paddingX="large" color="neutral600">
            {i18nLang.AdminUIPages.ItemPage.NoChanges}
          </Text>
        )}
        {deleteButton}
      </Stack>
    </BaseToolbar>
  );
});

function ResetChangesButton(props: { onReset: () => void }) {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  return (
    <Fragment>
      <Button
        weight="none"
        onClick={() => {
          setConfirmModalOpen(true);
        }}
      >
        {i18nLang.AdminUIPages.ItemPage.ResetChanges}
      </Button>
      <AlertDialog
        actions={{
          confirm: {
            action: () => props.onReset(),
            label: 'Reset changes',
          },
          cancel: {
            action: () => setConfirmModalOpen(false),
            label: 'Cancel',
          },
        }}
        isOpen={isConfirmModalOpen}
        title={i18nLang.AdminUIPages.ItemPage.AreYouSureYouWantToResetChanges + '?'}
        tone="negative"
      >
        {null}
      </AlertDialog>
    </Fragment>
  );
}

const StickySidebar = (props: HTMLAttributes<HTMLDivElement>) => {
  const { spacing } = useTheme();
  return (
    <div
      css={{
        marginTop: spacing.xlarge,
        marginBottom: spacing.xxlarge,
        position: 'sticky',
        top: spacing.xlarge,
      }}
      {...props}
    />
  );
};
