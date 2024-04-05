
### Prerequisites

- Ensure that Cos admin client is created.

### Installation

1. Navigate to the below directory:

    ```
    cd iudx-deployment/K8s-deployment/Charts/onboarding-server
    ```

2. Make a copy of the sample secrets directory by running the following command:
    ```
    cp -r example-secrets/secrets .
    ```

3. Provide a correct config file (`secrets/config.json`) for bringing up onboarding-server. Substitute appropriate values using commands mentioned in config files.

4. Configure the `secrets/.onboarding.env` file with appropriate values in the placeholders `<...>`.

5. Defining Appropriate values of resources in `resource-values.yaml` as shown in sample resource-values file for **[AWS](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/onboarding-server/example-aws-resource-values.yaml)** and **[Azure](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/onboarding-server/example-azure-resource-values.yaml)**.  

    ```
    #For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    #For AWS
    cp example-aws-resource-values.yaml resource-values.yaml
    ```
    Configure the following -
       - CPU of all onboarding-server verticles
       - RAM of all onboarding-server verticles
       - `Ingress.hostname` - should be COS/DX domain URL
       - cert-manager issuer

6. To install onboarding-server on the k8s cluster, run the install script:
    ```
    ./install.sh
    ```

    This script will:
    - Create a namespace `onboarding` on K8s.
    - Create required ConfigMap and Secrets on K8s.
    - Deploy all onboarding vertices.

- To check helm release info
    ```
    helm list -n onboarding
    ```

- To check if the onboarding-server pods are deployed and running:
    ```
    kubectl get pods -n onboarding
    ```

- For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/Charts/onboarding-server#introduction)**.
- For more information about the onboarding-server, refer **[here](https://github.com/datakaveri/iudx-onboarding-server)**.

### Testing

- Onboarding-server API documentation can be accessed from `https://<cos-domain>/onboarding/apis`.
- Check the logs of all pods in `onboarding` namespace, there should not be any error log. If it's there, please address as specified/indicated by the log:
    ```
    kubectl logs -f -n onboarding <onboarding-pod-name>
    ```

