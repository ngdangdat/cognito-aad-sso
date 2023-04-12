# Single Sign On (SSO) using AWS Cognito and Azure Active Directory (AAD) using Terraform

- Original guide: https://medium.com/@zippicoder/setup-aws-cognito-user-pool-with-an-azure-ad-identity-provider-to-perform-single-sign-on-sso-7ff5aa36fc2a

## Diagram flow

![Diagram v2](./docs/aad_cognito_v2.png)

## Setup
- Install Azure CLI (`az`)
- Install AWS CLI (`aws`)

## Terraform (Deprecated)

```tf
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  - destroy

Terraform will perform the following actions:

  # module.infrastructure.module.user-pool.azuread_application.user_app will be destroyed
  - resource "azuread_application" "user_app" {
      - app_role_ids                   = {} -> null
      - application_id                 = "a63be173-048d-4668-a621-06489babab94" -> null
      - device_only_auth_enabled       = false -> null
      - disabled_by_microsoft          = "<nil>" -> null
      - display_name                   = "ngdangdat-test-app-00" -> null
      - fallback_public_client_enabled = false -> null
      - group_membership_claims        = [] -> null
      - id                             = "34ed160a-abfe-4db9-8060-8d82987b770b" -> null
      - identifier_uris                = [
          - "urn:amazon:cognito:sp:ap-northeast-1_ZlBstCtXZ",
        ] -> null
      - oauth2_permission_scope_ids    = {} -> null
      - oauth2_post_response_required  = false -> null
      - object_id                      = "34ed160a-abfe-4db9-8060-8d82987b770b" -> null
      - owners                         = [] -> null
      - prevent_duplicate_names        = false -> null
      - publisher_domain               = "ngdangdat09gmail.onmicrosoft.com" -> null
      - sign_in_audience               = "AzureADMyOrg" -> null
      - tags                           = [] -> null

      - api {
          - known_client_applications      = [] -> null
          - mapped_claims_enabled          = false -> null
          - requested_access_token_version = 1 -> null
        }

      - feature_tags {
          - custom_single_sign_on = false -> null
          - enterprise            = false -> null
          - gallery               = false -> null
          - hide                  = false -> null
        }

      - optional_claims {
        }

      - public_client {
          - redirect_uris = [] -> null
        }

      - single_page_application {
          - redirect_uris = [] -> null
        }

      - web {
          - redirect_uris = [
              - "https://dat-aad-sso.auth.ap-northeast-1.amazoncognito.com/",
            ] -> null

          - implicit_grant {
              - access_token_issuance_enabled = false -> null
              - id_token_issuance_enabled     = false -> null
            }
        }
    }

  # module.infrastructure.module.user-pool.azuread_service_principal.app will be destroyed
  - resource "azuread_service_principal" "app" {
      - account_enabled               = true -> null
      - alternative_names             = [] -> null
      - app_role_assignment_required  = false -> null
      - app_role_ids                  = {} -> null
      - app_roles                     = [] -> null
      - application_id                = "a63be173-048d-4668-a621-06489babab94" -> null
      - application_tenant_id         = "57bcdcef-15e9-45a8-9b6b-62efcb7036ba" -> null
      - display_name                  = "ngdangdat-test-app-00" -> null
      - id                            = "d66f9fb8-f2a1-4e4b-bc55-3d6f6fac3a44" -> null
      - login_url                     = "https://dat-aad-sso.auth.ap-northeast-1.amazoncognito.com" -> null
      - notification_email_addresses  = [] -> null
      - oauth2_permission_scope_ids   = {} -> null
      - oauth2_permission_scopes      = [] -> null
      - object_id                     = "d66f9fb8-f2a1-4e4b-bc55-3d6f6fac3a44" -> null
      - owners                        = [
          - "12601502-7c84-463c-bb5d-90689d9bc12b",
        ] -> null
      - preferred_single_sign_on_mode = "saml" -> null
      - redirect_uris                 = [
          - "https://dat-aad-sso.auth.ap-northeast-1.amazoncognito.com/",
        ] -> null
      - service_principal_names       = [
          - "urn:amazon:cognito:sp:ap-northeast-1_ZlBstCtXZ",
        ] -> null
      - sign_in_audience              = "AzureADMyOrg" -> null
      - tags                          = [
          - "WindowsAzureActiveDirectoryCustomSingleSignOnApplication",
          - "WindowsAzureActiveDirectoryIntegratedApp",
        ] -> null
      - type                          = "Application" -> null

      - feature_tags {
          - custom_single_sign_on = true -> null
          - enterprise            = true -> null
          - gallery               = false -> null
          - hide                  = false -> null
        }

      - features {
          - custom_single_sign_on_app = true -> null
          - enterprise_application    = true -> null
          - gallery_application       = false -> null
          - visible_to_users          = true -> null
        }

      - saml_single_sign_on {
          - relay_state = "https://dat-aad-sso.auth.ap-northeast-1.amazoncognito.com" -> null
        }
    }
```

