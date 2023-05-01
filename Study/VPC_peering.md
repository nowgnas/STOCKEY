1. Install and configure the AWS CLI:
    - Download and install the AWS CLI for your operating system: **[https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)**
    - Configure the AWS CLI with your credentials, default region, and output format using the **`aws configure`** command.
2. Create an inter-region VPC peering connection:
    - Run the following command, replacing the placeholders with the appropriate values:

```bash
aws ec2 create-vpc-peering-connection --vpc-id [Requester VPC ID] --peer-vpc-id [Accepter VPC ID] --peer-region [Accepter VPC region] --peer-owner-id [Accepter AWS Account ID]

```

If successful, the command will return the VPC peering connection details, including its ID.

1. Accept the VPC peering connection request (if it's across different accounts):
    - Configure the AWS CLI with the accepter account credentials, if necessary.
    - Run the following command, replacing the placeholder with the VPC Peering Connection ID obtained in step 2:

```bash
aws ec2 accept-vpc-peering-connection --vpc-peering-connection-id [VPC Peering Connection ID]

```

1. Update the route tables:
    - For each VPC, run the following command to add a route to the route table, replacing the placeholders with the appropriate values:

```
cssCopy code
aws ec2 create-route --route-table-id [Route Table ID] --destination-cidr-block [Destination CIDR Block] --vpc-peering-connection-id [VPC Peering Connection ID]

```

1. Modify the security groups:
    - For each VPC, run the following command to add an inbound rule to the security group, replacing the placeholders with the appropriate values:

```
cssCopy code
aws ec2 authorize-security-group-ingress --group-id [Security Group ID] --protocol [Protocol] --port [Port Range] --cidr [Source CIDR Block]

```

For example, to allow all traffic between the VPCs, use **`--protocol all`** and set **`--cidr`** to the CIDR block of the peered VPC.

- For each VPC, run the following command to add an outbound rule to the security group, replacing the placeholders with the appropriate values:

```
cssCopy code
aws ec2 authorize-security-group-egress --group-id [Security Group ID] --protocol [Protocol] --port [Port Range] --cidr [Destination CIDR Block]

```

Again, to allow all traffic between the VPCs, use **`--protocol all`** and set **`--cidr`** to the CIDR block of the peered VPC.

After completing these steps, the instances in both VPCs across different regions will be able to communicate with each other using private IP addresses. Note that it's important to review and follow the principle of least privilege when configuring your security groups to minimize potential security risks.