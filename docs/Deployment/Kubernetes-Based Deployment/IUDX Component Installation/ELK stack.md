---
sidebar_position: 6
---
<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/ElasticStack-arch.png)
</div></div>

- Deploys ElasticSearch, Logstash, and Kibana
- Elasticsearch is being used as a meta-data and data store. Logstash is being used as the data pipeline between RabbitMQ and Elasticsearch. Kibana is being used for visualisation and management of the ELK stack.
- The current architecture in IUDX deploys Elasticsearch in a clustered mode with 3-mcd nodes + 1-data node (with autoscaling of the data nodes). 1 Kibana instance. 2 Logstash instances.
- Will be deploying using bitnami helm charts
- The current architecture also consists of a custom autoscaler. 


### Prerequisite

RabbitMQ needs to be up for Logstash to connect.

### Installation

1. Navigate to the below directory:

    ```
    cd iudx-deployment/K8s-deployment/Charts/elk
    ```

2. Make a copy of the sample secrets directory by running the following command:

    ```
    cp -r example-secrets/secrets .
    ```

3. Run the create-secrets script to automatically generate safe random passwords for all elk users using the following command:

    ```
    ./create-secrets.sh
    ```
    **Secrets are generated in the secrets/passwords directory for all users.**

4. Appropriately define the azure storage access-key and account-name in the secrets/passwords/snapshot-credentials file

    ```
    azure.client.default.account=<storage_account_name>,azure.client.default.key=<access-key>
    ```
5. copy the example resource values YAML file to resource-values.yaml.
    
    ```
    cp example-aws-resource-values.yaml resource-values.yaml
    ```
6. Define Appropriate values of resources in `elasticsearch/es-resource-values.yaml`, `logstash/ls-resource-values.yaml`, and `kibana/kibana-resource-values.yaml` as shown in sample resource-values files present in the **[elasticsearch/](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/Charts/elk/elasticsearch)**, **[logstash/](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/Charts/elk/logstash)**, and **[kibana/](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/Charts/elk/kibana)** directories respectively.
    
    - CPU requests and limits
    - RAM requests and limits, 
    - Java heap size
    - nodeSelector
    - Storage class name
    - cert-manager issuer and ingress hostname (Kibana)

7. Define Appropriate nodeSelector value in the **[elasticsearch/autoscale-croES_JAVA_OPTSn.yml](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/elk/elasticsearch/autoscale-cron.yml)**.

### ElasticSearch Installation Guide

To install ElasticSearch on a Kubernetes (K8s) cluster, follow these steps:

1. Execute the `es-install.sh` script using the following command:
    ```
    ./es-install.sh
    ```

2. **Generate Keystores**: The installation script generates keystores using `generate-keystores.sh`. It creates 2 Keystore files for Logstash and Kibana in the `secrets/keystores/` directory.

3. Generates CA signed certs from ./elasticsearch/generate-certs.sh

4. A namespace named `elastic` is created in the Kubernetes cluster.

5. The required secrets are created on Kubernetes from the generated keystores.

6. Deploys the helm charts with following releases:
    1. Release ‘elasticsearch-mcd’ consists of elasticsearch nodes with the master, coordinator, and data roles. 3 nodes by default.
    2. Release ‘elasticsearch-data’ consists of elasticsearch nodes with only data and coordinator roles. 1 node by default (autoscaled).
    3. Release ‘es-exporter’ is an elasticsearch metrics exporter for Prometheus.
    4. es-autoscaler-cron cron job in K8s which autoscales the es-data-nodes.

### Logstash Installation Guide

To deploy Logstash, follow these steps:

1. Create ls-resources-values.yaml File:
    
     ```
     #For Azure:
     cp example-azure-ls-resource-values.yaml ls-resource-values.yaml
     #For AWS:
     cp example-aws-ls-resource-values.yaml ls-resource-values.yaml
     ```

2. Create a file named `.logstash.env` under the `secrets` directory with the following values:
     ```
     RABBITMQ_VHOST=IUDX
     INDEX_PREFIX=iudx
     ```

3. Adjust resource limits and requests in `ls-resource-values.yaml` file as per your requirements.

4.  Run the following command to deploy Logstash:
     ```
     ./logstash-install.sh
     ```

- This script deploys the Helm chart with the release name 'logstash'.

### Kibana Installation Guide

To install Kibana on the Kubernetes (K8s) cluster, follow these steps:

1. Create kibana-resources-values.yaml File:
     
     ```
     #For Azure:
     cp example-azure-kibana-resource-values.yaml kibana-resource-values.yaml
     #For AWS:
     cp example-aws-kibana-resource-values.yaml kibana-resource-values.yaml
     ```

2. Adjust resource values and limits in the resource file (`kibana-resource-values.yaml`) as required.
3. Add Kibana hostname in the resource file.
4. Execute the following command to install Kibana:
     ```
     ./kibana-install.sh
     ```

   This script creates the required secrets on Kubernetes from the generated secrets and deploys the Helm chart with the release name 'kibana'.

- Kibana UI can be accessed from: `https://<kibana-hostname>`
- To check Helm release info, use the following command:
     ```
     helm list -n elastic
     ```
- To check if the ELK pods are deployed and running, use the following command:
     ```
     kubectl get pods -n elastic
     ```

For more detailed installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/elk#install-elk)**.


