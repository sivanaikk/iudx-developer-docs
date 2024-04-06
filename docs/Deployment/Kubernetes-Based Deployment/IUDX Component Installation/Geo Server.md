---
sidebar_position: 21
---


### Prerequisites

1. Create Database and User in Postgres:
    
    ```
    CREATE DATABASE ugix WITH ENCODING 'UTF8';
    CREATE ROLE ugix_user WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
    ALTER ROLE ugix_user WITH ENCRYPTED PASSWORD '<password>';
    GRANT ALL ON SCHEMA public TO ugix_user;
    ```
2. Enable Extensions in Database:
    
    ```
    CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
    ```

3. Flyway Schema Creation

    1. Port forward the pgpool (Postgres proxy) on one terminal:
        ```
        kubectl port-forward -n postgres svc/psql-postgresql-ha-pgpool 5432
        ```
    2. Clone the repository:
        ```
        git clone https://github.com/datakaveri/ogc-resource-server/tree/main
        ```
    3. Update `flyway.conf` with the required data:
        ```
        flyway.url=jdbc:postgresql://127.0.0.1:5432/ugix
        flyway.user=postgres
        flyway.password=<value in secrets/passwords/postgresql-password>
        flyway.schemas=public
        flyway.placeholders.ogcUser=ugix_user
        flyway.cleanDisabled=true
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
    cd iudx-deployment/K8s-deployment/Charts/geoserver
    ```
2. Navigate to the 'secrets' directory:
    ```
    cd iudx-deployment/K8s-deployment/Charts/geoserver/secrets
    ```
    1. Provide a correct config file (`secrets/config.json`) for bringing up GeoServer. Substitute appropriate placeholders. For S3 bucket, access key, and secret, use IAM user and S3 bucket created during infrastructure setup instructions.
    2. Configure the `secrets/.geoserver.env` file with appropriate values and placeholders.

3. Define appropriate values of resources in `deployment.yaml` file.
4. Navigate to `ingress.yaml` file and replace proper placeholder for “host(s)”.
5. To install GeoServer on the Kubernetes cluster, run the install script:
    ```
    ./install.sh
    ```
    - This script will:
        - Create a namespace `ugix-geoserver` on Kubernetes.
        - Create required ConfigMap and Secrets on Kubernetes.
        - Deploy all GeoServer verticles.

6. To check if the GeoServer pods are deployed and running:
    ```
    kubectl get pods -n ugix-geoserver
    ```
- For more information about the geoserver, refer **[here](https://github.com/datakaveri/iudx-onboarding-server)**.

### Testing

- Catalogue-server API documentation can be accessed from:
    ```
    https://<cos-domain>/api
    ```
- Check the logs of all pods in `ugix-geoserver` namespace; there should not be any error log. If any errors are present, address them as specified/indicated by the log:
    ```
    kubectl logs -f -n ugix-geoserver <geoserver-pod-name>
    ```
