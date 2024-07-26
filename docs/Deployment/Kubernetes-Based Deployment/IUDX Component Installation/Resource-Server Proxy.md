---
sidebar_position: 16
---

### Installation:

1. Navigate to the below directory: 
    ```
    cd iudx-deployment/K8s-deployment/Charts/rs-proxy
    ```

2. Make a copy of the sample secrets directory:
    ```
    cp -r example-secrets/secrets .
    ```

3. Provide a correct config file for bringing up the rs-proxy. Substitute appropriate values using commands mentioned in config files.

4. Configure the `secrets/.rs-proxy.env` file with appropriate values in the placeholders `<...>`.

5. Define appropriate values of resources in `resource-values.yaml` as shown in the sample resource-values file for **[AWS](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/rs-proxy/example-aws-resource-values.yaml)** and **[Azure](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/rs-proxy/example-azure-resource-values.yaml)**:

    ```
    # For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    # For AWS
    cp example-aws-resource-values.yaml resource-values.yaml
    ```

    - Configure the following:
      - CPU and RAM for all rs-proxy verticles.
      - `Ingress.hostname` 
      - Cert-manager issuer.

6. To install rs-proxy on the Kubernetes cluster, run the install script:
    ```
    ./install.sh
    ```

    This script will:
    - Create a namespace `rs-proxy` on Kubernetes.
    - Create required ConfigMap and Secrets on Kubernetes.
    - Deploy all rs-proxy verticles.

- To check Helm release info:
    ```
    helm list -n rs-proxy
    ```

- To check if the rs-proxy pods are deployed and running:
    ```
    kubectl get pods -n rs-proxy
    ```

- For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/rs-proxy#introduction)**.
- For more information about the rs-proxy, refer **[here](https://github.com/datakaveri/iudx-rs-proxy/tree/4.5.0#iudx-resource-proxy-server)**.

<details>
<summary><div class="style">Testing</div></summary>

- rs-proxy API documentation can be accessed from `https://<rs-proxy-hostname>/apis`.
- Check the logs of all pods in `rs-proxy` namespace; there should not be any error log. If any errors are present, address them as specified/indicated by the log:
    ```
    kubectl logs -f -n rs-proxy <rs-proxy-pod-name>
    ```

</details>
