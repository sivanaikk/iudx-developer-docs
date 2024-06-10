---
sidebar_position: 13
---

<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../../resources/auth/cat_overview.png)<br/>

</div></div>

+ The catalogue is IUDXs data discovery and dataset metadata publishing portal. It allows data providers to publish their data resources by making an IUDX vocabulary annotated meta-data document describing their datasource and affiliated terminologies. The datasources publish their data to the IUDX Resource Server. It allows consumers of such data to easily discover such resources by means of powerful queries and consume the data from Resource Servers in an automated and machine interpretable way.

+ Will be deploying using swarm stack YAML files.

### Prerequisite

Create a static COS cat index in Elasticsearch through Kibana.

1. Create a static cat index with the name as  `< cos-prefix >__cat` in Kibana by going to UI -> Dev tools using the following github 
       **[link](https://github.com/karthickp432001/iudx-developer-docs/blob/main/mapping/1.json)**.

2. Create a static cat index with name as  `< cos-prefix >__cat_domains` in  kibana  by going to  UI -> Dev tools using following github **[link](https://github.com/karthickp432001/iudx-developer-docs/blob/main/mapping/2.json)**:

3. Create a static cat index with name as  `< cos-prefix >__cat_instances` in  kibana  by going to  UI -> Dev tools using following github **[link](https://github.com/karthickp432001/iudx-developer-docs/blob/main/mapping/3.json)**:

4. Create a  dynamic index “cat-rating” in elasticsearch through kibana 
    1. Create Index Lifecycle policy (ILM) with name `ilm-cat-rating`, by going to kibana  UI -> index stack management .
        
       1. enable rollover
       2. maximum index size 10 gigabytes
       3. maximum age 1000 days

    2. Create Index template - with settings, ilm, mapping, with index-alias as “cat_rating" in kibana  UI -> Dev tools using following github **[link](https://github.com/karthickp432001/iudx-developer-docs/blob/main/mapping/4.json)**:
    
    3. Create a bootstrap index named `cat_rating-000001` in Kibana UI -> Dev Tools using following github **[link](https://github.com/karthickp432001/iudx-developer-docs/blob/main/mapping/5.json)**:

5. The rs schema created using flyway using following steps:
    1. 
    
        ```
        kubectl port-forward -n postgres svc/psql-postgresql-ha-pgpool 5432
        ```

    2. Port forward the pgpool (postgres proxy) on one terminalIn another terminal, 

        ```
        git clone -b 5.0.0 https://github.com/datakaveri/iudx-resource-server.git && cd iudx-resource-server/
        ```

    3. The flyway.conf must be updated with the required data. which will be as follows
        
        ```
        flyway.url=jdbc:postgresql://127.0.0.1:5432/iudx_rs
        flyway.user=postgres
        flyway.password=<value in secrets/passwords/postgresql-password>  
        flyway.schemas=public
        flyway.placeholders.authUser=iudx_rs_user
        ```

    4. After this, the info command can be run to test the config.
    
        ```
        mvn flyway:info -Dflyway.configFiles=flyway.conf
        ```

    5. Then, the migrate command can be run to set up the database.
    
        ```
        mvn flyway:migrate -Dflyway.configFiles=flyway.conf
        ```

### Installation

1. Navigate to the below directory:

    ```
    cd iudx-deployment/K8s-deployment/Charts/catalogue
    ```

2. Make a copy of the sample secrets directory by running the following command:

    ```
    cp -r example-secrets/secrets .
    ```

3. Provide a correct config file (`secrets/config.json`) for bringing up the catalogue-server. No need to define `secrets/profanity-config/config.json` and leave as is (don’t delete the file). Substitute appropriate values using commands mentioned in config files.

4. Configure the `secrets/.cat.env` file with appropriate values in the placeholders `<...>`.

5. Define Resource Values in resource-values.yaml as shown in sample resource-values file for **[aws](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/catalogue/example-aws-resource-values.yaml)** and **[azure](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/K8s-deployment/Charts/catalogue/example-azure-resource-values.yaml )**.

    ```
    #For Azure
    cp example-azure-resource-values.yaml resource-values.yaml
    #For AWS
    cp example-aws-resource-values.yaml resource-values.yaml
    ```
    Configure the following -
      - CPU of all catalogue-server verticles 
      - RAM of all catalogue-server verticles 
      - ingress.hostname
      - cert-manager issuer


6. To install catalogue-server on the k8s cluster, run the install script:
    ```
    ./install.sh
    ```

    This script will:
    - Create a namespace `cat` on K8s.
    - Create required ConfigMap and Secrets on K8s.
    - Deploy all catalogue-server vertices.

- To check Helm Release Info:
    ```
    helm list -n cat
    ```
- To check if the catalogue-server pods are deployed and running:
    ```
    kubectl get pods -n cat
    ```
- For more information on installation instructions, refer [here](link_to_documentation).
- For more information about the catalogue-server, refer [here](link_to_documentation).

<details>
<summary><div class="style">Testing</div></summary>

- Catalogue-server API documentation can be accessed from `https://<cos-domain>/cat/apis`.
- Check the logs of all pods in `cat` namespace, there should not be any error log. If it's there, please address as specified/indicated by the log:
    ```
    kubectl logs -f -n cat <cat-pod-name>
    ```

</details>
