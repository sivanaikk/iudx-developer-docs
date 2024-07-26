---
sidebar_position: 15
---
<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../../resources/auth/rs-architecture.png)<br/>

</div></div>

+ The resource server is IUDXs data discovery, data publication and data subscription portal. It allows data providers to publish their data resources in accordance to the IUDX vocabulary annotated meta-data document, data subscribers to query and subscribe for data resources as per the consent of the provider. The consumers can access data from the resource server using HTTPs and AMQPs.

+ will be deployed using swarm stack YAML files.

### Prerequisite:

- Ensure all necessary configurations and access permissions are in place before proceeding with the deployment.

### Installation:

1. Navigate to the below directory:
    ```
    cd iudx-deployment/K8s-deployment/Charts/resource-server
    ```

2. Make a copy of the sample secrets directory:
    ```
    cp -r example-secrets/secrets .
    ```

3. Provide a correct config file (`secrets/config.json`) for bringing up the Resource-Server. Substitute appropriate values using commands mentioned in config files.

4. Configure the `secrets/.rs.env` file with appropriate values in the placeholders `<...>`.

5. Define appropriate values of resources in `resource-values.yaml` as shown in the sample resource-values file for **[AWS](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/resource-server/example-aws-resource-values.yaml)** and **[Azure](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/resource-server/example-azure-resource-values.yaml)**:

    ```
    # For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    # For AWS
    cp example-aws-resource-values.yaml resource-values.yaml
    ```

    - Configure the following:
      - CPU and RAM for all Resource-Server verticles.
      - `Ingress.hostname`
      - Cert-manager issuer.

6. To install Resource-Server on the Kubernetes cluster, run the install script:
    ```
    ./install.sh
    ```

    This script will:
    - Create a namespace `rs` on Kubernetes.
    - Create required ConfigMap and Secrets on Kubernetes.
    - Deploy all Resource-Server vertices.

- To check Helm release info:
    ```
    helm list -n rs
    ```

- To check if the Resource-Server pods are deployed and running:
    ```
    kubectl get pods -n rs
    ```

- For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/resource-server#introduction)**.
- For more information about the Resource-Server, refer **[here](link-to-resource-server-information)**.

<details>
<summary><div class="style">Testing</div></summary>

- Resource-Server API documentation can be accessed from `https://<rs-domain>/apis`.
- Check the logs of all pods in `rs` namespace; there should not be any error log. If any errors are present, address them as specified/indicated by the log:
    ```
    kubectl logs -f -n rs <rs-pod-name>
    ```

    
</details>
