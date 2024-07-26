---
sidebar_position: 5
---

1. Navigate to the directory [iudx-deployment/K8s-deployment/K8s-cluster/addons/storage/aws](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/K8s-cluster/addons/storage/aws)
    ```
    cd iudx-deployment/K8s-deployment/K8s-cluster/addons/storage/aws
    ```

### EBS setup 
1. Enable flag `--allow-privileged=true` for kube-apiserver
    * This flag can be enabled in rancher server, through advanced cluster configuration.

2. Install the drivers by following the steps [here](https://github.com/kubernetes-sigs/aws-ebs-csi-driver/blob/master/docs/install.md#installation)
3. Deploy the storage class
    ```
    kubectl apply -f ebs-csi-storageclass.yaml
    ```

### EFS setup

:::note
 Add an Inbound rule in the security group of the EFS to allow TCP traffic at port `2049` (NFS) with security group of the worker nodes as the source.
:::

1. Install aws-efs csi drivers by following the steps [here](https://github.com/kubernetes-sigs/aws-efs-csi-driver#installation)
2. Update the `efs-storageclass.yaml` with the file system id of EFS created.
3. Deploy the storageClass
    ```
    kubectl apply -f efs-csi-storageclass.yaml
    ```