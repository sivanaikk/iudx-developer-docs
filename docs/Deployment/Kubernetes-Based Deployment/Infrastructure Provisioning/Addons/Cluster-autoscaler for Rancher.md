---
sidebar_position: 1
---

:::tip Add helm chart repo's

Before proceeding further, run **[add-helm-repositories.sh](https://github.com/datakaveri/iudx-deployment/blob/3e3dd5438b0f096e9ec0ad1bcc71bd7531e0f53c/K8s-deployment/add-helm-repositories.sh)** script to add helm chart repositories from the directory where script resides using below command 

```
./add-helm-repositories.sh
```
:::

<details>
<summary><div class="style">Create a CA user on Rancher</div></summary>

   The Rancher server account provided in the cloud-config requires the Administrator Global Permissions on the Rancher server.
   *  On Rancher portal, select **tribar(☰)⇒Users and Authentication⇒Create**
   *  Set the User Credentials
   *  Assign the Administrator role in `Global Permissions`
   *  Create User
   *  Login to Rancher with the created CA user
   *  From the top right User menu, Go to `Account and API Keys`
   *  Click on `Create API Key`
   *  Set the token expiry and keep the scope set to `No Scope`

      :::note
      As of version 2.6.x Bearer tokens do not work when assigned a scope. Therefore it has to be created without a scope.
      :::

   *  Click on Create

   
   :::note Important 
   **Note the bearer token which will be used in the cloud-config**
   :::

</details>

<details>
<summary><div class="style">Configure config file</div></summary>

1. Navigate to the directory [iudx-deployment/K8s-deployment/K8s-cluster/addons/cluster-autoscaler/rancher ](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/K8s-cluster/addons/cluster-autoscaler/rancher)
2. Define appropriate values in [config.yaml](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/K8s-cluster/addons/cluster-autoscaler/rancher/config.yaml)

</details>

<details>
<summary><div class="style">Enable Autoscaling in Rancher cluster machinePools</div></summary>

1. Add the following  annotation to all worker `machinePools` that need autoscaling. This can be added by editing the cluster configuration as yaml on Rancher <br/>
Select **tribar(☰)⇒Cluster Management⇒Select Cluster⇒︙⇒Edit Config**

   ```
   machineDeploymentAnnotations:
         cluster.provisioning.cattle.io/autoscaler-min-size: "x"
         cluster.provisioning.cattle.io/autoscaler-max-size: "y"
   ```
   where 'x' and 'y' are the number of max and min nodes respectively.
2. Create ca config secret from the config.yaml file of **Configure config file** section
   ```
   kubectl create secret generic ca-config --from-file=./config.yaml -n kube-system
   ```
3. Install cluster autoscaler through helm
   ```
   helm install ca autoscaler/cluster-autoscaler --version 9.25.0 -n kube-system -f values.yaml -f example-resource-values.yaml
   ```
   
</details>

<details>
<summary><div class="style">Testing</div></summary>

1. Navigate to the directory
**[iudx-deployment/K8s-deployment/K8s-cluster/addons/cluster-autoscaler/tests](https://github.com/datakaveri/iudx-deployment/tree/master/K8s-deployment/K8s-cluster/addons/cluster-autoscaler/tests)**

2. Deploy test manifest file
   ```
   kubectl apply -f cluster-autoscaler-test.yaml 
   ```
3. To verify whether cluster autoscaling is functioning properly, execute the following command
   ```
   kubectl get node -o wide
   ```
   More nodes should get added as more pods get added, demanding more node resources.
   Click **[here](https://rancher.com/docs/rancher/v2.5/en/cluster-admin/cluster-autoscaler/amazon/#generating-load)** for more information


</details>






   

