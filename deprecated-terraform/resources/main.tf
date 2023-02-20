module "user-pool" {
  source = "./modules/user-app"

  tenant_id     = var.azure_ad_tenant_id
  client_id     = var.azure_ad_client_app_id
  client_secret = var.azure_ad_client_app_secret
  sso_login_url = var.azure_ad_sso_login_url
}
