/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Stack, useTheme } from '@keystone-ui/core';
import {
  Checkbox,
  FieldContainer,
  FieldLabel,
  FieldDescription,
  TextArea,
  TextInput,
} from '@keystone-ui/fields';
import { useState } from 'react';
import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '../../../../types';
import { CellContainer, CellLink } from '../../../../admin-ui/components';
import { i18nLang } from '../../../../lang/main';

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  forceValidation,
}: FieldProps<typeof controller>) => {
  const { typography, fields } = useTheme();
  const [shouldShowErrors, setShouldShowErrors] = useState(false);
  const validationMessages = validate(value, field.validation, field.label);
  return (
    <FieldContainer>
      <FieldLabel htmlFor={field.path}>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>{field.description}</FieldDescription>
      {onChange ? (
        <Stack gap="small">
          {field.displayMode === 'textarea' ? (
            <TextArea
              id={field.path}
              autoFocus={autoFocus}
              onChange={event =>
                onChange({ ...value, inner: { kind: 'value', value: event.target.value } })
              }
              value={value.inner.kind === 'null' ? '' : value.inner.value}
              disabled={value.inner.kind === 'null'}
              onBlur={() => {
                setShouldShowErrors(true);
              }}
              aria-describedby={
                field.description === null ? undefined : `${field.path}-description`
              }
            />
          ) : (
            <TextInput
              id={field.path}
              autoFocus={autoFocus}
              onChange={event =>
                onChange({ ...value, inner: { kind: 'value', value: event.target.value } })
              }
              value={value.inner.kind === 'null' ? '' : value.inner.value}
              disabled={value.inner.kind === 'null'}
              onBlur={() => {
                setShouldShowErrors(true);
              }}
              aria-describedby={
                field.description === null ? undefined : `${field.path}-description`
              }
            />
          )}
          {field.isNullable && (
            <Checkbox
              autoFocus={autoFocus}
              disabled={onChange === undefined}
              onChange={() => {
                if (value.inner.kind === 'value') {
                  onChange({
                    ...value,
                    inner: {
                      kind: 'null',
                      prev: value.inner.value,
                    },
                  });
                } else {
                  onChange({
                    ...value,
                    inner: {
                      kind: 'value',
                      value: value.inner.prev,
                    },
                  });
                }
              }}
              checked={value.inner.kind === 'null'}
            >
              <span css={{ fontWeight: typography.fontWeight.semibold, color: fields.labelColor }}>
                {i18nLang.Fields.Components.Text.Views.Index.SetFieldAsNull}
              </span>
            </Checkbox>
          )}
          {!!validationMessages.length &&
            (shouldShowErrors || forceValidation) &&
            validationMessages.map((message, i) => (
              <span key={i} css={{ color: 'red' }}>
                {message}
              </span>
            ))}
        </Stack>
      ) : value.inner.kind === 'null' ? null : (
        value.inner.value
      )}
    </FieldContainer>
  );
};

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] + '';
  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>;
};
Cell.supportsLinkTo = true;

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path]}
    </FieldContainer>
  );
};

type Config = FieldControllerConfig<import('..').TextFieldMeta>;

type Validation = {
  isRequired: boolean;
  match: { regex: RegExp; explanation: string | null } | null;
  length: { min: number | null; max: number | null };
};

function validate(value: TextValue, validation: Validation, fieldLabel: string): string[] {
  // if the value is the same as the initial for an update, we don't want to block saving
  // since we're not gonna send it anyway if it's the same
  // and going "fix this thing that is unrelated to the thing you're doing" is bad
  // and also bc it could be null bc of read access control
  if (
    value.kind === 'update' &&
    ((value.initial.kind === 'null' && value.inner.kind === 'null') ||
      (value.initial.kind === 'value' &&
        value.inner.kind === 'value' &&
        value.inner.value === value.initial.value))
  ) {
    return [];
  }

  if (value.inner.kind === 'null') {
    if (validation.isRequired) {
      return [`${fieldLabel} ${i18nLang.Fields.Components.Text.Views.Index.IsRequired}`];
    }
    return [];
  }

  const val = value.inner.value;

  let messages: string[] = [];
  if (validation.length.min !== null && val.length < validation.length.min) {
    if (validation.length.min === 1) {
      messages.push(`${fieldLabel} ${i18nLang.Fields.Components.Text.Views.Index.MustNotBeEmpty}`);
    } else {
      messages.push(
        `${fieldLabel} ${i18nLang.Fields.Components.Text.Views.Index.MustBeAtLeast} ${validation.length.min} ${i18nLang.Fields.Components.Text.Views.Index.CharactersLong}`
      );
    }
  }
  if (validation.length.max !== null && val.length > validation.length.max) {
    messages.push(
      `${fieldLabel} ${i18nLang.Fields.Components.Text.Views.Index.MustBeNoLongerThan} ${validation.length.max} ${i18nLang.Fields.Components.Text.Views.Index.Characters}`
    );
  }
  if (validation.match && !validation.match.regex.test(val)) {
    messages.push(
      validation.match.explanation ||
        `${fieldLabel} ${i18nLang.Fields.Components.Text.Views.Index.MustMatch} ${validation.match.regex}`
    );
  }
  return messages;
}
type InnerTextValue = { kind: 'null'; prev: string } | { kind: 'value'; value: string };

