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

# Temporary info

```text
https://aad-sso-demo-v3.auth.ap-northeast-1.amazoncognito.com/signin?client_id=7r02dg11fatff95tvan6k46eor&redirect_uri=https://www.example.com/

https://aad-sso-demo-v3.auth.ap-northeast-1.amazoncognito.com/login?client_id=7r02dg11fatff95tvan6k46eor&redirect_uri=https://www.example.com/&response_type=token&scope=aws.cognito.signin.user.admin+email+openid&state=STATE

https://aad-sso-demo-v3.auth.ap-northeast-1.amazoncognito.com/signup?client_id=7r02dg11fatff95tvan6k46eor&redirect_uri=https://www.example.com/&response_type=token&scope=aws.cognito.signin.user.admin+email+openid

scope=&redirect_uri=REDIRECT_URL

https://aad-sso-demo-v3.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?client_id=7r02dg11fatff95tvan6k46eor&response_type=token&scope=email+openid+profile&redirect_uri=https%3A%2F%2Fwww.example.com%2F

https://www.example.com/#access_token=eyJraWQiOiIyNkJKNHVHZjk1VFFrOGpFMkdOb1BzQlBFTmVSUG8rYUpYcGNEYmpPcis0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5ZDkzMzk5Mi05MzU1LTQyMWItYjQ4Yy0zZDBmMDU0NzUwNzAiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1ub3J0aGVhc3QtMV9YTWtST0ZHOE9fQ29nbml0b3hBQUQiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLW5vcnRoZWFzdC0xX1hNa1JPRkc4TyIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjdyMDJkZzExZmF0ZmY5NXR2YW42azQ2ZW9yIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY3Njk5NTY1MSwiZXhwIjoxNjc2OTk5MjUxLCJpYXQiOjE2NzY5OTU2NTEsImp0aSI6IjQyZDM4ODg1LWEzNmYtNGRkZS04YmZhLThhNzFiNjk2ZTExNiIsInVzZXJuYW1lIjoiQ29nbml0b3hBQURfQVFZNi1hSHhyUmNUMk9sa2dnd1JqekhQOVRBWTVQTG5xWjNMV0NqeENibyJ9.dlh-_crpDKKi7m72rj5zsJa40DmE7POwG6X_1KHt2tbVdD_s98bKq5375z24hj1Ur8xJFaBIFNWB4fPTvegALo6PDOh93omzDzaRPuvcyWiBjlNQP2NTehObQey2KPZ1wTqW9WGiIvN7WFT8d7zp0BEM_qyc2ujJ7m1UYzTIGvfepJ37a3pKUsFHKySZeHxw-Vbvpd5BgEf_sXWG5k63EIGDw5PWgdoFlVnkkoBwEGpxFe6YEyey3tBMTF5IpzkFUNmo6zRZl5jSKGeiDoe0919ejjz_a6PUXORyl1OsmjTkC9xeoqGWZRlHOKpqTeFdj0dyrVyAu4PpzSiG9sIbjw&id_token=eyJraWQiOiJpWE5JYWl2RStlYWVWU0NXRHpqMTlNT0xPSnpIREMwYlRTYzVzZ01CMWRnPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiU2tyM0x0bHFGUkY2bm5US0x4YlFmZyIsInN1YiI6IjlkOTMzOTkyLTkzNTUtNDIxYi1iNDhjLTNkMGYwNTQ3NTA3MCIsImNvZ25pdG86Z3JvdXBzIjpbImFwLW5vcnRoZWFzdC0xX1hNa1JPRkc4T19Db2duaXRveEFBRCJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMV9YTWtST0ZHOE8iLCJjb2duaXRvOnVzZXJuYW1lIjoiQ29nbml0b3hBQURfQVFZNi1hSHhyUmNUMk9sa2dnd1JqekhQOVRBWTVQTG5xWjNMV0NqeENibyIsIm5vbmNlIjoiTU1PTVVHYUJHNi03THc4b1Y5Q2gxdXU4c1VRY0dZTnpuTnNtMTVEaHJjVGI1S19EYWswVHZHcE4tQ2xGcUFIWEp3MkVlSHVZUWJBdTF1SFZHaXlvRkR2Yy1aSmpDY2xieElGYUIzdEdwTVE0OUlQdEJDeG5BSnJlRG5hYlg2bHBhdXRLT2tQNTVQMGs2RjdlU2R2VEFYY0hhdWVSVENqOGszZTQ4Q2t0S1pzIiwiY3VzdG9tOmdyb3VwcyI6Ijg3NDkwYmM1LTgwMjktNGNhNS04MzYwLTAyMWRhZTIwNWU0OSIsImF1ZCI6IjdyMDJkZzExZmF0ZmY5NXR2YW42azQ2ZW9yIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiQVFZNi1hSHhyUmNUMk9sa2dnd1JqekhQOVRBWTVQTG5xWjNMV0NqeENibyIsInByb3ZpZGVyTmFtZSI6IkNvZ25pdG94QUFEIiwicHJvdmlkZXJUeXBlIjoiU0FNTCIsImlzc3VlciI6Imh0dHBzOlwvXC9zdHMud2luZG93cy5uZXRcLzU3YmNkY2VmLTE1ZTktNDVhOC05YjZiLTYyZWZjYjcwMzZiYVwvIiwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2NzY5OTU2NTA4MzMifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjc2OTk1NjUxLCJleHAiOjE2NzY5OTkyNTEsImlhdCI6MTY3Njk5NTY1MSwianRpIjoiNzk3YzQ3NDUtYzljMi00MDNkLWE5ZmMtOTI4YTYxYjU4NjhkIiwiZW1haWwiOiJuZ2RhbmdkYXQwOUBnbWFpbC5jb20ifQ.bvEsu_AtIAliLlz57GyN-Q0rbwgXeMhyJtyYX7gBWpyBqSCOGoZx4nM5eSJLMVlRp6ZVMCEq_BcD0PM6DWUunAfeLU5kyGqdBFj8xGq0SxnuFRmgEUroZxatd566qLkVcXwbApdjr0WCNPmOGZVXM-X5HgP1XAnvpe5yl9CaViH0UviY7YmmPWPzuLO9To9BISKmNWxq8dV1hkYmbKRffHr410Z0WHjbM8-xIFIM8_Cd4pSOIU7gqV5DUljOVH9RcsHyBsZ8X6riUNGT2puwjY-RX4pdhc8CCbL6CV-S_htzsqZ8t7iAvxlzDwcMHBPuaMw4TeAcC9SRQDIQD4ta2w&token_type=Bearer&expires_in=3600

https://www.example.com/#access_token=eyJraWQiOiIyNkJKNHVHZjk1VFFrOGpFMkdOb1BzQlBFTmVSUG8rYUpYcGNEYmpPcis0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5ZDkzMzk5Mi05MzU1LTQyMWItYjQ4Yy0zZDBmMDU0NzUwNzAiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1ub3J0aGVhc3QtMV9YTWtST0ZHOE9fQ29nbml0b3hBQUQiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLW5vcnRoZWFzdC0xX1hNa1JPRkc4TyIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjdyMDJkZzExZmF0ZmY5NXR2YW42azQ2ZW9yIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY3NzAzNTE2NiwiZXhwIjoxNjc3MDM4NzY2LCJpYXQiOjE2NzcwMzUxNjYsImp0aSI6IjQ2NWJhZjZhLTk1Y2MtNDYzYy1hZWZlLTZjZGM2YjZjYTE4NiIsInVzZXJuYW1lIjoiQ29nbml0b3hBQURfQVFZNi1hSHhyUmNUMk9sa2dnd1JqekhQOVRBWTVQTG5xWjNMV0NqeENibyJ9.KhtTSbUGiupLmHeGiBhV5FpouQSYRkJP7V5G-Zqk4dYrqSH9SE9HgG68olLMvlPHi16XWtQF2rY43JSK49B-MLjy-7v-GPaDMEG0ee9xtzEbBnLdv2IQOzGzqNdJwzjHvyDL9DgqqL5wpl1j6sT7M6qGpSJuZOSrEZMMaCto6IX_NCDE1pm0uVlhUMauCRGDz-5T0_Gxk3aaQMaKndyDSSI3IYlQEOpqS1NdAGrjscnfvZmXJHF2RnvY1yFsNxqO9oAMHF30Ib5NjaPVADOdFmqGPlagif2tqXc_MGeD4SivmS9IwUVqHXphdCUWew8pmEuFaKiWfqfzkWp7NF7twA&id_token=eyJraWQiOiJpWE5JYWl2RStlYWVWU0NXRHpqMTlNT0xPSnpIREMwYlRTYzVzZ01CMWRnPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiaWxHcVEwSFdQTXNuczE1eTFNLWJrdyIsInN1YiI6IjlkOTMzOTkyLTkzNTUtNDIxYi1iNDhjLTNkMGYwNTQ3NTA3MCIsImNvZ25pdG86Z3JvdXBzIjpbImFwLW5vcnRoZWFzdC0xX1hNa1JPRkc4T19Db2duaXRveEFBRCJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMV9YTWtST0ZHOE8iLCJjb2duaXRvOnVzZXJuYW1lIjoiQ29nbml0b3hBQURfQVFZNi1hSHhyUmNUMk9sa2dnd1JqekhQOVRBWTVQTG5xWjNMV0NqeENibyIsIm5vbmNlIjoiOE1Penhna2Fxc0lIY0k3NnZ2eTM2Z01CV0ZwUUZ2bzU2TDI4WEpVc1JWTVlaZlBsVUtzWEhIVC1HTWlSN0UxU3VVS3p2anFubGpDVEJWRHIzVHB4ZXZzcHJ2N3RiSllQMGF5Sl9hcDhlbDF0dTNEanBpRTRUNkxxOFhOX0dBWEtjU3BDT3BGM1VZTVl1eHgtcmo1YmdOa0cta0oya2VIWjBKQVh4VDRyZ0FFIiwiY3VzdG9tOmdyb3VwcyI6Ijg3NDkwYmM1LTgwMjktNGNhNS04MzYwLTAyMWRhZTIwNWU0OSIsImF1ZCI6IjdyMDJkZzExZmF0ZmY5NXR2YW42azQ2ZW9yIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiQVFZNi1hSHhyUmNUMk9sa2dnd1JqekhQOVRBWTVQTG5xWjNMV0NqeENibyIsInByb3ZpZGVyTmFtZSI6IkNvZ25pdG94QUFEIiwicHJvdmlkZXJUeXBlIjoiU0FNTCIsImlzc3VlciI6Imh0dHBzOlwvXC9zdHMud2luZG93cy5uZXRcLzU3YmNkY2VmLTE1ZTktNDVhOC05YjZiLTYyZWZjYjcwMzZiYVwvIiwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2NzY5OTU2NTA4MzMifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjc3MDM1MTY2LCJleHAiOjE2NzcwMzg3NjYsImlhdCI6MTY3NzAzNTE2NiwianRpIjoiNDI3NGVkMDMtNDc2ZC00MjlmLWJhZDYtYTcyNzcyZDg0NjgyIiwiZW1haWwiOiJuZ2RhbmdkYXQwOUBnbWFpbC5jb20ifQ.sQjJ5VEHjLSh_K82cqP9wvPiuNtha3fLV2QcDPTYaZEo5CsVJLxcIu4eseZx54_Lo2qpqq9LqunomtYUMBLfBWHZ49XTaJvJqeQXWxIVUM17-pXaT38eUPuMx6uKUu_q4A7moeWJv6O9u13GEF8DJKLzLjQQPACrKjEIw7M-X9RSaHPXf3tLoziBVRET8Jq4hl1wDG6jj5jJ_baQC86XaEuSwzwS1ftGUU0ZiaA6gBe2BAhsSREGY-PV4bNI_DndLob8I7LPi9Q8NuE68hbvqje6wY-K3-rSk4IY_dPF5WzmpmE4u4UuXlirtjC3orlf40cHYdpTK3zNO4y5PixCJA&token_type=Bearer&expires_in=3600

https://app.vs.localhost/#access_token=eyJraWQiOiIyNkJKNHVHZjk1VFFrOGpFMkdOb1BzQlBFTmVSUG8rYUpYcGNEYmpPcis0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZjFjYjI2OC01YmZiLTRjODYtOWI5Yy05OTY2MDZhZTM1ZTMiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1ub3J0aGVhc3QtMV9YTWtST0ZHOE9fQ29nbml0b3hBQUQiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLW5vcnRoZWFzdC0xX1hNa1JPRkc4TyIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjdyMDJkZzExZmF0ZmY5NXR2YW42azQ2ZW9yIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY3NzEyNzA5NiwiZXhwIjoxNjc3MTMwNjk2LCJpYXQiOjE2NzcxMjcwOTYsImp0aSI6IjFiZDQ5MTFjLWY5ZmYtNGNmZC05NmJmLTZhZWRmNDE3ODMxMiIsInVzZXJuYW1lIjoiQ29nbml0b3hBQURfQVFZNi1hSHhyUmNUMk9sa2dnd1JqekhQOVRBWTVQTG5xWjNMV0NqeENibyJ9.Nz6vm6hUxqS0oEwJmoURc0GMeh50_PRYzA5PKZBSnEezuDL-b69SPXj59o3BfAd-Jrx_6zB4Ve8AgH6oGzKfh2X0QuW7DiUDFWQmrlLOnbcwKTytQjkQyJM-j-79pyqjA3d3aCtIwHIjVl8qVUaJ6rM7Iulho3UsgZXWx3QB9jSaJMaVuJdoDOtIlGh08XTeMUjTeDogUlYTo4o_eh0gog8dJgqbs6qUpCyqlLhvBXlrGaiejn06b1_-q3VIGLwyJxT1iKwU_8w8fzkiWQvnca7z0f3DVsTb_gIGww763Zic1IDmBFbbpya4Yu2OooscJslHrFhsEOzUf9KcMAqbig&id_token=eyJraWQiOiJpWE5JYWl2RStlYWVWU0NXRHpqMTlNT0xPSnpIREMwYlRTYzVzZ01CMWRnPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoib1RraW9STnktYXptSTFnQ25aMTZOQSIsInN1YiI6IjhmMWNiMjY4LTViZmItNGM4Ni05YjljLTk5NjYwNmFlMzVlMyIsImNvZ25pdG86Z3JvdXBzIjpbImFwLW5vcnRoZWFzdC0xX1hNa1JPRkc4T19Db2duaXRveEFBRCJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMV9YTWtST0ZHOE8iLCJjb2duaXRvOnVzZXJuYW1lIjoiQ29nbml0b3hBQURfQVFZNi1hSHhyUmNUMk9sa2dnd1JqekhQOVRBWTVQTG5xWjNMV0NqeENibyIsIm5vbmNlIjoiMF9Zcl9MRHpTS1QyaGdIZTh6VV9GYVVTQk9mVHdwUkZXMDYzVlNqelo5M2J6dHFkSEtGMjVoX0NZQW9tWDNDLXR6endTNGxHUkFyS3QzOUdQU2dtN1I2c0hZcFFRenB3aFE0WlUtOF9ORHJzcGJCYmpaOXFRNlh6VEJQdXg3Y2J0S09ScFpNbS1xUm13NGwzbFZteENsdnhHY1Ayc092ZW5JX000YWYxU0hVIiwiY3VzdG9tOmdyb3VwcyI6Ijg3NDkwYmM1LTgwMjktNGNhNS04MzYwLTAyMWRhZTIwNWU0OSIsImF1ZCI6IjdyMDJkZzExZmF0ZmY5NXR2YW42azQ2ZW9yIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiQVFZNi1hSHhyUmNUMk9sa2dnd1JqekhQOVRBWTVQTG5xWjNMV0NqeENibyIsInByb3ZpZGVyTmFtZSI6IkNvZ25pdG94QUFEIiwicHJvdmlkZXJUeXBlIjoiU0FNTCIsImlzc3VlciI6Imh0dHBzOlwvXC9zdHMud2luZG93cy5uZXRcLzU3YmNkY2VmLTE1ZTktNDVhOC05YjZiLTYyZWZjYjcwMzZiYVwvIiwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE2NzcwODE4NTAyMjUifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjc3MTI3MDk2LCJleHAiOjE2NzcxMzA2OTYsImlhdCI6MTY3NzEyNzA5NiwianRpIjoiODBhOThmOWQtZDFlNy00MGIwLWJiYzItYWNiNDRjNGViYjliIiwiZW1haWwiOiJuZ2RhbmdkYXQwOUBnbWFpbC5jb20ifQ.Y6e2o2qElxIxUzrxXUlPXamWuAppcS9ulzKccAZzEbvjRJxhRMFNdb_1gXyV6yXHIdf9xQTkuyWry4jpq4SRtdgCx4ZbIMWbVa3xO5Hk-rPW33LVgdUKEbQXyzyu9rWqMcFSSMv8duW1JhDJXkljHK7ZpYaBSmllQPT7BNULR2k8I7bcqvnSKMNP3DQCmxBGRIIespVVEoJQOt1dn0JWNgpb5sKjZwdQFv1I1kGqlHcE4G3Kuy4RLUo0HE0Nt71qRUHHkCGhIjesvdvsnLk1-AuYr305aiwVVVZzXrq_wjQaFKuzCkjsB4sqz5evnV37hH8y80Np9BwQXLWNHPF6dQ&token_type=Bearer&expires_in=3600

https://aad-sso-demo-v3.auth.ap-northeast-1.amazoncognito.com//.well-known/jwks.json

https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_XMkROFG8O/.well-known/jwks.json


https://aad-sso-demo-v3.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?client_id=7r02dg11fatff95tvan6k46eor&response_type=token&scope=email+openid+profile&redirect_uri=http://app.vs.localhost/
```


