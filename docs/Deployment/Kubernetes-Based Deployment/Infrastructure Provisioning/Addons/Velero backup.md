---
sidebar_position: 3
---

:::note Prerequisites
* Access to a Kubernetes cluster, v1.12 or later, with DNS and container networking enabled.
* kubectl installed locally.
* AWS S3 bucket created and a dedicated user with only access to that bucket with programmatic access. 
:::

### Install and Start Velero

1. Download and Install **[Velero](https://github.com/vmware-tanzu/velero/releases)** v1.10.x cli locally
2. Set up velero on AWS **[here](https://github.com/datakaveri/iudx-deployment/tree/master/K8s-deployment/K8s-cluster/addons/velero/aws)**
3. Create a Velero-specific credentials file (credentials-velero) in your local directory with the following content
    ```
    [default]
    aws_access_key_id=<AWS_ACCESS_KEY_ID>
    aws_secret_access_key=<AWS_SECRET_ACCESS_KEY>
    ```

where the access key id and secret are the values returned from the `create-access-key` request from step 2.

4. Deploy Velero in the cluster and start the deployment. This will create a namespace called `velero`, and place a deployment named `velero` in it.
    ```
    velero install \
	--provider aws \
	--plugins velero/velero-plugin-for-aws:v1.9.0 \
	--bucket $BUCKET \
	--backup-location-config region=$REGION \
	--snapshot-location-config region=$REGION \
	--secret-file ./credentials-velero
    ```
Replace placeholders (BUCKET and REGION) with appropriate values 

5. Check the status of pods 
    ```
    kubectl get pods -n velero
    ```

### Backup and Restore using Velero
:::note Disclaimer
Create scheduled backups only after the whole IUDX deployment is done 
:::

#### Create Backups
1. To create backup
    ```
    velero backup create <backup-name> --include-resources=pvc,pv --selector <resource-label>
    ```
2. To list created backups
    ```
     velero backup get
     ```
3. To create scheduled backups  
    * To create a backup every 6 hours with 24 hour retention period
        ```
        velero schedule create <schedule-name> --schedule "0 */6 * * *" --include-resources=pvc,pv --selector <app-label> --ttl 24h
        ```
    * To create daily backups with 30 days of retention period (Takes a backup at 3am daily.)
        ```
        velero schedule create <schedule-name> --schedule "0 3 * * *" --include-resources=pvc,pv --selector <app-label>
        ```
    This creates a backup object with the name `<schedule-name>-<TIMESTAMP>`

:::note
Having 6 hour and daily backups together can cause a `SnapshotCreationPerVolumeRateExceeded` error. So to avoid it, make sure they are scheduled with a healthy time interval between them.
:::

#### Restore Backups
To restore backup
    
```
velero restore create <RESTORE_NAME> --from-backup <BACKUP_NAME> 
```

