terraform {
  required_providers {
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.15.0"
    }
  }
}

provider "azuread" {
  tenant_id = var.tenant_id
}

data "azuread_domains" "app" {
  only_initial = true
}

data "azuread_client_config" "current" {}

resource "azuread_application" "user_app" {
  display_name = "ngdangdat-test-app-00"
  identifier_uris = [
    "urn:amazon:cognito:sp:ap-northeast-1_ZlBstCtXZ"
  ]
  web {
    redirect_uris = ["https://dat-aad-sso.auth.ap-northeast-1.amazoncognito.com/"]
  }
}

resource "azuread_service_principal" "app" {
  application_id = azuread_application.user_app.application_id
  login_url      = var.sso_login_url
  owners         = [data.azuread_client_config.current.object_id]

  feature_tags {
    enterprise            = true
    custom_single_sign_on = true
  }
  # SSO related
  preferred_single_sign_on_mode = "saml"
  saml_single_sign_on {
    relay_state = var.sso_login_url
  }
}
