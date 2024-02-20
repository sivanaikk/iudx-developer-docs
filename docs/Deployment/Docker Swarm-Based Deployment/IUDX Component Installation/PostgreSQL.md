---
sidebar_position: 4
---

<div style={{textAlign: 'center'}}>

![Architecture](../../../resources/auth/postgress-arch.png)
</div>

- PostgreSQL is being used as a credentials and policy data store.
- Will be deploying using swarm stack yaml files

### Installation

1. Navigate to the directory:

    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/postgres/
    ```

2. Assign the node label if not assigned during swarm installation using:

    ```
    docker node update --label-add postgres-db-node=true <node_name>
    ```

3. To generate the passwords:

    ```
    ./create-secrets.sh
    ```

    **Secrets directory after generation of passwords:**

    ```
    secrets/
    └── passwords
        ├── postgres-auth-password
        ├── postgres-keycloak-password
        ├── postgresql-password
        └── postgres-rs-password
    ```

4. Define appropriate values of resources in `postgres-stack.resources.yml` as shown in the sample file **[example-postgres-stack.resources.yml](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/Docker-Swarm-deployment/single-node/postgres/example-postgres-stack.resources.yaml)**.

    + CPU requests and limits
    + RAM requests and limits
    + PID limit
    

5. Deploy PostgreSQL stack as follows:

    ```
    cp example-postgres-stack.resources.yaml postgres-stack.resources.yaml

    cp example-postgres-stack.custom.yaml postgres-stack.custom.yaml

    docker stack deploy -c postgres-stack.yaml -c postgres-stack.resources.yaml -c postgres-stack.custom.yaml postgres
    ```


6. The RS and Auth schema is created using the Flyway tool. Follow the steps below:

    1. Bind/publish/expose the PostgreSQL port `5432` to the host VM temporarily.

    2. Clone the iudx-aaa-server repository and perform the following commands:

        ```
        git clone -b 5.0.0 https://github.com/datakaveri/iudx-aaa-server.git && cd iudx-aaa-server
        ```
            
        1. Update `flyway.conf` with the required data as follows:
        
            ```
            flyway.url=jdbc:postgresql://127.0.0.1:5432/postgres
            flyway.user=postgres
            flyway.password=<value in secrets/passwords/postgresql-password>
            flyway.schemas=aaa
            flyway.placeholders.authUser=iudx_auth_user
            ```

        2. Run the info command to test the configuration. Then, run the migrate command to set up the database:

        <div class="txt_color">
        Prerequisite :
        </div>
        
        **[Download](https://maven.apache.org/download.cgi)** and **[Install](https://maven.apache.org/install.html)** Maven.

        ```
        mvn flyway:info -Dflyway.configFiles=flyway.conf
        mvn flyway:migrate -Dflyway.configFiles=flyway.conf
        ```

    Refer **[here](https://github.com/datakaveri/iudx-aaa-server#flyway-database-setup)** for more information.

7. Similarly, do the same for the resource server:

    ```
    git clone -b 5.0.0 https://github.com/datakaveri/iudx-resource-server.git && cd iudx-resource-server
    ```

    1. Update `flyway.conf` for the resource server:

        ```
        flyway.url=jdbc:postgresql://127.0.0.1:5432/iudx_rs
        flyway.user=postgres
        flyway.password=<value in secrets/passwords/postgresql-password>
        flyway.schemas=public
        flyway.placeholders.rsUser=iudx_rs_user
        flyway.cleanDisabled=true
        flyway.baselineOnMigrate=false
        ```

    2. Run the info command and then the migrate command to set up the database:

        ```
        mvn flyway:info -Dflyway.configFiles=flyway.conf
        mvn flyway:migrate -Dflyway.configFiles=flyway.conf
        ```


8. Login to PostgreSQL:

    1. Exec into the container:

        ```
        docker exec -it <postgres-container> bash
        ```

    2. Login to PostgreSQL:

        ```
        PGPASSWORD=`cat secrets/passwords/postgresql-password` psql -U postgres -h localhost
        ```

8. Test if required dbs (iudx_rs, iudx_keycloak, postgres) and users (postgres, iudx_keycloak_user, iudx_rs_user, iudx_auth_user) exists

    1. List the number of databases:

        ```
        # to list the number of dbs
        \l
        ```

    <div style={{textAlign: 'center'}}>

    ![Architecture](../../../../resources/auth/ls.png)<br/>
    
    </div>

    
    2. List the number of users:

        ```
        # to list the number of users
        \du
        ```

    <div style={{textAlign: 'center'}}>

    ![Architecture](../../../../resources/auth/user_ls.png)<br/>
    
    </div>
9. Redploy stack without exposing `5432` port:
    ```
    docker stack rm postgres

    docker stack deploy -c postgres-stack.yaml -c postgres-stack.resources.yaml postgres
    ```

### Notes

1. To check if the PostgreSQL stacks are deployed and running, use the following command:

    ```
    docker stack ps postgres
    ```
2. Following users using the passwords present at secrets/passwords/ directory and dbs are created accordingly

| Username           | Password                                       | Role/Access                                                 | Services                |
|--------------------|------------------------------------------------|-------------------------------------------------------------|-------------------------|
| iudx_rs_user       | `secrets/passwords/postgres-rs-password`      | SELECT, INSERT, DELETE, UPDATE on tables of iudx_rs Database | Used by resource server  |
| iudx_keycloak_user | `secrets/passwords/postgres-keycloak-password` | Owner of iudx_keycloak database                              | Used by Keycloak server  |
| iudx_auth_user     | `secrets/passwords/postgres-auth-password`    | Access given while setting up auth server                   | Used by auth server      |
| postgres           | `secrets/passwords/postgresql-password`       | Superuser                                                    | Used to set users and RBAC|


For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/Docker-Swarm-deployment/single-node/postgres#introduction)**.