type TextValue =
  | { kind: 'create'; inner: InnerTextValue }
  | { kind: 'update'; inner: InnerTextValue; initial: InnerTextValue };

function deserializeTextValue(value: string | null): InnerTextValue {
  if (value === null) {
    return { kind: 'null', prev: '' };
  }
  return { kind: 'value', value };
}

export const controller = (
  config: Config
): FieldController<TextValue, string> & {
  displayMode: 'input' | 'textarea';
  validation: Validation;
  isNullable: boolean;
} => {
  const validation: Validation = {
    isRequired: config.fieldMeta.validation.isRequired,
    length: config.fieldMeta.validation.length,
    match: config.fieldMeta.validation.match
      ? {
          regex: new RegExp(
            config.fieldMeta.validation.match.regex.source,
            config.fieldMeta.validation.match.regex.flags
          ),
          explanation: config.fieldMeta.validation.match.explanation,
        }
      : null,
  };
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: { kind: 'create', inner: deserializeTextValue(config.fieldMeta.defaultValue) },
    displayMode: config.fieldMeta.displayMode,
    isNullable: config.fieldMeta.isNullable,
    deserialize: data => {
      const inner = deserializeTextValue(data[config.path]);
      return { kind: 'update', inner, initial: inner };
    },
    serialize: value => ({ [config.path]: value.inner.kind === 'null' ? null : value.inner.value }),
    validation,
    validate: val => validate(val, validation, config.label).length === 0,
    filter: {
      Filter(props) {
        return (
          <TextInput
            onChange={event => {
              props.onChange(event.target.value);
            }}
            value={props.value}
            autoFocus={props.autoFocus}
          />
        );
      },

      graphql: ({ type, value }) => {
        const isNot = type.startsWith('not_');
        const key =
          type === 'is_i' || type === 'not_i'
            ? 'equals'
            : type
                .replace(/_i$/, '')
                .replace('not_', '')
                .replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());
        const filter = { [key]: value };
        return {
          [config.path]: {
            ...(isNot ? { not: filter } : filter),
            mode: config.fieldMeta.shouldUseModeInsensitive ? 'insensitive' : undefined,
          },
        };
      },
      Label({ label, value }) {
        return `${label.toLowerCase()}: "${value}"`;
      },
      types: {
        contains_i: {
          label: i18nLang.Fields.Components.Text.Views.Index.Contains,
          initialValue: '',
        },
        not_contains_i: {
          label: i18nLang.Fields.Components.Text.Views.Index.DoesNotContain,
          initialValue: '',
        },
        is_i: {
          label: i18nLang.Fields.Components.Text.Views.Index.IsExactly,
          initialValue: '',
        },
        not_i: {
          label: i18nLang.Fields.Components.Text.Views.Index.IsNotExactly,
          initialValue: '',
        },
        starts_with_i: {
          label: i18nLang.Fields.Components.Text.Views.Index.StartsWith,
          initialValue: '',
        },
        not_starts_with_i: {
          label: i18nLang.Fields.Components.Text.Views.Index.DoesNotStartWith,
          initialValue: '',
        },
        ends_with_i: {
          label: i18nLang.Fields.Components.Text.Views.Index.EndsWith,
          initialValue: '',
        },
        not_ends_with_i: {
          label: i18nLang.Fields.Components.Text.Views.Index.DoesNotEndWith,
          initialValue: '',
        },
      },
    },
  };
};
