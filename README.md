# aws-demo-app
This app will be used to demo skills with React/Next.js and Node.js and AWS resources like Lambdas, EC2, and Dynamo DB

# Architecture
1. A React app built with Next.js hosted on an EC2 instance with PM2 + nginx
2. A Node.js + Lambda backend
3. Most likely a DynamoDB database for simplicity
4. Resources will be managed using Cloudformation or Terraform
5. CI/CD will be setup if I have time

# Notes
1. In order to update an s3 bucket using aws cli, an iam role needed to be created and the secret copied into aws configure

# Progress
1. Created the following resources using Cloudformation templates
- VPC
- Subnet
- Internet gateway
- Route table
- Security group
- EC2 Instance
- s3 bucket for storing lambda code
- s3 bucket policy to allow access for lambda
- several dynamo db tables
- iam role for lambda to access dynamo db tables
- lambda for interacting with dynamo db tables
2. Set up demo next.js app on ec2 instance, configured pm2 to handle running the next app, and configured nginx to route http traffic to the app
3. Set up a demo lambda