```json
{"keys":[{"alg":"RS256","e":"AQAB","kid":"iXNIaivE+eaeVSCWDzj19MOLOJzHDC0bTSc5sgMB1dg=","kty":"RSA","n":"2bQvzCjMvaNLTbEzppas7UAh9TzK6bsrzriCkgVrWdmjgDGxkpRbnBr1busNP0blcaArnbCf9rGEtcyamKEqxQdwyLEvm_bO_JrZEUTd3IYM6_Hj8WubvvB0aNeZLn4X3TjBw58d-d0AABzT9wxgadOb0QwHhVp-05n270LGewYFcUcIeTJmp8zrZE5c8CtOT4U5tMSdXrPfhPCnk4R0RAQNR6nTFEjJPEKuHJQb2RrXeLWsQtESaWotP_UkhzXQ9sklQXKoNuDIm0bACq3gf7CXq2LygUcvR6haYjcL_FtObx5ss187Tzzl8FcCXr4belSmCJO9Heti-9rZPzfK8Q","use":"sig"},{"alg":"RS256","e":"AQAB","kid":"26BJ4uGf95TQk8jE2GNoPsBPENeRPo+aJXpcDbjOr+4=","kty":"RSA","n":"t5z57aBT-Cs5Kp1C5-R5OMOZ_i9tZwVmnGAmwzhZ0PeyT8yLe88A-sx68fIGLQg3gbCi5qNH8a772GuwucNqkl1VsnmZXh19Oa9x_c2EoJU4zJqxwLEQU9F_gZTqaY3C6dvzop9W1zIFmlmPeGVjoSFOx5OdFeRZVGPG2BAwHmLkzmEPMbo-7d96LvqYMym-iuoDLfUBM2HrxKNHtdl7zHqDs7hhEsjiIJ1DZf4pmKV4gHzpnpAzmeORC0VuddT_Jv_xpbrbL2TII9i5827kQHn4_86LeA9jBE286_wx20vVu1p1hlKdC9FJ_a4BL-uZ1Y_QqyMYui_Q1iwsVZmu3Q","use":"sig"}]}
```