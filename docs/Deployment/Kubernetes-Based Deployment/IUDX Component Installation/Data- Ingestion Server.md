---
sidebar_position: 19
---

<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../../resources/auth/di_server_overview.png)<br/>

</div></div>

+ The Data Ingestion Server is the "Ingestion Firewall and Data Cleaning Middleware" of IUDX. It enables Providers and Delegates to publish data using the IUDX API as per the data descriptor using the HTTP protocol over TLS(HTTPs).

+ Will be deploying using swarm stack yaml files


### Installation

1. Navigate to the below directory: 
    ```
    cd iudx-deployment/K8s-deployment/Charts/data-ingestion
    ```

2. Make a copy of the sample secrets directory:
    ```
    cp -r example-secrets/secrets .
    ```

3. Provide a correct config file for bringing up the Data Ingestion Server. Substitute appropriate values using commands mentioned in config files.

4. Configure the `secrets/.di.env` file with appropriate values in the placeholders `<...>`.

5. Define appropriate values of resources in `resource-values.yaml` as shown in the sample resource-values file for **[AWS](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/data-ingestion/example-aws-resource-values.yaml)** and **[Azure](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/data-ingestion/example-azure-resource-values.yaml)**:

    ```
    # For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    # For AWS
    cp example-aws-resource-values.yaml resource-values.yaml
    ```

    - Configure the following:
      - CPU and RAM for all Data Ingestion verticles.
      - `Ingress.hostname` 
      - Cert-manager issuer.

6. To install the Data Ingestion Server on the Kubernetes cluster, run the install script:
    ```
    ./install.sh
    ```

    This script will:
    - Create a namespace `di` on Kubernetes.
    - Create required ConfigMap and Secrets on Kubernetes.
    - Deploy all Data Ingestion server verticles.

- To check Helm release info:
    ```
    helm list -n di
    ```

- To check if the Data Ingestion Server pods are deployed and running:
    ```
    kubectl get pods -n di
    ```

- For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/data-ingestion#introduction)**.
- For more information about the Data Ingestion Server, refer **[here](https://github.com/datakaveri/iudx-gis-interface/tree/4.5.0)**.

### Testsing:

- Data Ingestion Server API documentation can be accessed from `https://<di-domain>/apis`.
- Check the logs of all pods in `di` namespace; there should not be any error log. If any errors are present, address them as specified/indicated by the log:
    ```
    kubectl logs -f -n di <di-pod-name>
    ```
