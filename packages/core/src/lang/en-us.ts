export const Lang = {
  AdminUIUtils: {
    Fields: {
      ThereAreNoFieldsThatYouCanReadOrEdit: 'There are no fields that you can read or edit',
    },
    UseCreateItem: {
      CreatedSuccessfully: 'Created Successfully',
    },
    UsePreventNavigation: {
      ThereAreUnsavedChangesAreYouSureYouWantToExit:
        'There are unsaved changes, are you sure you want to exit?',
    },
  },
  AdminUIPages: {
    HomePage: {
      Create: 'Create',
      LoadingLists: 'Loading lists',
      NoAccess: 'No access',
      LoadingCountOf: 'Loading count of',
    },
    ItemPage: {
      NoChanges: 'No changes',
      SaveChanges: 'Save changes',
      ItemID: 'Item ID',
      TheItemWithId: 'The item with id ',
      CouldNotBeFoundOrYouDonTHaveAccessToIt: "could not be found or you don't have access to it",
      Loading: 'Loading',
      AreYouSureYouWantToDelete: 'Are you sure you want to delete',
      AreYouSureYouWantToResetChanges: 'Are you sure you want to reset changes',
      Deleted: 'Deleted',
      ItemSuccessfully: 'item successfully',
      FailedToDelete: 'Failed to delete',
      Item: 'item',
      Delete: 'Delete',
      DeleteConfirmation: 'Delete Confirmation',
      FailedToUpdateItem: 'Failed to update item',
      SavedSuccessfully: 'Saved successfully',
      LoadingItemData: 'Loading item data',
      ResetChanges: 'Reset changes',
    },
    ListPage: {
      CreateItemPage: {
        Create: 'Create',
        LoadingCreateForm: 'Loading create form',
      },
      FieldSelection: {
        Column: 'column',
        ColumnsOptionsListOfColumnOptionsToApplyToThe:
          'Columns options, list of column options to apply to the',
        List: 'list',
      },
      FilterAdd: {
        Column: 'column',
        FilterList: 'Filter List',
        FiltersOptionsListOfFiltersToApplyToThe: 'Filters options, list of filters to apply to the',
        List: 'list',
        Apply: 'Apply',
        Cancel: 'Cancel',
        Back: 'Back',
      },
      FilterList: {
        Save: 'Save',
        Cancel: 'Cancel',
      },
      Index: {
        ResetToDefaults: 'Reset to defaults',
        Error: 'Error',
        Selected: 'Selected',
        SortedBy: 'sorted by',
        With: 'with',
        LoadingItemData: 'Loading item data',
        No: 'No',
        Found: 'found',
        Delete: 'Delete',
        DeleteConfirmation: 'Delete Confirmation',
        FailedToDelete: 'Failed to delete',
        Of: 'of',
        Successfully: 'Successfully',
        Cancel: 'Cancel',
        Create: 'Create',
        List: 'list',
        AreYouSureYouWantToDelete: 'Are you sure you want to delete',
      },
      SortSelection: {
        Ascending: 'ascending',
        Descending: 'descending',
        NoField: 'No field',
        Sort: 'Sort',
      },
    },
    NoAccessPage: {
      Index: {
        YouDonTHaveAccessToThisPage: "You don't have access to this page.",
      },
    },
    Index: {
      IsExactly: 'Is exactly',
      IsNotExactly: 'Is not exactly',
      IsGreaterThen: 'Is greater then',
      IsLessThan: 'Is less than',
      IsGreaterThanOrEqualTo: 'Is greater than or equal to',
      IsLessThanOrEqualTo: 'Is less than or equal to',
      IsOneOf: 'Is one of',
      IsNotOneOf: 'Is not one of',
    },
  },
  AdminUIComponents: {
    SignoutButton: {
      SignOut: 'Sign Out',
    },
    Pagination: {
      PerPage: 'per page',
      Showing: 'Showing',
      No: 'No',
      Of: 'of',
      $AriaLabel: {
        Pagination: 'Pagination',
        PreviousPage: 'Previous page',
        NextPage: 'Next page',
      },
    },
    Navigation: {
      SignedInAs: 'Signed in as',
      $AriaLabel: {
        SideNavigation: 'Side Navigation',
        LinksAndSignout: 'Links and signout',
      },
    },
    Errors: {
      SomethingWentWrong: 'Something went wrong.',
      ReloadPage: 'reload page',
    },
    CreateItemDrawer: {
      Create: 'Create',
      Cancel: 'Cancel',
      LoadingCreateForm: 'Loading create form',
      ThereAreUnsavedChangesAreYouSureYouWantToExit:
        'There are unsaved changes, are you sure you want to exit?',
    },
  },
  Fields: {
    Components: {
      Bigint: {
        Views: {
          Index: {
            DefaultsToAnIncrementedNumber: 'Defaults to an incremented number',
            MustBeAWholeNumber: 'must be a whole number',
            IsRequired: 'is required',
            MustBeGreaterThanOrEqualTo: 'must be greater than or equal to',
            MustBeLessThanOrEqualTo: 'must be less than or equal to',
            IsExactly: 'Is exactly',
            IsNotExactly: 'Is not exactly',
            IsGreaterThan: 'Is greater than',
            IsLessThan: 'Is less than',
            IsGreaterThanOrEqualTo: 'Is greater than or equal to',
            IsLessThanOrEqualTo: 'Is less than or equal to',
            IsOneOf: 'Is one of',
            IsNotOneOf: 'Is not one of',
          },
        },
        Index: {
          MustBeGreaterThanOrEqualTo: 'must be greater than or equal to',
          MustBeLessThanOrEqualTo: 'must be less than or equal to',
          IsRequired: 'is required',
        },
      },
      CalendarDay: {
        Views: {
          Index: {
            IsRequired: 'is required',
          },
        },
        Index: {
          IsRequired: 'is required',
        },
      },
      Checkbox: {
        Views: {
          Index: {
            Is: 'is',
            IsNot: 'is not',
            True: 'True',
            False: 'False',
          },
        },

        Index: {
          CheckboxFieldsCannotBeSetToNull: 'Checkbox fields cannot be set to null',
        },
      },

      Decimal: {
        Index: {
          IsRequired: 'is required',
          MustBeGreaterThanOrEqualTo: 'must be greater than or equal to',
          MustBeLessThanOrEqualTo: 'must be less than or equal to',
        },
        Views: {
          Index: {
            MustBeANumber: 'must be a number',
            MustBeFinite: 'must be finite',
            IsRequired: 'is required',
            MustBeGreaterThanOrEqualTo: 'must be greater than or equal to',
            MustBeLessThanOrEqualTo: 'must be less than or equal to',
            IsExactly: 'Is exactly',
            IsNotExactly: 'Is not exactly',
            IsGreaterThen: 'Is greater then',
            IsLessThan: 'Is less than',
            IsGreaterThanOrEqualTo: 'Is greater than or equal to',
            IsLessThanOrEqualTo: 'Is less than or equal to',
            IsOneOf: 'Is one of',
            IsNotOneOf: 'Is not one of',
          },
        },
      },
      File: {
        Views: {
          Field: {
            Size: 'Size',
            FileLinkedSaveToCompleteUpload: 'File linked, save to complete upload',
            Change: 'Change',
            Remove: 'Remove',
            Cancel: 'Cancel',
            UploadFile: 'Upload File',
            UndoRemoval: 'Undo removal',
            SomethingWentWrongPleaseReloadAndTryAgain:
              'Something went wrong, please reload and try again.',
          },
        },
      },
      Float: {
        Views: {
          Index: {
            IsRequired: 'is required',
            MustBeANumber: 'must be a number',
            MustBeFinite: 'must be finite',
            MustBeGreaterThanOrEqualTo: 'must be greater than or equal to',
            MustBeLessThanOrEqualTo: 'must be less than or equal to',
            IsExactly: 'Is exactly',
            IsNotExactly: 'Is not exactly',
            IsGreaterThen: 'Is greater then',
            IsLessThan: 'Is less than',
            IsGreaterThanOrEqualTo: 'Is greater than or equal to',
            IsLessThanOrEqualTo: 'Is less than or equal to',
            IsOneOf: 'Is one of',
            IsNotOneOf: 'Is not one of',
          },
        },
      },
      Image: {
        Views: {
          Field: {
            Size: 'Size',
            SaveToCompleteUpload: 'Save to complete upload',
            Change: 'Change',
            Remove: 'Remove',
            Cancel: 'Cancel',
            UploadImage: 'Upload Image',
            UndoRemoval: 'Undo removal',
            Dimensions: 'Dimensions',
            SomethingWentWrongPleaseReloadAndTryAgain:
              'Something went wrong, please reload and try again.',
            SorryThatFileTypeIsnTAcceptedPleaseTry:
              "Sorry, that file type isn't accepted. Please try",
            Or: 'or',
          },
        },
      },
      Integer: {
        Views: {
          Field: {
            DefaultsToAnIncrementedNumber: 'Defaults to an incremented number',
            MustBeAWholeNumber: 'must be a whole number',
            MustBeGreaterThanOrEqualTo: 'must be greater than or equal to',
            MustBeLessThanOrEqualTo: 'must be less than or equal to',
            IsExactly: 'Is exactly',
            IsNotExactly: 'Is not exactly',
            IsGreaterThen: 'Is greater then',
            IsLessThan: 'Is less than',
            IsGreaterThanOrEqualTo: 'Is greater than or equal to',
            IsLessThanOrEqualTo: 'Is less than or equal to',
            IsOneOf: 'Is one of',
            IsNotOneOf: 'Is not one of',
          },
        },
        Index: {
          MustBeGreaterThanOrEqualTo: 'must be greater than or equal to',
          MustBeLessThanOrEqualTo: 'must be less than or equal to',
        },
      },
      Json: {
        Views: {
          Index: {
            Invalid: 'Invalid',
          },
        },
      },
      Multiselect: {
        Index: {
          MultiselectFieldsCannotBeSetToNull: 'multiselect fields cannot be set to null',
          IsNotAPossibleValueFor: 'is not a possible value for',
          MustHaveAUniqueSetOfOptionsSelected: 'must have a unique set of options selected',
        },
      },
      Password: {
        Views: {
          Index: {
            IsRequired: 'is required',
            ThePasswordsDoNotMatch: 'The passwords do not match',
            MustNotBeEmpty: 'must not be empty',
            MustBeAtLeast: 'must be at least',
            CharactersLong: 'characters long',
            MustBeNoLongerThan: 'must be no longer than',
            Characters: 'characters',
            IsTooCommonAndIsNotAllowed: 'is too common and is not allowed',
            PasswordFiltersCannotBeSetToNull: 'Password filters cannot be set to null',
            AccessDenied: 'Access Denied',
            IsSet: 'Is set',
            IsNotSet: 'Is not set',
            ChangePassword: 'Change Password',
            SetPassword: 'Set Password',
            NewPassword: 'New Password',
            HideText: 'Hide Text',
            ShowText: 'Show Text',
            ConfirmPassword: 'Confirm Password',
          },
        },
        Index: {
          IsRequired: 'is required',
          MustNotBeEmpty: 'must not be empty',
          MustBeAtLeast: 'must be at least',
          CharactersLong: 'characters long',
          MustBeNoLongerThan: 'must be no longer than',
          Characters: 'characters',
          IsTooCommonAndIsNotAllowed: 'is too common and is not allowed',
          PasswordFiltersCannotBeSetToNull: 'Password filters cannot be set to null',
        },
      },
      Relationship: {
        Index: {
          ViewRelated: 'View related',
          View: 'View',
          Details: 'details',
          LinkedToThis: 'linked to this',
        },
        Views: {
          Index: {
            CreateRelated: 'Create related',
            HasNoValue: 'has no value',
            IsIn: 'is in',
            Is: 'is',
          },
          Cards: {
            Index: {
              SelectA: 'Select a',
              ThisItemWillNotBeDeletedItWillOnlyBeRemovedFromThisField:
                'This item will not be deleted. It will only be removed from this field.',
              YouMustFinishCreatingAndEditingAnyRelated:
                'You must finish creating and editing any related',
              LoadingItemsFor: 'Loading items for',
              View: 'View',
              Details: 'details',
              LinkExisting: 'Link existing',
              Field: 'field',
              Remove: 'Remove',
              Create: 'Create',
              Edit: 'Edit',
              Cancel: 'Cancel',
              Done: 'Done',
              Before: 'before',
              SavingThe: 'saving the',
              ThereIs1: 'There is 1',
              ThereAre: 'There are',
              LinkedToThis: 'linked to this',
            },
            InlineCreate: {
              FailedToCreateItem: 'Failed to create item',
              FailedToUpdateItem: 'Failed to update item',
              SavedSuccessfully: 'Saved successfully',
              Create: 'Create',
              Cancel: 'Cancel',
            },
            InlineEdit: {
              FailedToCreateItem: 'Failed to create item',
              FailedToUpdateItem: 'Failed to update item',
              SavedSuccessfully: 'Saved successfully',
              Save: 'Save',
              Cancel: 'Cancel',
            },
          },
        },
      },
      Select: {
        Views: {
          Index: {
            IsRequired: 'is required',
            Clear: 'Clear',
          },
        },
        Index: {
          IsRequired: 'is required',
          IsNotAPossibleValueFor: 'is not a possible value for',
        },
      },
      Text: {
        Views: {
          Index: {
            SetFieldAsNull: 'Set field as null',
            Contains: 'Contains',
            DoesNotContain: 'Does not contain',
            IsExactly: 'Is exactly',
            IsNotExactly: 'Is not exactly',
            StartsWith: 'Starts with',
            DoesNotStartWith: 'Does not start with',
            EndsWith: 'Ends with',
            DoesNotEndWith: 'Does not end with',
            IsRequired: 'is required',
            ThePasswordsDoNotMatch: 'The passwords do not match',
            MustNotBeEmpty: 'must not be empty',
            MustBeAtLeast: 'must be at least',
            CharactersLong: 'characters long',
            MustBeNoLongerThan: 'must be no longer than',
            Characters: 'characters',
            MustMatch: 'must match',
          },
        },
        Index: {
          IsRequired: 'is required',
          MustNotBeEmpty: 'must not be empty',
          MustBeAtLeast: 'must be at least',
          CharactersLong: 'characters long',
          MustBeNoLongerThan: 'must be no longer than',
          Characters: 'characters',
          MustMatch: 'must match',
        },
      },
      Timestamp: {
        Views: {
          Index: {
            WhenThisItemIsSavedThisFieldWillBeSetToTheCurrentDateAndTime:
              'When this item is saved, this field will be set to the current date and time',
            IsRequired: 'is required',
            RequiresATimeToBeProvided: 'requires a time to be provided',
            RequiresAValidTimeInTheFormatHHMM: 'requires a valid time in the format hh:mm',
            RequiresADateToBeSelected: 'requires a date to be selected',
          },
        },
      },
      Virtual: {
        Views: {
          Index: {
            CreateViewVirtualFieldValue: 'create view virtual field value',
          },
        },
      },
    },
    NonNullGraphql: {
      AssertReadIsNonNullAllowed: {
        ResolvedIsNullable: {
          TheFieldAt: 'The field at ',
          SetsGraphqlReadIsNonNullTrueButNotValidationIsRequiredTrueOrDbIsNullableFalse:
            'sets graphql.read.isNonNull: true but not validation.isRequired: true or db.isNullable: false.',
          SetValidationIsRequiredTrueOrDbIsNullableFalseOrDisableGraphqlReadIsNonNull:
            'Set validation.isRequired: true or db.isNullable: false or disable graphql.read.isNonNull',
        },
        HasReadAccessControl: {
          TheFieldAt: 'The field at',
          SetsGraphqlReadIsNonNullTrueAndHasReadAccessControlThisIsNotAllowed:
            'sets graphql.read.isNonNull: true and has read access control, this is not allowed.',
          EitherDisableGraphqlReadIsNonNullOrReadAccessControl:
            'Either disable graphql.read.isNonNull or read access control.',
        },
      },
      AssertCreateIsNonNullAllowed: {
        TheFieldAt: 'The field at',
        SetsGraphqlReadIsNonNullTrueAndHasCreateAccessControlThisIsNotAllowed:
          'sets graphql.create.isNonNull: true and has create access control, this is not allowed.',
        EitherDisableGraphqlReadIsNonNullOrCreateAccessControl:
          'Either disable graphql.create.isNonNull or create access control.',
      },
    },
  },
  DefineConst: {
    Dashboard: 'Dashboard',
  },
  Auth: {
    Lib: {
      GetErrorMessage: {
        AuthTokenRedemptionFailed: 'Auth token redemption failed.',
        TheAuthTokenProvidedHasExpired: 'The auth token provided has expired.',
        AuthTokensAreSingleUseAndTheAuthTokenProvidedHasAlreadyBeenRedeemed:
          'Auth tokens are single use and the auth token provided has already been redeemed.',
      },
    },
    Pages: {
      InitPage: {
        Welcome: 'Welcome',
        ThanksForInstalling: 'Thanks for installing ',
        WhileYouReGettingStartedCheckOutTheDocsAt:
          " While you're getting started, check out the docs at{' '}",
        IfYouDLikeToStayUpToDateWithTheExcitingThingsWeHavePlannedJoinOurMailingListJustUsefulAnnouncementsNoSpam:
          "If you'd like to stay up to date with the exciting things we have planned, join our mailing list (just useful announcements, no spam!)",
        SignUpToOurMailingList: 'sign up to our mailing list',
        EmailAddress: 'Email Address',
        Continue: 'Continue',
        TryAgain: 'Try again',
        LoadingPage: 'Loading page',
        WelcomeTo: 'Welcome to',
        CreateYourFirstUserToGetStarted: 'Create your first user to get started',
        GetStarted: 'Get started',
      },
      SigninPage: {
        LoadingPage: 'Loading page',
        Sign_In: 'Sign In',
        LogResetLink: 'Log reset link',
        GoBack: 'Go back',
      },
    },
  },
};
export type EN_US_Type = typeof Lang;
