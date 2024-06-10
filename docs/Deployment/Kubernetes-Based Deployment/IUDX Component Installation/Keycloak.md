---
sidebar_position: 7
---
<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/keycloak-arch.png)
</div></div>

- Keycloak is used as an Identity manager.
- Deploys a clustered architecture having 2 instances with horizontal pod autoscaling.
- Will be deployed using a bitnami helm chart.


### Prerequisites

Generate keycloak-db password in postgresql installation: `../postgresql/secrets/postgres-keycloak-password`

### Installation

1. Navigate to the below directory :

    ```
    cd iudx-deployment/K8s-deployment/Charts/keycloak
    ```

2. Create an empty directory named “secrets” using below command:

    ```
    mkdir secrets
    ```

3. Generate required secrets using the create-secrets script:
    ```
    ./create-secrets.sh
    ```
4. Define Appropriate values of resources in `resource-values.yaml` as shown in the sample resource-values file for `aws` and `azure`.
    
    - CPU requests and limits 
    - RAM requests and limits
    - Instance-type for nodeSelector
    - keycloak-domain-name

5. copy the example resource values YAML file to resource-values.yaml.
    
    ```
    #For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    #For AWS
    cp example-aws-resource-values.yaml resource-values.yaml

    ```

6. To install Keycloak on your Kubernetes cluster, follow these steps:

   Execute the following command to run the install script:

   ```
   ./install.sh
   ```
    1. Create namespace keycloak in K8s.
    2. Create corresponding K8s secrets in K8s.
    3. Deploys the helm chart with the release name ‘keycloak’.

- Keycloak UI can be accessed from https://< keycloak-domain-name >/auth
- To check helm release info: ‘helm list -n keycloak
- To check if the keycloak pods are deployed and running: ‘kubectl get pods -n keycloak’
- For more information on installation instructions, refer here.

### Manual Configure realms and users from UI

**Create Realm**

1. Once installed, you will need to create a new realm with name ‘iudx’ . You may also see the Create Realm for realm creation.

2. We advise you to not reuse the master realm here.

**Login settings**

