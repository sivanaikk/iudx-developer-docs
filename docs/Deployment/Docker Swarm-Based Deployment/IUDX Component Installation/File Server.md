---
sidebar_position: 15
---

Will be deploying using swarm stack yaml files

### Installation

1. Navigate to the directory `iudx-deployment/Docker-Swarm-deployment/single-node/file-server/`:

    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/file-server/
    ```

2. Assign the node label if not assigned during swarm installation:

    ```
    docker node update --label-add file-server-node=true <node_name>
    ```

3. To generate the passwords:

    ```
    ./create-secrets.sh
    ```

4. Provide a correct config file for bringing up file-server. Substitute appropriate values using commands whatever mentioned in config files.

5. Configure the .file-server.env file, refer to example-env

6. Define Appropriate values of resources - 
    + CPU requests and limits, 
    + RAM requests and limits, 
    in `file-server-stack.resources.yml` as shown in the sample file **[example-file-server-stack.resources.yml](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/Docker-Swarm-deployment/single-node/file-server/example-file-server-stack.resources.yaml)**.

    
    ```
    cp example-file-server-stack.resources.yaml file-server-stack.resources.yaml

    docker stack deploy -c file-server-stack.yaml -c file-server-stack.resources.yaml file-server
    ```
### Notes

1. File-server api documentation can be accessed from **https://< file-server-domain >/apis**
2. To check if the file-server are deployed and running: `docker stack ps file-server`
3. For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/Docker-Swarm-deployment/single-node/file-server#install)**.
4. For more information about the file-server, refer **[here](https://github.com/datakaveri/iudx-file-server#iudx-file-server)**.
