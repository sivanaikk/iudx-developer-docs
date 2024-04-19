---
sidebar_position: 4
---

1. Navigate to the directory- **iudx-deployment/K8s-deployment/K8s-cluster/addons/Certmanager**
    ```
    cd iudx-deployment/K8s-deployment/K8s-cluster/addons/Certmanager
    ```
    Optional: Copy example-resouce file to create resource file to add custom values

    ```
    cp example-resource-values.yaml resource-values.yaml
    ```
2. Define resource values for certmanager in the file `resource-values.yaml`.  An example is given in `example-resource-values.yaml`
3. Add the Jetstack Helm repository and Update ( repos would be already present if you followed Add `helm chart repo's` step aforementioned in Cluster autoscaler section )
    ```
    helm repo add jetstack https://charts.jetstack.io && helm repo update
4. Create namespace for cert-manager using:
    ```
    kubectl create namespace cert-manager
    ```
5. Install cert-manager with CRD ( Custom Resouce Definition)
    ```
    helm install -f cert-manager-values.yaml -f resource-values.yaml  cert-manager jetstack/cert-manager -n cert-manager  --version  v1.9.1 --set installCRDs=true
    ```

:::note 
For more information refer to the documentation **[here](https://cert-manager.io/docs/installation/helm/#installing-with-helm)**

:::

#### To deploy cert-manager issuer [Currently deploys `LetsEncrypt` issuer]
1. Define the appropriate email-id required for letsencrypt issuer in `cert-manager-cluster-issuer.yaml`
2. To deploy
    ```
    kubectl apply -f cert-manager-cluster-issuer.yaml
    ```
    This will deploy both staging and production LetsEncrypt issuers
3. To uninstall a specific issuer, use following command
    ```
    kubectl delete ClusterIssuer <name-of-issuer>
    ```
:::note Important
The Let’s Encrypt production issuer has very strict rate limits. Hence, use Let’s Encrypt staging issuer while experimenting and learning.
[Read more](https://letsencrypt.org/docs/rate-limits/)
:::

