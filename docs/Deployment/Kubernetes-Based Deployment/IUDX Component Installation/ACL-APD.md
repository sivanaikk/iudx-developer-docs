---
sidebar_position: 12
---

### Prerequisites

For all the auth APIs used here, please use the Postman collection + env found **[here](https://github.com/datakaveri/iudx-aaa-server/blob/main/src/main/resources/postman/IUDX-AAA-Server.postman_collection.json)**.  


### ACL APD Trustee Registration

1. Register Trustee Keycloak User:
    - Register the trustee keycloak user with email of format `acl-apd.<cos-name>.trustee@datakaveri.org` on Keycloak using the Keycloak Admin UI on the respective realm. Ensure that "Email Verified" is set to True.
    - Set a permanent password for the user in the Credentials tab. Ensure that "Temporary" is set to False.
    
2. Create Required APD:
    - Create the required Access Policy Domain (APD) and assign the trustee to it on the auth server using the following API: **[Post APD API](https://authorization.iudx.org.in/apis#tag/Access-Policy-Domain-(APD)-APIs/operation/post-auth-v1-apd)**.
    - Use COS/DX Admin Keycloak credentials to login through Keycloak and get OAuth token to call this API.
    - Use the following body values when creating the APD:
        - url: `<acl-apd-url>`
        - owner: `<acl-apd-trustee-keycloak-user>`
        - name: ACL-APD

3. Get Default Client Credentials:
    - Get the default client credentials of the trustee user using the following API: **[Get Client Credentials API](https://authorization.iudx.org.in/apis#tag/User-APIs/operation/get-auth-v1-user-clientcredentials)**.
    - Use ACL-APD trustee user Keycloak credentials to login through Keycloak and get OAuth token to call this API.
    - Use the trustee Keycloak email + password to do this.

### Flyway Migration

1. Flyway Migration:
    - Port forward the pgpool (Postgres proxy) on one terminal:
        ```
        kubectl port-forward -n postgres svc/psql-postgresql-ha-pgpool 5432
        ```
    - Clone the repository and navigate to it:
        ```
        git clone -b 1.0.0 https://github.com/datakaveri/iudx-acl-apd.git
        ```
    - Update `flyway.conf` with the required data:
        ```
        flyway.url=jdbc:postgresql://127.0.0.1:5432/<auth-db>
        flyway.user=postgres
        flyway.password=<value in secrets/passwords/postgresql-password>  
        flyway.schemas=acl_apd
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
    cd iudx-deployment/K8s-deployment/Charts/acl-apd
    ```

2. Make a copy of the sample secrets directory:
    ```
    cp -r example-secrets/secrets .
    ```

3. Provide a correct config file (`secrets/config.json`) for bringing up acl-apd server. No need to define `secrets/profanity-config/config.json` and leave as is (don’t delete the file). Substitute appropriate values using commands mentioned in config files.

4. Configure the `secrets/.apd.env` file with appropriate values in the placeholders `<...>`.

5. Defining appropriate values of resources in `resource-values.yaml` as shown in sample resource-values file for **[AWS](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/acl-apd/example-aws-resource-values.yaml) ** and **[Azure](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/acl-apd/example-azure-resource-values.yaml)**.

    ```
    #For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    #For AWS
    cp example-aws-resource-values.yaml resource-values.yaml
    ```
     

6. To install catalogue-server on the k8s cluster, run the install script:
    ```
    ./install.sh
    ```

    This script will:
    - Create a namespace `acl-apd` on K8s.
    - Create required ConfigMap and Secrets on K8s.
    - Deploy all acl-apd vertices.


- To check Helm release info:
    ```
    helm list -n acl-apd
    ```

- To check if the catalogue-server pods are deployed and running:
    ```
    kubectl get pods -n acl-apd
    ```

- For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/Charts/acl-apd)**.
- For more information about the catalogue-server, refer **[here](https://github.com/datakaveri/iudx-acl-apd/tree/1.0.0)**.

## Testing

- ACL APD API documentation can be accessed from `https://<acl-apd-domain>/apis`.
- Check the logs of all pods in `acl-apd` namespace, there should not be any error log. If it's there, please address as specified/indicated by the log:
    ```
    kubectl logs -f -n acl-apd <acl-apd-pod-name>
    ```

