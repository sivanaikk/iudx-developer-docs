---
sidebar_position: 10
---

### Prerequisites

The rs schema needs to be created using Flyway before deploying the auditing server. Refer to the PostgreSQL installation steps above.

### Installation

1. Navigate to the below directory:

    ```
    cd iudx-deployment/Docker-Swarm-deployment/single-node/auditing-server
    ```

2. Assign the node label if not assigned during swarm installation using:

    ```
    docker node update --label-add auditing-node=true <node_name>
    ```

3. Make a copy of the sample secrets directory by running the following command:

    ```
    cp -r example-secrets/secrets .
    ```

    1. Provide a correct config file for bringing up the auditing server. Substitute appropriate values using commands mentioned in config files.

    2. Configure the `secrets/.auditing.env` file with appropriate values in the placeholders '**< >**'.

4. Define appropriate values of resources 
   
   + CPU requests and limits
   + RAM requests and limits
   + PID limit 
   in `auditing-stack.resources.yaml` as shown in the sample file in **[example-auditing-stack.resources.yaml](https://github.com/datakaveri/iudx-deployment/blob/4.5.0/Docker-Swarm-deployment/single-node/auditing-server/example-auditing-stack.resources.yaml)**.

5. To install the auditing server stack, use the following command:

    ```
    cp example-auditing-stack.resources.yaml auditing-stack.resources.yaml

    docker stack deploy -c auditing-stack.yaml -c auditing-stack.resources.yaml auditing
    ```

### Notes

1. To check if the auditing server is deployed and running:` docker stack ps auditing `


2. For more information on installation instructions, refer **[here](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/Docker-Swarm-deployment/single-node/auditing-server#introduction)**.
3. For more information about the auditing-server, refer **[here](https://github.com/datakaveri/auditing-server)**.

