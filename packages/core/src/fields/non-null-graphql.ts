import { i18nLang } from '../lang/main';
import { BaseListTypeInfo, FieldAccessControl, FieldData } from '../types';

export function hasReadAccessControl<ListTypeInfo extends BaseListTypeInfo>(
  access: FieldAccessControl<ListTypeInfo> | undefined
) {
  if (access === undefined) {
    return false;
  }
  return typeof access === 'function' || typeof access.read === 'function';
}

export function hasCreateAccessControl<ListTypeInfo extends BaseListTypeInfo>(
  access: FieldAccessControl<ListTypeInfo> | undefined
) {
  if (access === undefined) {
    return false;
  }
  return typeof access === 'function' || typeof access.create === 'function';
}

export function getResolvedIsNullable(
  validation: undefined | { isRequired?: boolean },
  db: undefined | { isNullable?: boolean }
): boolean {
  if (db?.isNullable === false) {
    return false;
  }
  if (db?.isNullable === undefined && validation?.isRequired) {
    return false;
  }
  return true;
}

export function assertReadIsNonNullAllowed<ListTypeInfo extends BaseListTypeInfo>(
  meta: FieldData,
  config: {
    access?: FieldAccessControl<ListTypeInfo> | undefined;
    graphql?: { read?: { isNonNull?: boolean } };
  },
  resolvedIsNullable: boolean
) {
  if (config.graphql?.read?.isNonNull) {
    if (resolvedIsNullable) {
      throw new Error(
        `${i18nLang.Fields.NonNullGraphql.AssertReadIsNonNullAllowed.ResolvedIsNullable.TheFieldAt}${meta.listKey}.${meta.fieldKey} ${i18nLang.Fields.NonNullGraphql.AssertReadIsNonNullAllowed.ResolvedIsNullable.SetsGraphqlReadIsNonNullTrueButNotValidationIsRequiredTrueOrDbIsNullableFalse}` +
          '\n' +
          `${i18nLang.Fields.NonNullGraphql.AssertReadIsNonNullAllowed.ResolvedIsNullable.SetValidationIsRequiredTrueOrDbIsNullableFalseOrDisableGraphqlReadIsNonNull}`
      );
    }
    if (hasReadAccessControl(config.access)) {
      throw new Error(
        `${i18nLang.Fields.NonNullGraphql.AssertReadIsNonNullAllowed.HasReadAccessControl.TheFieldAt}${meta.listKey}.${meta.fieldKey} ${i18nLang.Fields.NonNullGraphql.AssertReadIsNonNullAllowed.HasReadAccessControl.SetsGraphqlReadIsNonNullTrueAndHasReadAccessControlThisIsNotAllowed}` +
          '\n' +
          `${i18nLang.Fields.NonNullGraphql.AssertReadIsNonNullAllowed.HasReadAccessControl.EitherDisableGraphqlReadIsNonNullOrReadAccessControl}`
      );
    }
  }
}

export function assertCreateIsNonNullAllowed<ListTypeInfo extends BaseListTypeInfo>(
  meta: FieldData,
  config: {
    access?: FieldAccessControl<ListTypeInfo> | undefined;
    graphql?: { create?: { isNonNull?: boolean } };
  }
) {
  if (config.graphql?.create?.isNonNull && hasCreateAccessControl(config.access)) {
    throw new Error(
      `${i18nLang.Fields.NonNullGraphql.AssertCreateIsNonNullAllowed.TheFieldAt}${meta.listKey}.${meta.fieldKey} ${i18nLang.Fields.NonNullGraphql.AssertCreateIsNonNullAllowed.SetsGraphqlReadIsNonNullTrueAndHasCreateAccessControlThisIsNotAllowed}` +        '\n' +
        `${i18nLang.Fields.NonNullGraphql.AssertCreateIsNonNullAllowed.EitherDisableGraphqlReadIsNonNullOrCreateAccessControl}`
    );
  }
}