1. In the admin console page, with the realm set to the one you just created ( iudx ), you will need to add the login settings. See **[here](https://www.keycloak.org/docs/22.0.1/server_admin/#login-page-settings)** for the different settings that can be enabled. The settings that need to be as follows:

   - User registration: ON
   - Email as username: ON
   - Edit username: OFF
   - Forgot password: ON (see **[SMTP Configuration](https://github.com/datakaveri/iudx-aaa-server/issues/224#SMTP-Configuration)**)
   - Verify email: ON (see **[SMTP Configuration](https://github.com/datakaveri/iudx-aaa-server/issues/224#SMTP-Configuration)**)
   - Login with email: ON

**SMTP Configuration**

For Forgot password and Verify email to work, an SMTP connection needs to be configured. This is to allow Keycloak to send emails to the user containing a reset password link or a verification link respectively.

See **[Email Settings](https://www.keycloak.org/docs/22.0.1/server_admin/#_email)** to configure SMTP for the realm you created.

**Email services that can be used**

1. **[Azure email communication service](https://learn.microsoft.com/en-us/azure/communication-services/concepts/email/email-overview)**
    1. **[Quickstart - Create and manage Email Communication Service resource in Azure Communication Service](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/create-email-communication-resource)**
    2. **[Email domains and sender authentication for Azure Communication Services](https://learn.microsoft.com/en-us/azure/communication-services/concepts/email/email-domain-and-sender-authentication)**
    3. **[Quickstart: How to add custom verified domains to Email Communication Service](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/add-custom-verified-domains)**
2. **[Gmail service](https://support.cloudways.com/configure-gmail-smtp/)** (currently Configured through this way)
3. **[AWS SES service](https://docs.aws.amazon.com/general/latest/gr/ses.html)**
    1. **[Setting up of AWS SES SMTP](https://adamtheautomator.com/aws-email-service/)**


**Adding Roles**

You will now need to add roles to the realm. Refer to **[Realm Roles](https://www.keycloak.org/docs/22.0.1/server_admin/#realm-roles)** on how to do this.

The roles to be added are:
- consumer
- delegate
- provider
- admin
- trustee

**Adding Clients**

Add clients to the realm. These clients are used by the AAA server to connect to Keycloak and perform certain tasks. Refer to **[OIDC Clients](https://www.keycloak.org/docs/14.0/server_admin/#oidc-clients)** to learn how to add new clients and explore different options present in the client settings.

**Adding AAA keycloak admin  client**

Create a new client with the client type as OpenID Connect

```
Client ID : aaa-keycloak-admin-client 
Name : aaa-keycloak-admin-client
Description : aaa keycloak admin client
Always display in UI - OFF

```

Capability Configuration

    1. Client Authentication:
        - Enable to ON.

    2. Authorization - OFF.

    3. Authentication Flow:
        - Standard Flow Enabled set to OFF
        - Direct Access Grants Enabled set to OFF
        - Service Accounts roles Enabled set to ON (this only appears if Access Type is confidential)

    4. Login Settings:
        - Root URL - empty
        - Home URL - empty.

    5. Logout Settings:
        - Front Channel Logout - OFF.
        - Backchannel Logout Session - ON.

Save the settings after this. Once saved, a new tab called Credentials will appear, containing the client secret. The client ID and cosDomain of the AAA server should be the same. The client ID and Client Secret of cos admin is required by onboarding server configuration.  See **[Client Credentials](https://www.keycloak.org/docs/22.0.1/server_admin/#_client-credentials)** for more information.

The configuration for the cos/dx admin client is complete.

**Adding Cos/dx Admin User**

To add a Cos/dx **admin user, follow these steps:

1. Create a Cos Admin User Manually:
   - Log in as a Keycloak admin user for that realm.
   - Go to the "Users" tab.
   - Use the following convention for the username and email: `admin.<cos/dx-url>@datakaveri.org`
   - Set the first name to `admin` and the last name to `<cos/dx-url>`.
   - Enable email verification manually.

2. Set Password:
   - Once the user is created, go to that user’s "Credentials" tab.
   - Set a password with a 20-character random alpha-numeric password.
   - Disable (Turn it OFF) "Temporary Password".

### Post Configuration

Once Keycloak is configured, the Keycloak host, port, client IDs and client secrets need to be added to the config of the AAA server. Please refer to this **[example config](https://github.com/datakaveri/iudx-aaa-server/blob/4.5.0/configs/config-example.json)** for more information. In the example config,

- Keycloak host, port, client IDs, and client secrets. 
- The example config should include:
    - `keycloakAdminClient` corresponding to the Admin client.
    - Cos/DX admin client credentials used in onboarding server.
    - Cos/DX admin user used for setting up AAA trustee user, creating Cos/dx item, and approving resource server admins.


<details>
<summary><div class="style">Testing</div></summary>

To verify the reverse proxy or load balancer configuration for Keycloak, follow these steps:

1. **Verify Endpoints Configuration:**
   - Open the path `/auth/realms/master/.well-known/openid-configuration` through the reverse proxy.
   - This should display a JSON document listing several endpoints for Keycloak.
   - Ensure that the endpoints start with the domain address (scheme, domain, and port) of your reverse proxy or load balancer.
   - This ensures that Keycloak is using the correct endpoint.

2. **Verify Source IP Address:**
   - To check if Keycloak sees the correct source IP address for requests, attempt to login to the admin console with an invalid username and/or password.
   - This should trigger a warning in the server log similar to the following:
     
     ```
     08:14:21,287 WARN  XNIO-1 task-45 [org.keycloak.events] type=LOGIN_ERROR, realmId=master, 
     clientId=security-admin-console, userId=8f20d7ba-4974-4811-a695-242c8fbd1bf8, ipAddress=X.X.X.X,
     error=invalid_user_credentials, auth_method=openid-connect, auth_type=code, redirect_uri=http://localhost:8080/auth/
     admin/master/console/?redirect_fragment=%2Frealms%2Fmaster%2Fevents-settings, code_id=a3d48b67-a439-4546-b992-e93311d6493e, username=admin
     ```
   - Check that the value of `ipAddress` is the IP address of the machine you tried to login with and not the IP address of the reverse proxy or load balancer.

These tests ensure that the reverse proxy or load balancer configuration is correctly set up for Keycloak.

</details>
