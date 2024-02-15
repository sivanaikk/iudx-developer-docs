---
sidebar_position: 17
---
<div style={{textAlign: 'center'}}>

![Architecture](../../../../resources/auth/gis_server_overview.png)<br/>

</div>


+ The GIS interface is a resource server which defines the interactions between the consumers interested in GIS data and the upstream GIS Servers. The gis interface is IUDXs data discovery, data publication. It allows admins to publish their gis related info in accordance to the IUDX vocabulary annotated meta-data document. The consumers can access data from the gis interface using HTTPs.

+ Will be deploying using swarm stack yaml files.

### Installation

1. Navigate to the directory:

    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/gis/
    ```

2. Assign the node label if not assigned during swarm installation:

    ```
    docker node update --label-add gis-node=true <node_name>
    ```

3. Make a copy of the sample secrets directory by running the following command:

    ```
    cp -r example-secrets/secrets .
    ```

4. Provide a correct config file for bringing up GIS-server. Substitute appropriate values using commands mentioned in config files.

5. Configure the `.gis.env` file, referring to `example-env`.

6. Define appropriate values of resources:
    - CPU requests and limits
    - RAM requests and limits
    - PID limit

   in `gis-stack.resources.yml` as shown in the sample file **[example-gis-stack.resources.yaml](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/Docker-Swarm-deployment/single-node/gis/example-gis-stack.resources.yaml)**.


7. To install GIS server stack, use the following command:

   ```
   cp example-gis-stack.resources.yaml gis-stack.resources.yaml
   
   docker stack deploy -c gis-stack.yaml -c gis-stack.resources.yaml gis
   ```


### Notes

1. GIS api documentation can be accessed from **https://< gis-domain >/apis**
2. To check if the GIS are deployed and running: `docker stack ps gis`
3. For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/Docker-Swarm-deployment/single-node/gis#install)**.
4. For more information about the auth-server, refer **[here](https://github.com/datakaveri/iudx-gis-interface#iudx-gis-interface)**.
