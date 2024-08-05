# aws-demo-app
This app will be used to demo skills with React/Next.js and Node.js and AWS resources like Lambdas, EC2, and Dynamo DB

# Architecture
1. A React app built with Next.js hosted on an EC2 instance with PM2 + nginx
2. A Node.js + Lambda backend
3. Most likely a DynamoDB database for simplicity
4. Resources will be managed using Cloudformation or Terraform
5. CI/CD will be setup if I have time

# Table structure 

### Users Table
| userId | name      | email                  | role     |
|--------|-----------|------------------------|----------|
| 123    | John Doe  | john.doe@example.com   | patient  |
| 456    | Dr. Smith | dr.smith@example.com   | provider |

### HealthMetrics Table
| userId | timestamp            | metricType     | value   |
|--------|----------------------|----------------|---------|
| 123    | 2024-08-01T08:00:00Z | blood_pressure | 120/80  |
| 123    | 2024-08-01T08:00:00Z | glucose_level  | 90      |

### Appointments Table
| appointmentId | patientId | providerId | scheduledTime         | status     |
|---------------|-----------|------------|-----------------------|------------|
| a1            | 123       | 456        | 2024-08-05T10:00:00Z  | scheduled  |

### Notifications Table
| notificationId | userId | message                              | sentTime              | status |
|----------------|--------|--------------------------------------|-----------------------|--------|
| n1             | 123    | Reminder: Your appointment tomorrow. | 2024-08-04T08:00:00Z  | sent   |


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
3. Set up demo CRUD lambdas for the users table
4. Set up an API gateway to route traffic to the lambdas
5. configured cloudflare to route traffic from api.mikahpinegar.com to the api gateway

# Runbook
1. In order to update an s3 bucket using aws cli, an iam role needed to be created and the secret copied into `aws configure`
2. SSH key pair has to be made manually either in the console or locally and uploaded to the console, then referenced in the CFTs. Creating using the CFTs doesn't download the private key for some reason
3. The back_end folder needs all of it's contents zipped without a top level director. I had to update `npm run package` to the following `powershell Compress-Archive -Update -Path .\\* -DestinationPath lambda-code.zip`
4. I can't create the lambdas and the s3 in the same CFT because the lambdas require a zipped code file to be present to build properly. Thus the s3_resources.yaml file must be created first
5. after setting up the api gateway I was getting 500 internal server errors. manually invoking the api in the api gateway console showed that the gateway didn't have permissions to invoke the lambdas. adding a `AWS::Lambda::Permission` to the CFT resolved this
6. no cloudwatch logs -> added ManagedPolicyArns to the iam role for the lambdas
7. lambdas not updating -> configure the script to actually update all of your lambdas and not just one!
