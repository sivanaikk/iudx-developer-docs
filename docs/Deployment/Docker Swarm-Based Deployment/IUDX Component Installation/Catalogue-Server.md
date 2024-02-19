---
sidebar_position: 13
---

<div style={{textAlign: 'center'}}>

![Architecture](../../../../resources/auth/cat_overview.png)<br/>

</div>

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
    iudx-deployment/Docker-Swarm-deployment/single-node/catalogue/
    ```
2. Assign the node label if not assigned during swarm installation using:

    ```
    docker node update --label-add cat-node=true <node_name>
    ```

3. Make a copy of the sample secrets directory by running the following command: ‘cp -r example-secrets/secrets .’
    ```
    cp -r example-secrets/secrets .
    ```

4. Provide a correct config file for bringing up catalogue-server. Substitute appropriate values using commands whatever mentioned in config files.

5. Configure the .cat.env file, refer to example-env

6. Define appropriate values of resources in `cat-stack.resources.yml` as shown in the sample file **[example-cat-stack.resources.yml](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/Docker-Swarm-deployment/single-node/catalogue/example-cat-stack.resources.yaml)**.

    + CPU requests and limits
    + RAM requests and limits
    + PID limit
    

7. To install catalogue server stack, use the following command:

    ```
    cp example-cat-stack.resources.yaml cat-stack.resources.yaml
    docker stack deploy -c cat-stack.yaml -c cat-stack.resources.yaml cat
    ```

### Notes

1. cat-server api documentation can be accessed from **https://< cop-domain >/cat/apis**.
2. To check if the cat-server are deployed and running: `docker stack ps cat`
3. For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/Docker-Swarm-deployment/single-node/catalogue)**.
4. For more information about the catalogue-server, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/Docker-Swarm-deployment/single-node/catalogue).**
