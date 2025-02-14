/** @jsxRuntime classic */
/** @jsx jsx */
import { useMemo, useRef, RefObject } from 'react';
import bytes from 'bytes';

import { jsx, Stack, Text } from '@keystone-ui/core';
import { FieldContainer, FieldDescription, FieldLabel } from '@keystone-ui/fields';

import { Button } from '@keystone-ui/button';
import { FieldProps } from '../../../../types';
import { i18nLang } from '../../../../lang/main';
import { FileValue } from './index';

export function Field({
  autoFocus,
  field,
  value,
  onChange,
}: FieldProps<typeof import('.').controller>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const errorMessage = createErrorMessage(value);

  const onUploadChange = ({
    currentTarget: { validity, files },
  }: React.SyntheticEvent<HTMLInputElement>) => {
    const file = files?.[0];
    if (!file) return; // bail if the user cancels from the file browser
    onChange?.({
      kind: 'upload',
      data: { file, validity },
      previous: value,
    });
  };

  // Generate a random input key when the value changes, to ensure the file input is unmounted and
  // remounted (this is the only way to reset its value and ensure onChange will fire again if
  // the user selects the same file again)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputKey = useMemo(() => Math.random(), [value]);

  return (
    <FieldContainer as="fieldset">
      <FieldLabel as="legend">{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>{field.description}</FieldDescription>
      <FileView errorMessage={errorMessage} value={value} onChange={onChange} inputRef={inputRef} />
      <input
        css={{ display: 'none' }}
        autoComplete="off"
        autoFocus={autoFocus}
        ref={inputRef}
        key={inputKey}
        name={field.path}
        onChange={onUploadChange}
        type="file"
        disabled={onChange === undefined}
        aria-describedby={field.description === null ? undefined : `${field.path}-description`}
      />
    </FieldContainer>
  );
}

function FileView({
  errorMessage,
  value,
  onChange,
  inputRef,
}: {
  errorMessage?: string;
  value: FileValue;
  onChange?: (value: FileValue) => void;
  inputRef: RefObject<HTMLInputElement>;
}) {
  return value.kind === 'from-server' || value.kind === 'upload' ? (
    <Stack gap="small" across align="center">
      {onChange && (
        <Stack gap="small">
          {value.kind === 'from-server' && (
            <Stack padding="xxsmall" gap="xxsmall">
              <Text size="small">
                <a href={value.data.src} target="_blank">
                  {`${value.data.filename}`}
                </a>
              </Text>
              <Text size="small">
                {i18nLang.Fields.Components.File.Views.Field.Size}: {bytes(value.data.filesize)}
              </Text>
            </Stack>
          )}
          {value.kind === 'upload' && (
            <Stack padding="xxsmall" gap="xxsmall">
              <Text size="small" paddingBottom="xsmall">
                {i18nLang.Fields.Components.File.Views.Field.FileLinkedSaveToCompleteUpload}
              </Text>
              <Text size="small">
                {i18nLang.Fields.Components.File.Views.Field.Size}: {bytes(value.data.file.size)}
              </Text>
            </Stack>
          )}
          <Stack across gap="small" align="center">
            <Button
              size="small"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              {i18nLang.Fields.Components.File.Views.Field.Change}
            </Button>
            {value.kind === 'from-server' && (
              <Button
                size="small"
                tone="negative"
                onClick={() => {
                  onChange({ kind: 'remove', previous: value });
                }}
              >
                {i18nLang.Fields.Components.File.Views.Field.Remove}
              </Button>
            )}
            {value.kind === 'upload' && (
              <Button
                size="small"
                tone="negative"
                onClick={() => {
                  onChange(value.previous);
                }}
              >
                {i18nLang.Fields.Components.File.Views.Field.Cancel}
              </Button>
            )}
            {errorMessage && (
              <span
                css={{
                  display: 'block',
                  marginTop: '8px',
                  color: 'red',
                }}
              >
                {errorMessage}
              </span>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  ) : (
    <Stack gap="small">
      <Stack css={{ alignItems: 'center' }} gap="small" across>
        <Button
          size="small"
          disabled={onChange === undefined}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          {i18nLang.Fields.Components.File.Views.Field.UploadFile}
        </Button>
        {value.kind === 'remove' && value.previous && (
          <Button
            size="small"
            tone="negative"
            onClick={() => {
              if (value.previous !== undefined) {
                onChange?.(value?.previous);
              }
            }}
          >
            {i18nLang.Fields.Components.File.Views.Field.UndoRemoval}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

function createErrorMessage(value: FileValue) {
  if (value.kind === 'upload') {
    return validateFile(value.data);
  }
}

export function validateFile({ validity }: { validity: ValidityState }): string | undefined {
  if (!validity.valid) {
    return `${i18nLang.Fields.Components.File.Views.Field.SomethingWentWrongPleaseReloadAndTryAgain}`;
  }
}
