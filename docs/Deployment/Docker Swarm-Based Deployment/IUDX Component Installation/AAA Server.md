---
sidebar_position: 11
---

Will be deploying using swarm stack YAML files.

### Prerequisites

Before bringing up the authorization server, make sure Keycloak is configured with proper realms and users.

### Installation

1. Navigate to the below    directory:.

    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/auth/
    ```

2. Assign the node label if not assigned during swarm installation using:

    ```
    docker node update --label-add auth-node=true <node_name>
    ```

3. Make a copy of the sample secrets directory by running the following command:

    ```
    cp -r example-secrets/secrets .
    ```

4. Generate a keystore for JWT signing using the following command:

    ```
    keytool -genkeypair -keystore secrets/keystore.jks -storetype jks -storepass <keystore-password> -keyalg EC -alias ES256 -keypass <keystore-password> -sigalg SHA256withECDSA -dname "CN=,OU=,O=,L=,ST=,C=" -validity 360 -deststoretype pkcs12
    ```

    For more information, refer **[here](https://github.com/datakaveri/iudx-aaa-server/tree/4.5.0#jwt-signing-key-setup)**.

5. Provide a correct config file for bringing up the auth-server. Substitute appropriate values using commands mentioned in config files.

6. Configure the `secrets/.aaa.env` file with appropriate values in the placeholders `<placeholder>`.

7. Define appropriate values of resources 
    + CPU requests and limits
    + RAM requests and limits
    + PID limit
   in `auth-stack.resources.yml` as shown in the sample file **[example-auth-stack.resources.yaml](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/Docker-Swarm-deployment/single-node/auth/example-auth-stack.resources.yaml)**.

8. To install the authorization server stack, use the following command:

    ```
    cp example-auth-stack.resources.yaml auth-stack.resources.yaml

    docker stack deploy -c auth-stack.yaml -c auth-stack.resources.yaml auth
    ```

### Notes

1. Auth-server API documentation can be accessed from **https://< cop-domain >/aaa/apis**.
2. To check if the auth-server is deployed and running : `docker stack ps auth`
3. For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/Docker-Swarm-deployment/single-node/auth)**.
4. For more information about the auth-server, refer **[here](https://github.com/datakaveri/iudx-aaa-server#india-urban-data-exchange-iudx-authentication-authorization-and-accounting-aaa-server)**.