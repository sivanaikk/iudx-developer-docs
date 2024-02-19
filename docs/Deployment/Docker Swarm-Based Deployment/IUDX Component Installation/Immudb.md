---
sidebar_position: 2
---

<div style={{textAlign: 'center'}}>

![Architecture](../../../../resources/auth/immudb.png)<br/>

</div>



- Immudb is being used as an immutable database for storing the auditing and metering data.
- Deployed as a non-clustered single instance.
- Will be deployed using stack yaml files.

### Installation


1. Navigate to the below directory:
     
    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/immudb/
    ```

2. Assign the node label if not assigned during swarm installation using:
    ```
    docker node update --label-add immudb-node=true <node_name>
    ```

3. Make a copy of the sample secrets directory by running the following command:
    ```
    cp -r example-secrets/secrets .
    ```

4. Run the create-secrets script to automatically generate safe random passwords for the admin, auth, cat, and rs users in immudb using the following command:
    ```
    ./create-secrets.sh
    ```
    :::note
    Secrets are generated in the secrets/passwords directory for all users.
    :::
5. Define appropriate values of resources in immudb-stack.resources.yaml as shown in sample resource-values file **[example-immudb-stack.resources.yaml](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/Docker-Swarm-deployment/single-node/immudb/example-immudb-stack.resources.yaml)**

    - CPU requests and limits
    - RAM requests and limits
    - PID limit

   
6. Deploy Immudb stack as follows:
    ```
    cp example-immudb-stack.resources.yaml  immudb-stack.resources.yaml 
    
    docker stack deploy -c immudb-stack.yaml -c immudb-stack.resources.yaml immudb
    ```

7. Create users, schema required by api-servers:
   1. Bring up the config and basic schema generator stack(only on clean deployment)
   2. Steps:
        1. Deploy config-generator stack using:
            ```
            docker stack deploy -c immudb-config-generator.yaml tmp
            ```

        2. Monitor logs to ensure creation:
            ```
            docker service logs tmp_immudb_config_generator -f
            ```

        3. Remove stack after successfully creation:
            ```
            docker stack rm tmp
            ```

        4. Following users using the passwords present at files in `secrets/passwords/` directory are created by config-generator:

   | Username   | Password                   | Role/Access                               | Services                                                |
   |------------|----------------------------|-------------------------------------------|---------------------------------------------------------|
   | iudx_rs    | secrets/passwords/rs-password | Read Write access to iudxrs Database      | Used by resource server to audit to auditing table     |
   | iudx_cat   | secrets/passwords/cat-password | Read Write access to iudxcat database     | Used by catalogue server to audit to auditingtable table |
   | iudx_auth  | secrets/passwords/auth-password | Read Write access to iudxauth database   | Used by auth server to audit to table_auditing table   |
   | immudb     | secrets/passwords/admin-password | Superuser                                | Used to create dbs, set users and RBAC                    |


### Notes

1. To access immudb and perform database operations such as creating indexes and tables, an immudb client deployment is required.

2. Connect to immudb server using immuclient:
    1. Login to the immuclient container.
    2. In the container, change the directory path to `/app/immuclient`.

    3. Run the command, It will prompt for a password. Upon successful login, the immudb server can be accessed:
        ```
        login <user_name>
        ```

    4. Test commands:
        1. To use the created database, run**:
            ```
            use <database_name>
            ```
        2. To list tables, run:
            ```
            tables
            ```

3. To check if the immudb stacks are deployed and running, execute the command:
    ```
    docker stack ps immudb
    ```

4. For more detailed installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/Docker-Swarm-deployment/single-node/immudb#introduction)**.