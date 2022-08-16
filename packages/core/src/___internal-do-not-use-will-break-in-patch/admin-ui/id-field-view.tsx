/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields';
import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  IdFieldConfig,
} from '../../types';
import { CellLink, CellContainer } from '../../admin-ui/components';
import { i18nLang } from '../../lang/main';

export const Field = () => null;

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

export const controller = (
  config: FieldControllerConfig<IdFieldConfig>
): FieldController<void, string> & { idFieldKind: IdFieldConfig['kind'] } => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    idFieldKind: config.fieldMeta.kind,
    defaultValue: undefined,
    deserialize: () => {},
    serialize: () => ({}),
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
        if (type === 'not') {
          return { [config.path]: { not: { equals: value } } };
        }
        const valueWithoutWhitespace = value.replace(/\s/g, '');
        const key = type === 'is' ? 'equals' : type === 'not_in' ? 'notIn' : type;

        return {
          [config.path]: {
            [key]: ['in', 'not_in'].includes(type)
              ? valueWithoutWhitespace.split(',')
              : valueWithoutWhitespace,
          },
        };
      },
      Label({ label, value, type }) {
        let renderedValue = value.replace(/\s/g, '');
        if (['in', 'not_in'].includes(type)) {
          renderedValue = value.split(',').join(', ');
        }
        return `${label.toLowerCase()}: ${renderedValue}`;
      },
      types: {
        is: { label: i18nLang.AdminUIPages.Index.IsExactly, initialValue: '' },
        not: { label: i18nLang.AdminUIPages.Index.IsNotExactly, initialValue: '' },
        gt: { label: i18nLang.AdminUIPages.Index.IsGreaterThen, initialValue: '' },
        lt: { label: i18nLang.AdminUIPages.Index.IsLessThan, initialValue: '' },
        gte: { label: i18nLang.AdminUIPages.Index.IsGreaterThanOrEqualTo, initialValue: '' },
        lte: { label: i18nLang.AdminUIPages.Index.IsLessThanOrEqualTo, initialValue: '' },
        in: { label: i18nLang.AdminUIPages.Index.IsOneOf, initialValue: '' },
        not_in: { label: i18nLang.AdminUIPages.Index.IsNotOneOf, initialValue: '' },
      },
    },
  };
};
