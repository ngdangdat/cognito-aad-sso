import { Construct } from "constructs";
import { TerraformOutput, TerraformStack } from "cdktf";
import { AzureadProvider } from "../.gen/providers/azuread/provider";
import { Application, ApplicationFeatureTags } from "@cdktf/provider-azuread/lib/application";
import { ServicePrincipal, ServicePrincipalFeatureTags } from "@cdktf/provider-azuread/lib/service-principal";
import { ClaimsMappingPolicy } from "@cdktf/provider-azuread/lib/claims-mapping-policy";
import { ServicePrincipalClaimsMappingPolicyAssignment } from "@cdktf/provider-azuread/lib/service-principal-claims-mapping-policy-assignment";
import { Group } from "@cdktf/provider-azuread/lib/group";
import * as fs from "fs";

export class AzureActiveDirectoryStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new AzureadProvider(this, "AzureAD", {});

    // environment variables
    const stackIdentifier: string = id || `vs-dev-stack`;
    const awsCognitoUserPoolId: string = process.env.AWS_COGNITO_USER_POOL_ID || "";
    const samlIdUri = `urn:amazon:cognito:sp:${awsCognitoUserPoolId}`;
    const samlReplyUrl: string = process.env.SAML_REPLY_URL || ""; // ends with /saml2/idpresponse
    const samlRelayState: string = process.env.SAML_RELAY_STATE || "";
    const samlLogoutUrl: string = process.env.SAML_LOGOUT_URL || "";
    const samlNotificationEmail: string = process.env.SAML_NOTIFY_EMAIL || "";

    const samlClaimsMappingJson: string = fs.readFileSync("./files/samlClaimsMapping.json",{ encoding: "utf-8" });

    const tags: ApplicationFeatureTags = {
      enterprise: true,
    };1
    const app = new Application(this, "vs-azuread-app", {
      displayName: stackIdentifier,
      featureTags: [tags],
      identifierUris: [samlIdUri],
      web: {
        redirectUris: [samlReplyUrl],
        logoutUrl: samlLogoutUrl,
      },
      preventDuplicateNames: true,
      groupMembershipClaims: ["All"],
      owners: [],
    });
    const spFeatureTags: ServicePrincipalFeatureTags = {
      enterprise: true,
      customSingleSignOn: true,
    };
    const servicePrinciple: ServicePrincipal = new ServicePrincipal(this, "AzureADDemoApp", {
      applicationId: app.applicationId,
      featureTags: [spFeatureTags],
      preferredSingleSignOnMode: "saml",
      samlSingleSignOn: {
        relayState: samlRelayState,
      },
      notificationEmailAddresses: [samlNotificationEmail],
    });

    const claimMappingPolicy = new ClaimsMappingPolicy(this, "AzureADDemo_cmp", {
      displayName: `${stackIdentifier}Claims`,
      definition: [samlClaimsMappingJson],
    });

    new ServicePrincipalClaimsMappingPolicyAssignment(this, "AzureADDemo_cmpa", {
      servicePrincipalId: servicePrinciple.id,
      claimsMappingPolicyId: claimMappingPolicy.id,
    });

    const portalUserGroup = new Group(this, "portal_users", {
      displayName: `${stackIdentifier}-users`,
      description: `The users group allowing access to ${stackIdentifier}`,
      securityEnabled: true,
      provisioningOptions: [],
      behaviors: [],
      types: [],
    });

    new TerraformOutput(this, "app_id", {
      value: app.applicationId,
      description: "AAD application ID",
    });

    new TerraformOutput(this, "app_access_users_group", {
      value: portalUserGroup.displayName,
      description: "The Portal users group name",
    });
  }
}
