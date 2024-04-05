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


### Disclaimer
Due to low nginx rate limits, Kibana dashboard might display the following error: “Elastic did not load properly. Check the server output for more information.” If encountered, please reload the page 2-3 times for Kibana to become available.

### Configuring Elasticsearch Snapshot Life Cycle Management (SLM)

**Configure SLM with Azure Blob Storage**

1. Login to Kibana using admin credentials.

2. Navigate to `Stack Management -> Snapshot and Restore -> Repositories`.

3. Register a new repository:
    1. Add Repository Name.
    2. Set Repository Type to `Azure`.
    3. Click `Next`.
    4. Add Azure storage container name.
    5. Enable `Compress snapshots`.
    6. Keep the rest as defaults.
    7. Click `Register the repository`.

4. Once registered, click on that repository -> verify repository.

5. After successful registration and verification of snapshot repository. Create a snapshot lifecycle policy (SLM
    1. Click on `Create SLM policy`.
    2. Define an appropriate policy name.
    3. Define an appropriate snapshot name: `<esds-hourly-backup-{now/d}>`.
    4. Add the previously defined snapshot repository.
    5. Add cron expression for frequency at which to take the snapshots. Currently its
        ```
        0 0 * * * ?
        ```
    6. Data indices to backup, the expression is follows
        ```
        * 
        -.*  
        -ilm-history-*
        ```
    7. Include global state
    8. Snapshot Retention
        1. Deletes after : 30 days
        2. Minimum count: 720
        3. Maximum count: 744

6. Please refer **[official elastic docs](https://www.elastic.co/guide/en/cloud/current/ec-azure-snapshotting.html)** 


### Configure SLM with S3 bucket

1. Login to Kibana using admin credentials.

2. Navigate to `Stack Management -> Snapshot and Restore -> Repositories`.

3. Register a new repository:
    1. Add Repository Name.
    2. Set Repository Type to `AWS S3`.
    3. Click `Next`.
    4. Add AWS S3 Storage.
    5. Enable server-side encryption.
    6. Enable `Compress snapshots`.
    7. Keep the rest as defaults.
    8. Click `Register the repository`.

4. Once registered, click on that repository -> verify repository.

5. After successful registration and verification of the snapshot repository. Create a snapshot lifecycle policy (SLM):
    1. Click on `Create SLM policy`.
    2. Define an appropriate policy name.
    3. Define an appropriate snapshot name: `<esds-hourly-backup-{now/d}>`.
    4. Add the previously defined snapshot repository.
    5. Add a cron expression for the frequency at which to take the snapshots. Currently it's:
        ```
        0 0 * * * ?
        ```
    6. Data indices to backup, the expression is as follows:
        ```
        * 
        -.*  
        -ilm-history-*
        ```
    7. Include global state.
    8. Snapshot Retention:
        1. Deletes after: 30 days.
        2. Minimum count: 720.
        3. Maximum count: 744.

6. Please refer **[official elastic docs](https://www.elastic.co/guide/en/cloud/current/ec-s3-snapshotting.html)** for detailed instructions.

### Tests

1. Create a Test Index
   1. Create a test index called `iudx__test-itms`. Refer [here](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/K8s-deployment/Charts/elk/tests/create-index.txt) for the command.

2. RMQ-ELK Pipeline Test

    1. Test the publishing of messages to exchange and routing to queue through a Python script

       1. Create Python Virtual Environment
          ```
          # Create venv
          python3 -m venv ~/.venv/iudx-tests

          # Go into venv
          source ~/.venv/iudx-tests/bin/activate
          ```

       2. Install All Necessary Packages from `requirements.txt`
          ```
          pip install -r requirements.txt
          ```

       3. Configure Test Exchanges

          | VHOST | Exchange Name | Type of Exchange |
          |-------|---------------|------------------|
          | IUDX  | test-itms      | topic            |

       4. Configure Exchange-Queue Binding:

          | VHOST | Exchange   | Queue     | Routing   |
          |-------|------------|-----------|-----------|
          | IUDX  | test-itms  | database  | key       |
          | IUDX  | test-itms  | redis-latest | key     |

       5. Configure Parameters in the Python Script:
          ```
          username = ''
          password = ''
          host = ''
          # public AMQPS port 
          port = 
          ```

       6. Run the Python Scripts

       7. Refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/Charts/databroker/tests)** for more information.

    b. Test if the Messages have Reached Elasticsearch
       1. Use the count command in Kibana console->Management-> dev tools. The count should match the number of messages published.
         ```sql
         GET iudx__test-itms/_count
         ```

    c. Check for No Error Logs at Logstash during the Publication.
