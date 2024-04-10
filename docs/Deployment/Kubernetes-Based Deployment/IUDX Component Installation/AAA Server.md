---
sidebar_position: 11
---
<div style={{textAlign: 'center'}}>

![Architecture](../../../../resources/auth/aaa_overview.png)<br/>

</div>

### Prerequisites

1. Before bringing up the authorization server, make sure Keycloak is configured with proper realms and users.

2. Create auth Schema using Flyway:

    - Port forward the pgpool (Postgres proxy) on one terminal:

        ```
        kubectl port-forward -n postgres svc/psql-postgresql-ha-pgpool 5432
        ```
    
    - Clone the repository and navigate to it:

        ```
        git clone -b 5.0.0 https://github.com/datakaveri/iudx-aaa-server.git && cd iudx-aaa-server/
        ```
    
    - Update `flyway.conf` with the required data:

        ```
        flyway.url=jdbc:postgresql://127.0.0.1:5432/postgres
        flyway.user=postgres
        flyway.password=<value in secrets/passwords/postgresql-password>
        flyway.schemas=aaa
        flyway.placeholders.authUser=iudx_auth_user
        ```
    - Run the info command to test the config:
        ```
        mvn flyway:info -Dflyway.configFiles=flyway.conf
        ```
    - Run the migrate command to set up the database:
        ```
        mvn flyway:migrate -Dflyway.configFiles=flyway.conf
        ```

### Installation

1. Navigate to the below directory: 

    ```
    cd iudx-deployment/K8s-deployment/Charts/auth-server
    ```

2. Make a copy of the sample secrets directory:
    ```
    cp -r example-secrets/secrets .
    ```

3. Provide a correct config file for bringing up the auth-server.

    1. Generate a keystore for JWT signing using the following command:
        ```
        keytool -genkeypair -keystore secrets/keystore.jks -storetype jks -storepass <keystore-password> -keyalg EC -alias ES256 -keypass <keystore-password> -sigalg SHA256withECDSA -dname "CN=,OU=,O=,L=,ST=,C=" -validity 360 -deststoretype pkcs12
        ```

    2. Substitute appropriate values using commands mentioned in config files. Configure the `secrets/.aaa.env` file with appropriate values in the placeholders `<...>`.

4. Defining appropriate values of resources in `resource-values.yaml` as shown in sample resource-values file for **[AWS](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/auth-server/example-aws-resource-values.yaml)** and **[Azure](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/auth-server/example-azure-resource-values.yaml)**.

    ```
    #For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    #For AWS
    cp example-aws-resource-values.yaml resource-values.yaml
    ```

    - Configure the CPU of all aaa-server verticles.
    - Configure the RAM of all aaa-server verticles.
    - Configure ingress.hostname.
    - Configure cert-manager issuer.

5. To install resource-server on the k8s cluster, run the install script:
    ```
    ./install.sh 
    ```

    This script will:
    - Create a namespace `aaa` on K8s.
    - Create required ConfigMap and Secrets on K8s.
    - Deploy all auth-server vertices.

- To check Helm release info:
    ```
    helm list -n aaa
    ```

- To check if the auth-server pods are deployed and running:
    ```
    kubectl get pods -n aaa
    ```

- For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/auth-server#introduction)**.
- For more information about the auth-server, refer **[here](https://github.com/datakaveri/iudx-aaa-server/tree/4.5.0#india-urban-data-exchange-iudx-authentication-authorization-and-accounting-aaa-server)**.


<details>
<summary><div class="style">Testing</div></summary>

1. Auth-server API documentation can be accessed from `https://<cos-domain>/auth/apis`.
2. Verify the endpoint `/auth/v1/cert` displays the public key of the JWT keystore generated above.
3. Check the logs of all pods in `aaa` namespace, there should not be any error log. If it's there, please address as specified/indicated by the log:

    ```
    kubectl logs -f -n aaa <aaa-pod-name>
    ```

</details>
