---
sidebar_position: 12
---

### Prerequisite: 

1. Create a acl-apd trustee keycloak user
2.  Register trustee user against AAA server using cos admin credentials and get client id, and client secret of the trustee user to use in  acl adp config file
3. Flyway migration 

### Installation:

1. Navigate to the directory:

    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/acl-apd/
    ```

2. Assign the node label if not assigned during swarm installation:

    ```
    docker node update --label-add acl-apd-node=true <node_name>
    ```

3. Make a copy of the sample secrets directory by running the following command:

    ```
    cp -r example-secrets/secrets .
    ```
4. Secrets directory after generation of secret files

    ```
    secrets/
    ├── config.json
    └── .apd.env
    ```

5. Substitute appropriate values using commands mentioned in config files.

6. Define appropriate values of resources in `acl-apd-server-stack.resources.yaml` as shown in the sample file **[example-acl-apd-server-stack.resources.yaml](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/Docker-Swarm-deployment/single-node/acl-apd/example-acl-apd-stack.resources.yaml)**.

    - CPU requests and limits
    - RAM requests and limits
    - PID limit

   


7. To install GIS server stack, use the following command:

    ```
    cp example-acl-apd-stack.resources.yaml acl-apd-stack.resources.yaml
   
    docker stack deploy -c acl-apd-stack.yaml -c acl-apd-stack.resources.yaml acl-apd
    ```

### Notes

1. The upstream code for acl-apd server is available at **[here](https://github.com/datakaveri/iudx-acl-apd)**.
   
2. If you need to expose the HTTP ports or have custom stack configuration( see **[here](https://github.com/datakaveri/iudx-deployment/blob/master/Docker-Swarm-deployment/single-node/acl-apd/example-acl-apd-server-stack.resources.yaml)** for example configuration of 'acl-apd-stack.custom.yaml' file) and bring up like as follows.
    
    ```
    docker stack deploy -c acl-apd-stack.yaml -c acl-apd-stack.resources.yaml -c acl-apd-stack.custom.yaml acl-apd
    ```