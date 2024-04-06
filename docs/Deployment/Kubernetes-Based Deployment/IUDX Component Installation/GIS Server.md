---
sidebar_position: 18
---

### Installation

1. Navigate to the below directory:
    ```
    cd iudx-deployment/K8s-deployment/Charts/gis-interface
    ```

2. Make a copy of the sample secrets directory:
    ```
    cp -r example-secrets/secrets .
    ```

3. Provide a correct config file for bringing up the GIS Interface Server. Substitute appropriate values using commands mentioned in config files.

4. Configure the `secrets/.gis.env` file with appropriate values in the placeholders `<...>`.

5. Define appropriate values of resources in `resource-values.yaml` as shown in the sample resource-values file for **[AWS](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/gis-interface/example-aws-resource-values.yaml)** and **[Azure](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/gis-interface/example-azure-resource-values.yaml)**:

    ```
    # For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    # For AWS
    cp example-aws-resource-values.yaml resource-values.yaml
    ```

    - Configure the following:
      - CPU and RAM for all GIS verticles.
      - `Ingress.hostname`
      - Cert-manager issuer.

6. To install the GIS Interface Server on the Kubernetes cluster, run the install script:
    ```
    ./install.sh
    ```

    This script will:
    - Create a namespace `gis` on Kubernetes.
    - Create required ConfigMap and Secrets on Kubernetes.
    - Deploy all GIS server verticles.

- To check Helm release info:
    ```
    helm list -n gis
    ```

- To check if the GIS Interface Server pods are deployed and running:
    ```
    kubectl get pods -n gis
    ```

- For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/gis-interface#introduction)**.
- For more information about the GIS Interface Server, refer **[here](https://github.com/datakaveri/iudx-gis-interface/tree/4.5.0)**.

### Testing:

- GIS Interface Server API documentation can be accessed from `https://<gis-hostname>/apis`.
- Check the logs of all pods in `gis` namespace; there should not be any error log. If any errors are present, address them as specified/indicated by the log:
    ```
    kubectl logs -f -n gis <gis-pod-name>
    ```
