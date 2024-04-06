---
sidebar_position: 20
---

### Installation

1. Navigate to the below directory:
    ```
    cd iudx-deployment/K8s-deployment/adv-monstack
    ```
2. Make a copy of the sample secrets directory:
    ```
    cp -r example-secrets/secrets .
    ```
3. Substitute appropriate values using commands mentioned in config files in the `secrets` directory.

    Secrets directory after generation of secret files:
    ```
    secrets/
    └── adv-mon-stack-conf.json
    ```

4. Define Appropriate `nodeSelector` value in the **[adv-monstack.yaml](https://github.com/datakaveri/iudx-deployment/tree/5.0.0/K8s-deployment/K8s-cluster/addons/adv-monstack/adv-monstack.yaml)**.
5. Deploy Advanced Monitoring Stack:
    ```
    ./install.sh
    ```

