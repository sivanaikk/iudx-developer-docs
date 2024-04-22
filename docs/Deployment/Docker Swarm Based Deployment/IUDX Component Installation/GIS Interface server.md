---
sidebar_position: 18
---

<div class="img_background">
<div style={{textAlign: 'center'}}>

![Architecture](../../../../resources/auth/gis_server_overview.png)<br/>

</div></div>
The GIS interface is a resource server which defines the interactions between the consumers interested in GIS data and the upstream GIS Servers. The gis interface is IUDXs data discovery, data publication. It allows admins to publish their gis related info in accordance to the IUDX vocabulary annotated meta-data document. The consumers can access data from the gis interface using HTTPs.

### Installation 

1. Navigate to the directory:

    ```bash
    cd iudx-deployment/Docker-Swarm-deployment/single-node/gis/
    ```
2. The gis container is constrained to run on specifc node by adding node labels to only one of the nodes, refer [here](https://docs.docker.com/engine/swarm/services/#placement-constraints) for more info. This ensures the container is placed always to same node on restart.

    ```sh
    docker node update --label-add gis-node=true <node_name>
    ```

3. Make a copy of sample secrets directory.

    ```console
    cp -r example-secrets/secrets .
    ```
    
    1. Substitute appropriate values using commands mentioned in config files.
    
    2. Configure the secrets/.gis-api.env file with appropriate values in the place holders `<>`
    
    3. Secrets directory after generation of secret files
    ```sh
    secrets/
    ├── config.json
    └── .gis-api.env


4. Define Appropriate values of resources -

    - CPU 
    - RAM 
    - PID limit
    in `gis-stack.resources.yaml` as shown in sample resource-values file for [here](example-gis-stack.resources.yaml)

5. Deploy GIS interface server:

    ```sh
    docker stack deploy -c gis-stack.yaml -c gis-stack.resources.yaml gis
    ```

### Tests

The apis documentation will be available at `https://<gis-server-domain-name>/apis`

# Notes

1. The upstream code for gis server is available at https://github.com/datakaveri/iudx-gis-interface.
2. If you need to expose the HTTP ports or have custom stack configuration( see [here](example-gis-stack.custom.yaml) for example configuration of 'gis-stack.custom.yaml' file)  and bring up like as follows.
```sh
docker stack deploy -c gis-stack.yaml -c gis-stack.resources.yaml -c gis-stack.custom.yaml gis
```
