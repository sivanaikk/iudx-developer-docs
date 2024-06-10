---
sidebar_position: 10
---

### Prerequisites

1. Create rs Schema using Flyway:

    1. Port forward the pgpool (postgres proxy) on one terminal:
        ```
        kubectl port-forward -n postgres svc/psql-postgresql-ha-pgpool 5432
        ```
    2. Clone the repository and navigate to it:
        ```
        git clone -b 5.0.0 https://github.com/datakaveri/iudx-resource-server.git && cd iudx-resource-server
        ```
    3. Update `flyway.conf` with the required data:
        ```
        flyway.url=jdbc:postgresql://127.0.0.1:5432/iudx_rs
        flyway.user=postgres
        flyway.password=<value in secrets/passwords/postgresql-password>
        flyway.schemas=public
        flyway.placeholders.rsUser=iudx_rs_user
        flyway.cleanDisabled=true
        flyway.baselineOnMigrate=false
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
    cd iudx-deployment/K8s-deployment/Charts/auditing-server
    ```

2. Make a copy of the sample secrets directory:
    ```
    cp -r example-secrets/secrets .
    ```

3. Provide a correct config file for bringing up the auditing server. Substitute appropriate values using commands mentioned in config files. Configure the `secrets/.auditing.env` file with appropriate values in the placeholders `<...>`.

4. Defining Appropriate values of resources in `resource-values.yaml` as shown in sample resource-values file for **[AWS](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/auditing-server/example-aws-resource-values.yaml)** and **[Azure](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/auditing-server/example-azure-resource-values.yaml)**.
    
    ```
    #For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    #For AWS
    cp example-aws-resource-values.yaml resource-values.yaml

    ```
    
    - Configure the CPU of all auditing verticles 
    - Configure the RAM of all auditing verticles 
    
5. To install auditing on the k8s cluster, run the install script:
    ```
    ./install.sh
    ```
  This script  will:
    - Create a namespace `auditing` on K8s.
    - Create required ConfigMap and Secrets on K8s.
    - Deploy all auditing verticles.


- To check Helm release info:
    ```
    helm list -n auditing
    ```

- To check if the resource-server pods are deployed and running:
    ```
    kubectl get pods -n auditing
    ```
- For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/auditing-server/example-azure-resource-values.yaml)**.
- For more information about the auditing server, refer **[here](https://github.com/datakaveri/auditing-server/tree/1.0.0)**.   

### Tests

Check the logs of all pods in the auditing namespace, there should not be any error log. If it's there, please address as specified/indicated by the log:

```
kubectl logs -f -n auditing <auditing-pod-name>
```