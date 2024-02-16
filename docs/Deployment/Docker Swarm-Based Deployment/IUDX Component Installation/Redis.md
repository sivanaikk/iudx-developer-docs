---
sidebar_position: 5
---


![Architecture](../../../resources/auth/Redis-arch.png)
Redis is used as the latest-data store and will be deployed using Swarm stack YAML files.

### Installation

1. Navigate to the below directory:

    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/redis/
    ```

2. Assign the node label if not assigned during Swarm installation:

    ```
    docker node update --label-add redis-node=true <node_name>
    ```

3. Generate passwords:

    ```
    ./create-secrets.sh
    ```

    Secrets directory after generation of passwords:

    ```
    secrets/
    └── passwords
        └── admin-password
    ```

4. Define Appropriate values of resources (CPU requests and limits, RAM requests and limits, PID limit) in `redis-rejson-stack.resources.yml` as shown in the sample file `example-redis-rejson-stack.resources.yml`.

5. Deploy Redis stack:

    ```
    cp example-redis-rejson-stack.resources.yaml redis-rejson-stack.resources.yaml

    docker stack deploy -c redis-rejson-stack.yaml -c redis-rejson-stack.resources.yaml redis
    ```

### Tests

1. Login and Execute Commands in Redis

    1. Exec into the Redis container:

        ```
        docker exec -it <redis-container> bash
        ```

    2. Login to Redis:

        ```
        redis-cli -a `cat $REDIS_PASSWORD_FILE`
        ```
    3. Execute commands
    
       1. To list down all keys:

        ```
        keys *
        ```
       2. To list down the access control lists (ACL):

        ```
        acl list
        ```


### Notes

1. To check if the redis stacks are deployed and running: `docker stack ps redis`
    
2. The docker image 'ghcr.io/datakaveri/redis-rejson' is tagged in accordance with this format: `<redis-version>:<rejson-version>`.

3. The following users, along with their respective passwords, roles/access, and services, are created using the passwords present at files in the `secrets/passwords/` directory:

| Username | Password                        | Role/Access                        | Services                              |
|----------|---------------------------------|-----------------------------------|---------------------------------------|
| default  | secrets/passwords/admin-password | Superuser                         | Used by Resource Server and Latest ingestion pipeline |

For more detailed installation instructions, please refer to the documentation **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/Docker-Swarm-deployment/single-node/redis#introduction).**


