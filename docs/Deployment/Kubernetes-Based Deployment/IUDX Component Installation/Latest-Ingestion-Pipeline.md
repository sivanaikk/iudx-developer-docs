---
sidebar_position: 9
---
<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/lip_server-arch.png)
</div></div>

+ The new latest ingestion pipeline is designed to ingest data asynchronously into Redis Database. This pipeline would enable the IUDX Resource Server to serve latest data for IUDX specified resources that are available in the Database.

+ Will be deploying using swarm stack yaml files.


### Installation:

1. Navigate to the below directory:
    ```
    cd iudx-deployment/K8s-deployment/Charts/latest-ingestion-pipeline
    ```

2. Make a copy of the sample secrets directory by running the following command:
    ```
    cp -r example-secrets/secrets .
    ```

3. Substitute appropriate values using commands whatever mentioned in config files. Configure the `secrets/.lip.env` file with appropriate values in the place holders `<...>`.

4. copy the example resource values YAML file to resource-values.yaml.

    ```
    #For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    #For AWS
    cp example-aws-resource-values.yaml resource-values.yaml

    ```

5. Defining Appropriate values of resources in `resource-values.yaml` as shown in sample resource-values file for **[aws](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/latest-ingestion-pipeline/example-aws-resource-values.yaml)** and **[azure](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/latest-ingestion-pipeline/example-azure-resource-values.yaml)**

    - CPU of all latest-ingestion-pipeline verticles
    - RAM of all latest-ingestion-pipeline verticles 


6. To install latest-ingestion-pipeline on the k8s cluster, run the install script using the following command:
    ```
    ./install.sh
    ```
    This script will create the follwing :

    - Create a namespace `lip` on K8s.
    - Create required ConfigMap and Secrets on K8s.
    - Deploy all latest-ingestion-pipeline vertices.


- To check Helm release info:
    ```
    helm list -n lip
    ```
- To check if the latest-ingestion-pipeline pods are deployed and running:
    ```
    kubectl get pods -n lip
    ```
- For more detailed installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/latest-ingestion-pipeline#introduction)**.
- For more information about the latest-ingestion-pipeline, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/Charts/latest-ingestion-pipeline#introduction)**.


### Tests
1. RMQ-LIP Pipeline Test

    a. Test the publishing of messages to exchange and routing to queue through a Python script

       1. Create Python Virtual Environment
          ```
          # Create venv
          python3 -m venv /home/iudx/.venv/iudx-tests

          # Activate venv
          source /home/iudx/.venv/iudx-tests/bin/activate
          ```

       2. Install All Necessary Packages from `requirements.txt`
          ```
          pip install -r requirements.txt
          ```

       3. Configure Test Exchanges as Follows

          | VHOST | Exchange Name | Type of Exchange |
          |-------|---------------|------------------|
          | IUDX  | test-itms      | topic            |

       4. Configure Exchange-Queue Binding as Follows

          | VHOST | Exchange   | Queue     | Routing   |
          |-------|------------|-----------|-----------|
          | IUDX  | test-itms  | database  | key       |
          | IUDX  | test-itms  | redis-latest | key     |

       5. Configure Parameters in the Python Script:
          
          ```
            # admin username
            username = ''
            # admin password
            password = ''
            # Public domain RMQ domain name
            host = ''
            # Public AMQPS port
            port = 
          ``` 

       6. Run the Python Scripts

       7. Refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/Charts/databroker/tests)**    for more information.

    b. Test if the Messages have Reached the Redis
       
       1. Exec into redis container
           ```
            kubectl exec -it -n redis redis-redis-cluster-0 bash
           ```

       2. Login to redis server through redis-cli
           ```
            redis-cli -a `cat $REDIS_PASSWORD_FILE` -h localhost -c
           ```

       3. See if that packet has come to Redis  
           ```
           # get packets 
           json.get test_itms
           ```

    c. There are no error logs at latest ingestion pipeline pods  during the publication..
    
    
1. Check the logs of all pods in lip namespace, there should not be any error log. If it's there , please do necessary as specified/indicated by the log.

    ```
    kubectl logs -f -n lip <lip-pod-name>
    ```