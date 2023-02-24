import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as fs from 'fs';
import { UserPoolProps, UserPoolClientOptions } from 'aws-cdk-lib/aws-cognito/lib';
import * as dotenv from "dotenv";

dotenv.config();


export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    // environment variables
    const awsRegion: string = process.env.AWS_REGION || "ap-northeast-1";
    const awsStackIdentifier: string = process.env.AWS_STACK_ID || `DEFAULT_COGNITO_STACK_ID`;
    const cognitoAuthUrl: string = process.env.COGNITO_AUTH_URL || `https://www.example.com/`;
    const cognitoAadIdpDisplayName: string = process.env.COGNITO_IDP_DISPLAY_NAME || 'MyAAD';
    const aadSamlFederationMetadataXml: string = "./files/saml/azure_ad_demo_saml.xml";
    const cognitoCallbackUrl: string = process.env.COGNITO_CALLBACK_URL || "";
    const cognitoLogoutUrl: string = process.env.COGNITO_LOGOUT_URL || "";
    const cognitoAuthDomainPrefix: string = process.env.COGNITO_AUTH_DOMAIN_PREFIX || "cognito-sso-aad";

    super(scope, id, props);
    const userPoolProperties: UserPoolProps = {
      userPoolName: `${awsStackIdentifier}AadUserPool`,
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      signInAliases: { email: true, },
      autoVerify: { email: true },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      customAttributes: {
        groups: new cognito.StringAttribute({ minLen: 1, maxLen: 1000, mutable: true }),
      }
    };

    const userPool = new cognito.UserPool(this, `${awsStackIdentifier}UserPool`, userPoolProperties);
    userPool.addDomain(`${awsStackIdentifier}CognitoDomain`, {
      cognitoDomain: {
        domainPrefix: cognitoAuthDomainPrefix,
      },
    });
    let userPoolClient: any;
    const enableSamlIdP: boolean = fs.existsSync(aadSamlFederationMetadataXml);
    if (enableSamlIdP) {
      const customSamlProvider = new cognito.CfnUserPoolIdentityProvider(this, `${awsStackIdentifier}IdPV1`, {
        userPoolId: userPool.userPoolId,
        providerName: cognitoAadIdpDisplayName,
        providerType: "SAML",
        providerDetails: {
          MetadataFile: fs.readFileSync(aadSamlFederationMetadataXml).toString(),
        },
        attributeMapping: {
          'email': 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
          'custom:groups': 'http://schemas.microsoft.com/ws/2008/06/identity/claims/groups',
        },
      });
      const clientProps: UserPoolClientOptions = {
        userPoolClientName: 'aad-client',
        generateSecret: true,
        supportedIdentityProviders: [
          cognito.UserPoolClientIdentityProvider.custom(customSamlProvider.providerName),
        ],
        oAuth: {
          flows: {
            implicitCodeGrant: true,
          },
          scopes: [
            cognito.OAuthScope.OPENID,
            cognito.OAuthScope.EMAIL,
            cognito.OAuthScope.PROFILE,
          ],
          callbackUrls: [cognitoCallbackUrl],
          logoutUrls: [cognitoLogoutUrl]
        }
      };
      userPoolClient = userPool.addClient('aad-client', clientProps);
      userPoolClient.node.addDependency(customSamlProvider);
    }
  }
}
