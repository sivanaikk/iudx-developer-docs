---
sidebar_position: 7
---
<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/keycloak-arch.png)
</div>
Keycloak is used as an Identity Manager and will be deployed using swarm stack YAML files.

### Prerequisites

Generate the Keycloak database password during the PostgreSQL installation: `../postgresql/secrets/postgres-keycloak-password`

### Installation

1. Navigate to the below directory :

    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/keycloak/
    ```

2. Assign the node label if not assigned during swarm installation:

    ```
    docker node update --label-add keycloak-node=true <node_name>
    ```

3. To generate the passwords:

    ```
    ./create-secrets.sh
    ```

4. Secrets directory after generation of secrets:

    ```
    secrets/
    └── passwords
        ├── keycloak-admin-passwd
        └── keycloak-db-passwd
    ```

5. Define Appropriate values of resources in `keycloak-stack.resources.yml` as shown in the sample file **[example-keycloak-stack.resources.yml](https://github.com/datakaveri/iudx-deployment/blob/master/Docker-Swarm-deployment/single-node/keycloak/example-keycloak-stack.resources.yaml)**.
    
    + CPU requests and limits 
    + RAM requests and limits
    + PID limit

6. Deploy Keycloak stack as follows:
    
    ```
    cp example-keycloak-stack.resources.yaml keycloak-stack.resources.yaml

    docker stack deploy -c keycloak-stack.yaml -c keycloak-stack.resources.yaml keycloak
    ```
### Notes

1. Keycloak UI can be accessed from **https://< keycloak-domain-name >**
2. Keycloak is tls secured through centralised nginx.
3. To check if the keycloak stacks are deployed and running:`docker stack ps keycloak`
4. For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/master/Docker-Swarm-deployment/single-node/keycloak)**.


### Keycloak Configuration

Refer to **[this link](https://github.com/datakaveri/iudx-aaa-server/issues/224#issuecomment-1228257142)** for additional details.

**Create Realm**

1. Login to the admin console page with the realm set to the one you just created.

2. Add the login settings with the following configurations:
   - User registration: ON
   - Email as username: ON
   - Edit username: OFF
   - Forgot password: ON (see **[SMTP Configuration](https://github.com/datakaveri/iudx-aaa-server/issues/224#SMTP-Configuration)**)
   - Verify email: ON (see **[SMTP Configuration](https://github.com/datakaveri/iudx-aaa-server/issues/224#SMTP-Configuration)**)
   - Login with email: ON

**SMTP Configuration**

For Forgot password and Verify email functionalities to work, configure an SMTP connection. This allows Keycloak to send emails to the user, containing a reset password link or a verification link. Follow the **[Email Settings](https://www.keycloak.org/docs/14.0/server_admin/#_email)** to configure SMTP for the created realm.


**Adding Roles**

Add roles to the realm as follows:
Refer to **[Realm Roles](https://www.keycloak.org/docs/14.0/server_admin/#realm-roles)** for detailed instructions.

The roles to be added are:
- consumer
- delegate
- provider
- admin
- trustee

**Adding Clients**

Add clients to the realm. These clients are used by the AAA server to connect to Keycloak and perform certain tasks. Refer to **[OIDC Clients](https://www.keycloak.org/docs/14.0/server_admin/#oidc-clients)** to learn how to add new clients and explore different options present in the client settings.

**Admin Client**
1. Create a new client with the Client ID as `keycloak-admin`.
2. Update the client settings in the Settings tab:
   1. Access Type set to confidential
   2. Standard Flow Enabled set to OFF
   3. Direct Access Grants Enabled set to OFF
   4. Service Accounts Enabled set to ON (this only appears if Access Type is confidential)
3. Save the settings. Once saved, a new tab called Credentials will appear, containing the client secret. This, along with the client ID, is required when configuring the AAA server. See **[Client Credentials](https://www.keycloak.org/docs/14.0/server_admin/#_client-credentials)** for more information.
4. Another tab called Service Account Roles also appears. See **[Service Accounts](https://www.keycloak.org/docs/14.0/server_admin/#_service_accounts)** for more information.
   1. In the Service Account Roles tab:
     1. In the Client Roles bar, go to realm-management and select it (see **[Dedicated Realm Admin Consoles](https://www.keycloak.org/docs/14.0/server_admin/#_per_realm_admin_permissions)** for more information)
     2. In the Available Roles select box, add the following roles to the Assigned Roles box:
         1. manage-users
         2. view-realm
         3. view-users

   The configuration for the keycloak-admin client is complete.

 
**Normal Client**

Create a new client with the Client ID as `auth.iudx.org.in`.
Update the client settings in the Settings tab:

   - Access Type set to confidential
   - Standard Flow Enabled set to OFF
   - Direct Access Grants Enabled set to OFF
   - Service Accounts Enabled set to ON (this only appears if Access Type is confidential)

Save the settings. Once saved, a new tab called Credentials will appear, containing the client secret. This, along with the client ID, is required when configuring the AAA server. See **[Client Credentials](https://www.keycloak.org/docs/14.0/server_admin/#_client-credentials)** for more information.

**Post Configuration**

After Keycloak is configured, you need to add the Keycloak host, port, client IDs, and client secrets to the config of the AAA server. Please refer to this [example config](https://github.com/datakaveri/iudx-aaa-server/blob/3.5.0/configs/config-example.json) for more information. In the example config:

- `keycloakAdminClient...` corresponds to the **[Admin client](https://github.com/datakaveri/iudx-aaa-server/issues/224#Admin-client)**
- `keycloakAaaClient...` corresponds to the **[Normal client](https://github.com/datakaveri/iudx-aaa-server/issues/224#Admin-client)**

