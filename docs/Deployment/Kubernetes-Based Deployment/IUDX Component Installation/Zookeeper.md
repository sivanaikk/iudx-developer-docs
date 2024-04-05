---
sidebar_position: 5
---

<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/zookeeper-arch.png)
</div>
</div>


- Three pod HA zookeeper deployed using helm chart 
- Zookeeper is mainly used for discovery of different vertx pods of vertx based server (eg: resource server) and K8s. - Hazelcast stores the vertx cluster info.


### Installation

1. Navigate to the below directory:

    ```
    cd iudx-deployment/K8s-deployment/Charts/zookeeper
    ```
2. copy the example resource values YAML file to resource-values.yaml.
    
    ```
    cp example-aws-resource-values.yaml resource-values.yaml
    ```

3. Define Appropriate values of resources in `resource-values.yaml` as shown in sample resource-values file for **[aws](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/zookeeper/example-aws-resource-values.yaml)** and **[azure](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/zookeeper/example-azure-resource-values.yaml)**.
    
    - CPU requests and limits
    - RAM requests and limits, 
    - Instance-type for nodeSelector
    - StorageClassName
    - Size of the persistent volume required 

4. To install redis on the k8s cluster, run the install script using the following command: 

    ```
    ./install.sh
    ```
    The script does following:
    - It adds bitnami helm repo
    - It creates zookeeper namespace
    - It installs HA 3 pod zookeeper cluster.

- To check helm release info: 
    ```
    helm list -n zookeeper
    ```
- To check if the di pods are deployed and running: 
    ```
    kubectl get pods -n zookeeper
    ```
