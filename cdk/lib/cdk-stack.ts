import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as fs from 'fs';
import { UserPoolProps, UserPoolClientOptions } from 'aws-cdk-lib/aws-cognito/lib';


export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const userPoolProperties: UserPoolProps = {
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      signInAliases: {
        email: true,
      },
      
    };

    const userPool = new cognito.UserPool(this, 'dat-aad-user-pool-00', userPoolProperties);
    userPool.addDomain('dat-aad-cognito-domain', {
      cognitoDomain: {
        domainPrefix: 'dat-aad-sso',
      },
    });
    const customSamlProvider = new cognito.CfnUserPoolIdentityProvider(this, 'dat-aad-identity-provider-00', {
      userPoolId: userPool.userPoolId,
      providerName: 'dat-aad-idp-00',
      providerType: 'SAML',
      providerDetails: {
        MetadataFile: fs.readFileSync('./ngdangdat-test-app-00.xml').toString(),
      },
      attributeMapping: {
        email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
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
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: [
          'https://ngdangdat.info/'
        ]
      }
    };
    userPool.addClient('aad-client', clientProps);
  }
}
