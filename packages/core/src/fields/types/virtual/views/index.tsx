/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { FieldContainer, FieldDescription, FieldLabel } from '@keystone-ui/fields';
import { i18nLang } from '../../../../lang/main';
import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '../../../../types';

import { PrettyData } from './PrettyData';

export const Field = ({ field, value }: FieldProps<typeof controller>) =>
  value === createViewValue ? null : (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>{field.description}</FieldDescription>
      <PrettyData data={value} />
    </FieldContainer>
  );

export const Cell: CellComponent = ({ item, field }) => {
  return <PrettyData data={item[field.path]} />;
};

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <PrettyData data={item[field.path]} />
    </FieldContainer>
  );
};

const createViewValue = Symbol(
  i18nLang.Fields.Components.Virtual.Views.Index.CreateViewVirtualFieldValue
);

export const controller = (
  config: FieldControllerConfig<{ query: string }>
): FieldController<any> => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: `${config.path}${config.fieldMeta.query}`,
    defaultValue: createViewValue,
    deserialize: data => {
      return data[config.path];
    },
    serialize: () => ({}),
  };
};
