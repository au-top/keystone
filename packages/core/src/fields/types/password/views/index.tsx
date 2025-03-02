/** @jsxRuntime classic */
/** @jsx jsx */

import { Fragment, useState } from 'react';

import { Button } from '@keystone-ui/button';
import { Stack, Text, VisuallyHidden, jsx, useTheme } from '@keystone-ui/core';
import { FieldContainer, FieldDescription, FieldLabel, TextInput } from '@keystone-ui/fields';
import { EyeIcon } from '@keystone-ui/icons/icons/EyeIcon';
import { EyeOffIcon } from '@keystone-ui/icons/icons/EyeOffIcon';
import { XIcon } from '@keystone-ui/icons/icons/XIcon';
import { SegmentedControl } from '@keystone-ui/segmented-control';
// @ts-ignore
import dumbPasswords from 'dumb-passwords';
import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '../../../../types';
import { CellContainer } from '../../../../admin-ui/components';
import { i18nLang } from '../../../../lang/main';

function validate(value: Value, validation: Validation, fieldLabel: string): string | undefined {
  if (value.kind === 'initial' && (value.isSet === null || value.isSet === true)) {
    return undefined;
  }
  if (value.kind === 'initial' && validation?.isRequired) {
    return `${fieldLabel} ${i18nLang.Fields.Components.Password.Views.Index.IsRequired}`;
  }
  if (value.kind === 'editing' && value.confirm !== value.value) {
    return `${i18nLang.Fields.Components.Password.Views.Index.ThePasswordsDoNotMatch}`;
  }
  if (value.kind === 'editing') {
    const val = value.value;
    if (val.length < validation.length.min) {
      if (validation.length.min === 1) {
        return `${fieldLabel} ${i18nLang.Fields.Components.Password.Views.Index.MustNotBeEmpty}`;
      }
      return `${fieldLabel} ${i18nLang.Fields.Components.Password.Views.Index.MustBeAtLeast} ${validation.length.min} ${i18nLang.Fields.Components.Password.Views.Index.CharactersLong}`;
    }
    if (validation.length.max !== null && val.length > validation.length.max) {
      return `${fieldLabel} ${i18nLang.Fields.Components.Password.Views.Index.MustBeNoLongerThan} ${validation.length.max} ${i18nLang.Fields.Components.Password.Views.Index.Characters}`;
    }
    if (validation.match && !validation.match.regex.test(val)) {
      return validation.match.explanation;
    }
    if (validation.rejectCommon && dumbPasswords.check(val)) {
      return `${fieldLabel} ${i18nLang.Fields.Components.Password.Views.Index.IsTooCommonAndIsNotAllowed}`;
    }
  }
  return undefined;
}

function isSetText(isSet: null | undefined | boolean) {
  return isSet == null
    ? `${i18nLang.Fields.Components.Password.Views.Index.AccessDenied}`
    : isSet
    ? `${i18nLang.Fields.Components.Password.Views.Index.IsSet}`
    : `${i18nLang.Fields.Components.Password.Views.Index.IsNotSet}`;
}

