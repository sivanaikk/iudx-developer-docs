---
sidebar_position: 2
---


### Introduction

+ It acts as reverse proxy doing TLS termination, rate limiting for all (HTTP) public/outward facing IUDX endpoints

+ It does proxy for catalogue server, resource server (rs), AAA (Authorization, Authentication and Accounting), grafana and kibana.


Nginx setup using helm chart

1. Navigate to the directory [iudx-deployment/K8s-deployment/K8s-cluster/addons/ingress-controller](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/K8s-cluster/addons/ingress-controller)
    ```
    cd iudx-deployment/K8s-deployment/K8s-cluster/addons/ingress-controller
    ```
2. Define Appropriate values of resources in resource-values.yaml -
    * CPU requests and limits
    * RAM requests and limits <br/>

    Refer [here](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/K8s-cluster/addons/cluster-autoscaler/rancher/example-resource-values.yaml)

3. Define resource values for memcached and ingress-nginx in respective directories in `resource-values.yaml` as per the resource planning done in the previous step. Please see the example of 'resource-values.yaml' reference for ingress-nginx, memcached present in their respective directories for aws and azure cloud. 

    ``` 
    cp iudx-deployment/K8s-deployment/K8s-cluster/addons/ingress-controller/ingress-nginx/example-aws-resource-values.yaml iudx-deployment/K8s-deployment/K8s-cluster/addons/ingress-controller/ingress-nginx/resource-values.yaml
    ```
4. Configure values for the below attibutes in `resource-values.yaml` file

    * **`node.kubernetes.io/instance-type:<instance-type>`**
    * **`service.beta.kubernetes.io/aws-load-balancer-type:<load-balancer-type>`**
    * **`service.beta.kubernetes.io/aws-load-balancer-eip-allocations:<Allocation ID of EIP>`**
    * **`service.beta.kubernetes.io/aws-load-balancer-subnets:<subnet-id>`**
5. Install Nginx using script using below command
    ```
    ./install.sh
    ```

:::note Info
**Why memcache is used?**

Whenever we use Nginx, we ought to set rate limit to restrict the number of requests being forwarded or sent to a server. However, when we deploy nginx in cluster manner i.e., nginx being deployed on different nodes maintaining rate limit would be a task. So, in order to address this issue we are using memcache solution here to aggregate all the requests of individual nginx server in memache to track rate limit.
:::

<details>    
<summary><div class="style">Testing</div></summary>

 Navigate to **[iudx-deployment/K8s-deployment/K8s-cluster/addons/ingress-controller/tests](https://github.com/datakaveri/iudx-deployment/tree/master/K8s-deployment/K8s-cluster/addons/ingress-controller/tests)** directory

 Run `connectivity-test.sh` script to check nginx test parameters

```
./connectivity-test.sh 
```


</details>
 


