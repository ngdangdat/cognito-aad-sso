terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }

    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.15.0"
    }
  }
}

locals {
  # AWS
  aws_region = "ap-northeast-1"

  # Azure AD
  azure_ad_tenant_id         = "57bcdcef-15e9-45a8-9b6b-62efcb7036ba"
  azure_ad_client_app_id     = "63b9uuflrkp7qulj2f037h33ga"
  azure_ad_client_app_secret = "3chglj8j0cat6c5k1pipkb42k37u3iafoda44i9bru2ga4mofb"
  azure_ad_sso_login_url     = "https://dat-aad-sso.auth.ap-northeast-1.amazoncognito.com"
}

provider "aws" {
  region = local.aws_region
}

module "infrastructure" {
  source = "../../resources"

  azure_ad_tenant_id         = local.azure_ad_tenant_id
  azure_ad_client_app_id     = local.azure_ad_client_app_id
  azure_ad_client_app_secret = local.azure_ad_client_app_secret
  azure_ad_sso_login_url     = local.azure_ad_sso_login_url
}