export const Field = ({
  field,
  value,
  onChange,
  forceValidation,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const [showInputValue, setShowInputValue] = useState(false);
  const [touchedFirstInput, setTouchedFirstInput] = useState(false);
  const [touchedSecondInput, setTouchedSecondInput] = useState(false);
  const shouldShowValidation = forceValidation || (touchedFirstInput && touchedSecondInput);
  const validationMessage = shouldShowValidation
    ? validate(value, field.validation, field.label)
    : undefined;
  const validation = validationMessage && (
    <Text color="red600" size="small">
      {validationMessage}
    </Text>
  );
  const inputType = showInputValue ? 'text' : 'password';
  return (
    <FieldContainer as="fieldset">
      <FieldLabel as="legend">{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>{field.description}</FieldDescription>
      {onChange === undefined ? (
        isSetText(value.isSet)
      ) : value.kind === 'initial' ? (
        <Fragment>
          <Button
            autoFocus={autoFocus}
            onClick={() => {
              onChange({
                kind: 'editing',
                confirm: '',
                value: '',
                isSet: value.isSet,
              });
            }}
          >
            {value.isSet
              ? `${i18nLang.Fields.Components.Password.Views.Index.ChangePassword}`
              : `${i18nLang.Fields.Components.Password.Views.Index.SetPassword}`}
          </Button>
          {validation}
        </Fragment>
      ) : (
        <Stack gap="small">
          <div css={{ display: 'flex' }}>
            <VisuallyHidden as="label" htmlFor={`${field.path}-new-password`}>
              {`${i18nLang.Fields.Components.Password.Views.Index.NewPassword}`}
            </VisuallyHidden>
            <TextInput
              id={`${field.path}-new-password`}
              autoFocus
              invalid={validationMessage !== undefined}
              type={inputType}
              value={value.value}
              placeholder={i18nLang.Fields.Components.Password.Views.Index.NewPassword}
              onChange={event => {
                onChange({
                  ...value,
                  value: event.target.value,
                });
              }}
              onBlur={() => {
                setTouchedFirstInput(true);
              }}
            />
            <Spacer />
            <VisuallyHidden as="label" htmlFor={`${field.path}-confirm-password`}>
              {i18nLang.Fields.Components.Password.Views.Index.ConfirmPassword}
            </VisuallyHidden>
            <TextInput
              id={`${field.path}-confirm-password`}
              invalid={validationMessage !== undefined}
              type={inputType}
              value={value.confirm}
              placeholder={i18nLang.Fields.Components.Password.Views.Index.ConfirmPassword}
              onChange={event => {
                onChange({
                  ...value,
                  confirm: event.target.value,
                });
              }}
              onBlur={() => {
                setTouchedSecondInput(true);
              }}
            />
            <Spacer />
            <Button
              onClick={() => {
                setShowInputValue(!showInputValue);
              }}
            >
              <VisuallyHidden>
                {showInputValue
                  ? `${i18nLang.Fields.Components.Password.Views.Index.HideText}`
                  : `${i18nLang.Fields.Components.Password.Views.Index.ShowText}`}
              </VisuallyHidden>
              {showInputValue ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
            <Spacer />
            <Button
              onClick={() => {
                onChange({
                  kind: 'initial',
                  isSet: value.isSet,
                });
              }}
            >
              <VisuallyHidden>Cancel</VisuallyHidden>
              <XIcon />
            </Button>
          </div>
          {validation}
        </Stack>
      )}
    </FieldContainer>
  );
};

export const Cell: CellComponent = ({ item, field }) => {
  return <CellContainer>{isSetText(item[field.path]?.isSet)}</CellContainer>;
};

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {isSetText(item[field.path]?.isSet)}
    </FieldContainer>
  );
};

type Validation = {
  isRequired: boolean;
  rejectCommon: boolean;
  match: {
    regex: RegExp;
    explanation: string;
  } | null;
  length: {
    min: number;
    max: number | null;
  };
};

export type PasswordFieldMeta = {
  isNullable: boolean;
  validation: {
    isRequired: boolean;
    rejectCommon: boolean;
    match: {
      regex: { source: string; flags: string };
      explanation: string;
    } | null;
    length: {
      min: number;
      max: number | null;
    };
  };
};

type Value =
  | {
      kind: 'initial';
      isSet: boolean | null;
    }
  | {
      kind: 'editing';
      isSet: boolean | null;
      value: string;
      confirm: string;
    };

type PasswordController = FieldController<Value, boolean> & { validation: Validation };

export const controller = (
  config: FieldControllerConfig<PasswordFieldMeta>
): PasswordController => {
  const validation: Validation = {
    ...config.fieldMeta.validation,
    match:
      config.fieldMeta.validation.match === null
        ? null
        : {
            regex: new RegExp(
              config.fieldMeta.validation.match.regex.source,
              config.fieldMeta.validation.match.regex.flags
            ),
            explanation: config.fieldMeta.validation.match.explanation,
          },
  };
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: `${config.path} {isSet}`,
    validation,
    defaultValue: {
      kind: 'initial',
      isSet: false,
    },
    validate: state => validate(state, validation, config.label) === undefined,
    deserialize: data => ({ kind: 'initial', isSet: data[config.path]?.isSet ?? null }),
    serialize: value => {
      if (value.kind === 'initial') return {};
      return { [config.path]: value.value };
    },
    filter:
      config.fieldMeta.isNullable === false
        ? undefined
        : {
            Filter(props) {
              return (
                <SegmentedControl
                  selectedIndex={Number(props.value)}
                  onChange={value => {
                    props.onChange(!!value);
                  }}
                  segments={[
                    `${i18nLang.Fields.Components.Password.Views.Index.IsNotSet}`,
                    `${i18nLang.Fields.Components.Password.Views.Index.IsSet}`,
                  ]}
                />
              );
            },
            graphql: ({ value }) => {
              return { [config.path]: { isSet: value } };
            },
            Label({ value }) {
              return value
                ? `${i18nLang.Fields.Components.Password.Views.Index.IsSet}`
                : `${i18nLang.Fields.Components.Password.Views.Index.IsNotSet}`;
            },
            types: {
              is_set: {
                label: `${i18nLang.Fields.Components.Password.Views.Index.IsSet}`,
                initialValue: true,
              },
            },
          },
  };
};

const Spacer = () => {
  const { spacing } = useTheme();
  return <div css={{ width: spacing.small, flexShrink: 0 }} />;
};
