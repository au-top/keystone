import * as R from 'ramda';
import type { PartialDeep } from 'type-fest';
import { EN_US_Type } from './en-us';

const fromAILang: EN_US_Type = {
  AdminUIUtils: {
    Fields: {
      ThereAreNoFieldsThatYouCanReadOrEdit: '没有您可以阅读或编辑的字段',
    },
    UseCreateItem: {
      CreatedSuccessfully: '成功创建',
    },
    UsePreventNavigation: {
      ThereAreUnsavedChangesAreYouSureYouWantToExit: '有未保存的更改，您确定要退出吗？',
    },
  },
  AdminUIPages: {
    HomePage: {
      Create: '新建',
      LoadingLists: '加载列表',
      NoAccess: '无访问权限',
      LoadingCountOf: '加载计数',
      Item: '项目',
    },
    ItemPage: {
      NoChanges: '无更改',
      SaveChanges: '保存更改',
      ItemID: '项目ID',
      TheItemWithId: '具有ID的项目',
      CouldNotBeFoundOrYouDonTHaveAccessToIt: '找不到或您无法访问它',
      Loading: '加载',
      AreYouSureYouWantToDelete: '你确定你要删除',
      AreYouSureYouWantToResetChanges: '您确定要重置更改吗',
      Deleted: '删除',
      ItemSuccessfully: '项目成功',
      FailedToDelete: '无法删除',
      Item: '项目',
      Delete: '删除',
      DeleteConfirmation: '删除确认',
      FailedToUpdateItem: '无法更新项目',
      SavedSuccessfully: '保存成功',
      LoadingItemData: '加载项目数据',
      ResetChanges: '重置更改',
    },
    ListPage: {
      CreateItemPage: {
        Create: '新建',
        LoadingCreateForm: '加载创建表单',
      },
      FieldSelection: {
        Column: '列',
        ColumnsOptionsListOfColumnOptionsToApplyToThe: '列选项，用于应用于的列选项列表',
        List: '列表',
      },
      FilterAdd: {
        Column: '列',
        FilterList: '过滤器列表',
        FiltersOptionsListOfFiltersToApplyToThe: '过滤器选项，用于申请的过滤器列表',
        List: '列表',
        Apply: '申请',
        Cancel: '取消',
        Back: '后退',
      },
      FilterList: {
        Save: '保存',
        Cancel: '取消',
      },
      Index: {
        ResetToDefaults: '重置为默认值',
        Error: '错误',
        Selected: '选定',
        SortedBy: '排序',
        With: '和',
        LoadingItemData: '加载项目数据',
        No: '无',
        Found: '存在',
        Delete: '删除',
        DeleteConfirmation: '删除确认',
        FailedToDelete: '无法删除',
        Of: '的',
        Successfully: '成功',
        Cancel: '取消',
        Create: '新建',
        List: '列表',
        AreYouSureYouWantToDelete: '你确定你要删除',
      },
      SortSelection: {
        Ascending: '上升',
        Descending: '下降',
        NoField: '没有字段',
        Sort: '排序',
      },
    },
    NoAccessPage: {
      Index: {
        YouDonTHaveAccessToThisPage: '您无法访问此页面。',
      },
    },
    Index: {
      IsExactly: '完全是',
      IsNotExactly: '不完全是',
      IsGreaterThen: '大于',
      IsLessThan: '小于',
      IsGreaterThanOrEqualTo: '大于或等于',
      IsLessThanOrEqualTo: '小于或等于',
      IsOneOf: '是其中之一',
      IsNotOneOf: '不是之一',
    },
  },
  AdminUIComponents: {
    SignoutButton: {
      SignOut: '登出',
    },
    Pagination: {
      PerPage: '每页',
      Showing: '显示',
      No: '无',
      Of: '的',
      $AriaLabel: {
        Pagination: '分页',
        PreviousPage: '上一页',
        NextPage: '下一页',
      },
    },
    Navigation: {
      SignedInAs: '登录AS',
      $AriaLabel: {
        SideNavigation: '侧导航',
        LinksAndSignout: '链接和签名',
      },
    },
    Errors: {
      SomethingWentWrong: '出问题了。',
      ReloadPage: '重新加载页面',
    },
    CreateItemDrawer: {
      Create: '新建',
      Cancel: '取消',
      LoadingCreateForm: '加载创建表单',
      ThereAreUnsavedChangesAreYouSureYouWantToExit: '有未保存的更改，您确定要退出吗？',
    },
  },
  Fields: {
    Components: {
      Bigint: {
        Views: {
          Index: {
            DefaultsToAnIncrementedNumber: '默认为递增的数字',
            MustBeAWholeNumber: '必须是整数',
            IsRequired: '是必须的',
            MustBeGreaterThanOrEqualTo: '必须大于或等于',
            MustBeLessThanOrEqualTo: '必须小于或等于',
            IsExactly: '完全是',
            IsNotExactly: '不完全是',
            IsGreaterThan: '大于',
            IsLessThan: '小于',
            IsGreaterThanOrEqualTo: '大于或等于',
            IsLessThanOrEqualTo: '小于或等于',
            IsOneOf: '是其中之一',
            IsNotOneOf: '不是之一',
          },
        },
        Index: {
          MustBeGreaterThanOrEqualTo: '必须大于或等于',
          MustBeLessThanOrEqualTo: '必须小于或等于',
          IsRequired: '是必须的',
        },
      },
      CalendarDay: {
        Views: {
          Index: {
            IsRequired: '是必须的',
          },
        },
        Index: {
          IsRequired: '是必须的',
        },
      },
      Checkbox: {
        Views: {
          Index: {
            Is: '是',
            IsNot: '不是',
            True: '真的',
            False: '错误的',
          },
        },
        Index: {
          CheckboxFieldsCannotBeSetToNull: '复选框字段无法设置为null',
        },
      },
      Decimal: {
        Index: {
          IsRequired: '是必须的',
          MustBeGreaterThanOrEqualTo: '必须大于或等于',
          MustBeLessThanOrEqualTo: '必须小于或等于',
        },
        Views: {
          Index: {
            MustBeANumber: '必须是一个数字',
            MustBeFinite: '必须是有限的',
            IsRequired: '是必须的',
            MustBeGreaterThanOrEqualTo: '必须大于或等于',
            MustBeLessThanOrEqualTo: '必须小于或等于',
            IsExactly: '完全是',
            IsNotExactly: '不完全是',
            IsGreaterThen: '大于',
            IsLessThan: '小于',
            IsGreaterThanOrEqualTo: '大于或等于',
            IsLessThanOrEqualTo: '小于或等于',
            IsOneOf: '是其中之一',
            IsNotOneOf: '不是之一',
          },
        },
      },
      File: {
        Views: {
          Field: {
            Size: '大小',
            FileLinkedSaveToCompleteUpload: '文件链接，保存以完成上传',
            Change: '改变',
            Remove: '删除',
            Cancel: '取消',
            UploadFile: '上传文件',
            UndoRemoval: '撤消删除',
            SomethingWentWrongPleaseReloadAndTryAgain: '出现问题，请重新加载，然后重试。',
          },
        },
      },
      Float: {
        Views: {
          Index: {
            IsRequired: '是必须的',
            MustBeANumber: '必须是一个数字',
            MustBeFinite: '必须是有限的',
            MustBeGreaterThanOrEqualTo: '必须大于或等于',
            MustBeLessThanOrEqualTo: '必须小于或等于',
            IsExactly: '完全是',
            IsNotExactly: '不完全是',
            IsGreaterThen: '大于',
            IsLessThan: '小于',
            IsGreaterThanOrEqualTo: '大于或等于',
            IsLessThanOrEqualTo: '小于或等于',
            IsOneOf: '是其中之一',
            IsNotOneOf: '不是之一',
          },
        },
      },
      Image: {
        Views: {
          Field: {
            Size: '大小',
            SaveToCompleteUpload: '保存以完成上传',
            Change: '改变',
            Remove: '删除',
            Cancel: '取消',
            UploadImage: '上传图片',
            UndoRemoval: '撤消删除',
            Dimensions: '尺寸',
            SomethingWentWrongPleaseReloadAndTryAgain: '出现问题，请重新加载，然后重试。',
            SorryThatFileTypeIsnTAcceptedPleaseTry: '抱歉，该文件类型不接受。 请试试',
            Or: '或者',
          },
        },
      },
      Integer: {
        Views: {
          Field: {
            DefaultsToAnIncrementedNumber: '默认为递增的数字',
            MustBeAWholeNumber: '必须是整数',
            MustBeGreaterThanOrEqualTo: '必须大于或等于',
            MustBeLessThanOrEqualTo: '必须小于或等于',
            IsExactly: '完全是',
            IsNotExactly: '不完全是',
            IsGreaterThen: '大于',
            IsLessThan: '小于',
            IsGreaterThanOrEqualTo: '大于或等于',
            IsLessThanOrEqualTo: '小于或等于',
            IsOneOf: '是其中之一',
            IsNotOneOf: '不是之一',
          },
        },
        Index: {
          MustBeGreaterThanOrEqualTo: '必须大于或等于',
          MustBeLessThanOrEqualTo: '必须小于或等于',
        },
      },
      Json: {
        Views: {
          Index: {
            Invalid: '无效的',
          },
        },
      },
      Multiselect: {
        Index: {
          MultiselectFieldsCannotBeSetToNull: '多选择字段不能设置为null',
          IsNotAPossibleValueFor: '不是可能的值',
          MustHaveAUniqueSetOfOptionsSelected: '必须选择一组独特的选项',
        },
      },
      Password: {
        Views: {
          Index: {
            IsRequired: '是必须的',
            ThePasswordsDoNotMatch: '密码不匹配',
            MustNotBeEmpty: '不能空的',
            MustBeAtLeast: '必须至少',
            CharactersLong: '字符长度',
            MustBeNoLongerThan: '不得超过',
            Characters: '字符',
            IsTooCommonAndIsNotAllowed: '太常见了，不允许',
            PasswordFiltersCannotBeSetToNull: '密码过滤器不能设置为null',
            AccessDenied: '拒绝访问',
            IsSet: '设置',
            IsNotSet: '未设置',
            ChangePassword: '更改密码',
            SetPassword: '设置密码',
            NewPassword: '新密码',
            HideText: '隐藏文字',
            ShowText: '显示文字',
            ConfirmPassword: '确认密码',
          },
        },
        Index: {
          IsRequired: '是必须的',
          MustNotBeEmpty: '不能空的',
          MustBeAtLeast: '必须至少',
          CharactersLong: '字符长度',
          MustBeNoLongerThan: '不得超过',
          Characters: '字符',
          IsTooCommonAndIsNotAllowed: '太常见了，不允许',
          PasswordFiltersCannotBeSetToNull: '密码过滤器不能设置为null',
        },
      },
      Relationship: {
        Index: {
          ViewRelated: '查看相关',
          View: '查看',
          Details: '详细',
          LinkedToThis: '连接到这个',
        },
        Views: {
          Index: {
            CreateRelated: '创建相关',
            HasNoValue: '没有价值',
            IsIn: '在',
            Is: '是',
          },
          Cards: {
            Index: {
              SelectA: '选择一个',
              ThisItemWillNotBeDeletedItWillOnlyBeRemovedFromThisField:
                '此项目将不会被删除。 它只会从该字段中删除。',
              YouMustFinishCreatingAndEditingAnyRelated: '您必须完成并编辑任何相关的',
              LoadingItemsFor: '加载项目',
              View: '查看',
              Details: '详细',
              LinkExisting: '连接已存在',
              Field: '字段',
              Remove: '删除',
              Create: '新建',
              Edit: '编辑',
              Cancel: '取消',
              Done: '完毕',
              Before: '前',
              SavingThe: '保存',
              ThereIs1: '有1个',
              ThereAre: '有',
              LinkedToThis: '连接到这个',
            },
            InlineCreate: {
              FailedToCreateItem: '无法创建项目',
              FailedToUpdateItem: '无法更新项目',
              SavedSuccessfully: '保存成功',
              Create: '新建',
              Cancel: '取消',
            },
            InlineEdit: {
              FailedToCreateItem: '无法创建项目',
              FailedToUpdateItem: '无法更新项目',
              SavedSuccessfully: '保存成功',
              Save: '保存',
              Cancel: '取消',
            },
          },
        },
      },
      Select: {
        Views: {
          Index: {
            IsRequired: '是必须的',
            Clear: '清除',
          },
        },
        Index: {
          IsRequired: '是必须的',
          IsNotAPossibleValueFor: '不是可能的值',
        },
      },
      Text: {
        Views: {
          Index: {
            SetFieldAsNull: '将字段设置为null',
            Contains: '包含',
            DoesNotContain: '不含',
            IsExactly: '完全是',
            IsNotExactly: '不完全是',
            StartsWith: '以。。开始',
            DoesNotStartWith: '不以',
            EndsWith: '以。。结束',
            DoesNotEndWith: '不会以',
            IsRequired: '是必须的',
            ThePasswordsDoNotMatch: '密码不匹配',
            MustNotBeEmpty: '不能空的',
            MustBeAtLeast: '必须至少',
            CharactersLong: '字符长度',
            MustBeNoLongerThan: '不得超过',
            Characters: '字符',
            MustMatch: '必须匹配',
          },
        },
        Index: {
          IsRequired: '是必须的',
          MustNotBeEmpty: '不能空的',
          MustBeAtLeast: '必须至少',
          CharactersLong: '字符长度',
          MustBeNoLongerThan: '不得超过',
          Characters: '字符',
          MustMatch: '必须匹配',
        },
      },
      Timestamp: {
        Views: {
          Index: {
            WhenThisItemIsSavedThisFieldWillBeSetToTheCurrentDateAndTime:
              '保存此项目时，此字段将设置为当前日期和时间',
            IsRequired: '是必须的',
            RequiresATimeToBeProvided: '需要提供时间',
            RequiresAValidTimeInTheFormatHHMM: '要求有效时间格式HHMM',
            RequiresADateToBeSelected: '需要选择日期',
          },
        },
      },
      Virtual: {
        Views: {
          Index: {
            CreateViewVirtualFieldValue: '创建查看虚拟字段值',
          },
        },
      },
    },
    NonNullGraphql: {
      AssertReadIsNonNullAllowed: {
        ResolvedIsNullable: {
          TheFieldAt: '字段在',
          SetsGraphqlReadIsNonNullTrueButNotValidationIsRequiredTrueOrDbIsNullableFalse:
            'sets graphql.read.isnonnull：true但未验证。iSrequired：true或db.isnullable：false。',
          SetValidationIsRequiredTrueOrDbIsNullableFalseOrDisableGraphqlReadIsNonNull:
            '设置验证：required：true或db.isnullable：false或disable graphql.read.isnonnull',
        },
        HasReadAccessControl: {
          TheFieldAt: '字段在',
          SetsGraphqlReadIsNonNullTrueAndHasReadAccessControlThisIsNotAllowed:
            '设置GraphQl.Read.isnonnull：true且已读取访问控件，不允许使用。',
          EitherDisableGraphqlReadIsNonNullOrReadAccessControl:
            '禁用GraphQl.Read.isnonnull或读取访问控件。',
        },
      },
      AssertCreateIsNonNullAllowed: {
        TheFieldAt: '字段在',
        SetsGraphqlReadIsNonNullTrueAndHasCreateAccessControlThisIsNotAllowed:
          '设置graphql.create.isnonnull：true并具有创建访问控件，不允许使用。',
        EitherDisableGraphqlReadIsNonNullOrCreateAccessControl:
          '禁用graphql.create.isnonnull或创建访问控件。',
      },
    },
  },
  DefineConst: {
    Dashboard: '仪表板',
    Plural: '',
  },
  Auth: {
    Lib: {
      GetErrorMessage: {
        AuthTokenRedemptionFailed: '身份令牌赎回失败。',
        TheAuthTokenProvidedHasExpired: '提供的身份令牌已过期。',
        AuthTokensAreSingleUseAndTheAuthTokenProvidedHasAlreadyBeenRedeemed:
          'auth令牌是一次用途，所提供的身份令牌已经被兑换。',
      },
    },
    Pages: {
      InitPage: {
        Welcome: '欢迎',
        ThanksForInstalling: '感谢您的安装',
        WhileYouReGettingStartedCheckOutTheDocsAt: "当您入门时，请查看{''}的文档",
        IfYouDLikeToStayUpToDateWithTheExcitingThingsWeHavePlannedJoinOurMailingListJustUsefulAnnouncementsNoSpam:
          '如果您想了解我们计划的激动人心的事情，请加入我们的邮件列表（只是有用的公告，没有垃圾邮件！）',
        SignUpToOurMailingList: '注册我们的邮件列表',
        EmailAddress: '电子邮件地址',
        Continue: '继续',
        TryAgain: '再试一次',
        LoadingPage: '加载页',
        WelcomeTo: '欢迎来到',
        CreateYourFirstUserToGetStarted: '创建您的第一个用户开始',
        GetStarted: '开始',
      },
      SigninPage: {
        LoadingPage: '加载页',
        Sign_In: '登录',
        LogResetLink: '日志重置链接',
        GoBack: '返回',
      },
    },
  },
};

const langFix: PartialDeep<EN_US_Type> = {
  AdminUIComponents: {
    Navigation: {
      SignedInAs: '登录用户',
    },
  },
};

export const Lang = R.mergeDeepRight(fromAILang, langFix);