### Providers
- Azure Active Directory

## CDK

### Providers
- AWS
- Azure Active Directory (Azure AD)

==============

- Next step
  - Guideline on how to setup AzureAD
  - One-place logout (token revocation) case
  - Authorization (permission mapping)
    - group
  - Edge cases
    - New user, no role
    ...
- Custom domain: not high priority
- Other vendors
- SAML

### AZ - Commands


Filter

```sh
az ad app list --filter "appid eq '19728037-dbe8-4b79-b8c1-faad917fcaec'"

[
  {
    "addIns": [],
    "api": {
      "acceptMappedClaims": false,
      "knownClientApplications": [],
      "oauth2PermissionScopes": [],
      "preAuthorizedApplications": [],
      "requestedAccessTokenVersion": 1
    },
    "appId": "19728037-dbe8-4b79-b8c1-faad917fcaec",
    "appRoles": [],
    "applicationTemplateId": null,
    "certification": null,
    "createdDateTime": "2023-03-15T07:18:36Z",
    "defaultRedirectUri": null,
    "deletedDateTime": null,
    "description": null,
    "disabledByMicrosoftStatus": null,
    "displayName": "VirtualStore AzureAD_demo_V4",
    "groupMembershipClaims": "SecurityGroup",
    "id": "186bf441-dbcd-4e57-82f6-d3eff166b484",
    "identifierUris": [
      "urn:amazon:cognito:sp:ap-northeast-1_gVDEq7Idi"
    ],
    "info": {
      "logoUrl": null,
      "marketingUrl": null,
      "privacyStatementUrl": null,
      "supportUrl": null,
      "termsOfServiceUrl": null
    },
    "isDeviceOnlyAuthSupported": false,
    "isFallbackPublicClient": false,
    "keyCredentials": [],
    "notes": null,
    "optionalClaims": {
      "accessToken": [],
      "idToken": [],
      "saml2Token": []
    },
    "parentalControlSettings": {
      "countriesBlockedForMinors": [],
      "legalAgeGroupRule": "Allow"
    },
    "passwordCredentials": [],
    "publicClient": {
      "redirectUris": []
    },
    "publisherDomain": "resola202008.onmicrosoft.com",
    "requestSignatureVerification": null,
    "requiredResourceAccess": [],
    "samlMetadataUrl": null,
    "serviceManagementReference": null,
    "servicePrincipalLockConfiguration": null,
    "signInAudience": "AzureADMyOrg",
    "spa": {
      "redirectUris": []
    },
    "tags": [
      "WindowsAzureActiveDirectoryIntegratedApp"
    ],
    "tokenEncryptionKeyId": null,
    "verifiedPublisher": {
      "addedDateTime": null,
      "displayName": null,
      "verifiedPublisherId": null
    },
    "web": {
      "homePageUrl": null,
      "implicitGrantSettings": {
        "enableAccessTokenIssuance": false,
        "enableIdTokenIssuance": false
      },
      "logoutUrl": "http://app.vs.localhost/",
      "redirectUriSettings": [
        {
          "index": null,
          "uri": "https://aad-sso-demo-v4.auth.ap-northeast-1.amazoncognito.com/"
        }
      ],
      "redirectUris": [
        "https://aad-sso-demo-v4.auth.ap-northeast-1.amazoncognito.com/"
      ]
    }
  }
]
```

```sh
export APP_ID="19728037-dbe8-4b79-b8c1-faad917fcaec"

az ad app update --id ${APP_ID} --set groupMembershipClaims=All
```
