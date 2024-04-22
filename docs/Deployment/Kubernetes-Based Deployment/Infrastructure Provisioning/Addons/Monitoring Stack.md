---
sidebar_position: 6
---

1. Navigate to the directory **[iudx-deployment/K8s-deployment/K8s-cluster/addons/mon-stack](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/K8s-cluster/addons/mon-stack)**
    ```
    cd iudx-deployment/K8s-deployment/K8s-cluster/addons/mon-stack
    ```
2. Make a copy of sample secrets directory.
     ```
     cp -r example-secrets/secrets .
     ```
3. Run the `create_secrets.sh` script to generate the admin username and password under `secrets` directory
    ```
    ./create_secrets.sh
    ```

#### Setup telegram bot for grafana alerting 

1. Config Telegrambot for grafana's alerts is detailed **[here](https://gist.github.com/abhi4578/50478502ccd257a28d2c441ac51a8d65)**. Then appropriately define the environment variables in   `secrets/grafana-env-secret` file. The template is defined as follow:
    ```
    GF_SERVER_ROOT_URL=https://<grafana-domain-name>/
    GF_SERVER_DOMAIN=<grafana-domain-name>
    TELEGRAM_CHAT_ID=<telegram-chat-id>
    TELEGRAM_BOT_TOKEN=<telegram-chat-token>
    ```
2. Define appropriate values for below resources in resource-values.yaml for **[grafana](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/K8s-cluster/addons/mon-stack/grafana)** **[loki](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/K8s-cluster/addons/mon-stack/loki)** **[prometheus](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/K8s-cluster/addons/mon-stack/prometheus)** **[promtail](https://github.com/datakaveri/iudx-deployment/tree/4.5.0/K8s-deployment/K8s-cluster/addons/mon-stack/promtail)** in respevtive directories
    * CPU of requests and limits
    * RAM of requests and limits
    * nodeSelector
    * Storage class name    
    * cert-manager issuer and ingress hostname 
3. Run the install.sh script. This will install the whole mon-stack (`prometheus`, `grafana`, `loki`, and `promtail`)
    ```
    ./install.sh   
    ```

To check the status of helm 
```
helm ls -n mon-stack
```
To check the status of pods:
```
kubectl get pods -n mon-stack
```
