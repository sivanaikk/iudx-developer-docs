---
sidebar_position: 22
---

The dmp-apdschema created using flyway using following steps:

1. Port forward the pgpool (Postgres proxy) on one terminal:
    ```
    kubectl port-forward -n postgres svc/psql-postgresql-ha-pgpool 5432
    ```

2. In another terminal, Clone the below repository:
    ```
    git clone -b 5.0.0 https://github.com/datakaveri/iudx-data-marketplace-apd/.git && cd iudx-data-marketplace-apd/
    ```

3. Update `flyway.conf` with the required data:
    ```
    flyway.url=jdbc:postgresql://127.0.0.1:5432/data_marketplace_apd
    flyway.user=postgres
    flyway.password=<value in secrets/passwords/postgresql-password>
    flyway.schemas=public
    flyway.placeholders.authUser=dmp_user
    ```
4. Run the info command to test the config:
    ```
    mvn flyway:info -Dflyway.configFiles=flyway.conf
    ```
5. Run the migrate command to set up the database:
    ```
    mvn flyway:migrate -Dflyway.configFiles=flyway.conf
    ```

### Installation

1. Navigate to the below directory:
    ```
    cd iudx-deployment/K8s-deployment/Charts/dmp-apd
    ```
2. Navigate to the 'secrets' directory:
    ```
    cd iudx-deployment/K8s-deployment/Charts/dmp-apd/secrets
    ```
3. Provide a correct config file (`secrets/config.json`) for bringing up the dmp-apd server. Substitute appropriate placeholders.
4. Configure the `secrets/.dmp-apd.env` file with appropriate values and placeholders.
5. Define appropriate values of resources in `deployment.yaml` file.
6. Navigate to `ingress.yaml` file and replace proper placeholders for “host(s)”.
7. To install dmp-apd on the Kubernetes cluster, run the install script:
    ```
    ./install.sh
    ```
    - This script will:
        - Create a namespace `dmp-apd` on Kubernetes.
        - Create required ConfigMap and Secrets on Kubernetes.
        - Deploy all dmp-apd verticles.

8. To check if the dmp-apd pods are deployed and running:
    ```
    kubectl get pods -n dmp-apd
    ```

<details>
<summary><div class="style">Testing</div></summary>

- Catalogue-server API documentation can be accessed from:
    ```
    https://<cos-domain>/apis
    ```
- Check the logs of all pods in `dmp-apd` namespace; there should not be any error log. If any errors are present, address them as specified/indicated by the log:
    ```
    kubectl logs -f -n dmp-apd <dmp-apd-pod-name>
    ```

    
</details>
