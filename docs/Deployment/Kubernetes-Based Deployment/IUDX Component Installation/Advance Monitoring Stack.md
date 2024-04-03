---
sidebar_position: 18
---

Docker swarm stack for advance monitoring stack.

### Installation

1. Navigate to the directory:

    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/adv-mon-stack/
    ```
2. Assign the node label if not assigned during swarm installation:

    ```
    docker node update --label-add monitoring_node=true <node_name>
    ```
3. Make a copy of the sample secrets directory by running the following command:

    ```
    cp -r example-secrets/secrets .
    ```
    Substitute appropriate values using commands whatever mentioned in config files.

4. Secrets directory after generation of secret files

    ```
    secrets/
    └── adv-mon-stack-conf.json
    ```
5. Substitute appropriate values using commands mentioned in config files.

6. Define appropriate values of resources in `ams-stack.resources.yaml` as shown in the sample file **[example-ams-stack.resources.yaml](https://github.com/datakaveri/iudx-deployment/blob/5.0.0/Docker-Swarm-deployment/single-node/adv-mon-stack/example-ams-stack.resources.yaml)**
    
    - CPU requests and limits
    - RAM requests and limits
    - PID limit
    


7. To install GIS server stack, use the following command:

   ```
   cp example-ams-stack.resources.yaml gis-ams.resources.yaml
   
   docker stack deploy -c ams-stack.yaml -c ams-stack.resources.yaml asm
   ```

### Notes

1. If you need to expose the HTTP ports or have custom stack configuration( see **[here](https://github.com/datakaveri/iudx-deployment/blob/master/Docker-Swarm-deployment/single-node/adv-mon-stack/example-ams-stack.custom.yaml)** for example configuration of 'ams-stack.custom.yaml' file) and bring up like as follows.
    ```
    docker stack deploy -c ams-stack.yaml -c ams-stack.resources.yaml -c ams-stack.custom.yaml ams
    ```
