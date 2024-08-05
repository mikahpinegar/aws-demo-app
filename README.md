# aws-demo-app
This app will be used to demo skills with React/Next.js front end with Node.js + AWS backend with resources like Lambdas, EC2, and Dynamo DB

# Architecture
1. A React app built with Next.js hosted on an EC2 instance with PM2 + nginx
2. A Node.js + Lambda backend
3. An API gateway to handle routing API calls to Lambdas
4. DynamoDB database for simplicity
5. Resources will be managed using Cloudformation
6. CI/CD will be setup if I have time (I did not)

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
- s3 bucket policy to allow lambdas access
- Several dynamo db tables
- IAM role for lambda to access dynamo db tables, allow invocation by the API gateway, and access to cloudwatch
- Several Lambdas for interacting with the dynamo db tables. I ran out of time and only got to use one table (Users)
- An API Gateway with several resources and methods
2. Set up a demo next.js app for interacting with the Users table on an ec2 instance, configured pm2 to handle running the next app
3. Set up demo CRUD lambdas for the users table
4. Set up an API gateway to route traffic to the lambdas
5. A custom domain hosted in cloudflare (mikahpinegar.com) that forwards to the API gateway using a cname. api.mikahpinegar.com -> API Gateway
6. Set up nginx to handle routing mikahpinegar.com to the EC2 instance running the front end. Configured full strict SSL in cloudflare and copied over the origin SSL cert to the EC2 instance

# Things I was planning on doing but didn't have time for
1. Setting up CI/CD for deploying my lambdas on commit to main
2. Setting up CI/CD for deploying my front end to EC2 on commit to main
3. More code cleanup, logging, linting, and testing of the back end
4. More code cleanup, linting, and testing of the front end
5. Utilizing all of the tables I created. I wanted to make a portal for creating users, entering in health metrics (like weight, blood pressure, etc), and scheduling appointments. That was a bit of a lofty goal to get done in a weekend. I would need a few more days to complete the whole vision. This would involve several steps
- Writing CRUD lambdas for the other tables
- Updating CFTs to crate new lambdas and handle API Gateway routing
- Update front end to handle creating users, entering metrics, and making appointments


# Runbook
**Symptom** Can't update s3 buckt from the CLI
**Solution** Create iam role with the needed privs and copy the secret into the cli using `aws configure`

**Symptom** Can't access SSH private key after creating using cloudformation
**Solution** Cloudformation won't allow you to output a private key. Make or import it manually in the AWS console and then reference it in the CFT

**Symptom** Script for zipping lambdas folder is adding an extra top level directory
**Solution** Update `npm run package` to the following: `powershell Compress-Archive -Update -Path .\\* -DestinationPath lambda-code.zip`

**Symptom** Can't create lambdas and s3 bucket in the same CFT because the s3 bucket doesn't have the zipped lambda code
**Solution** Create s3_resources.yaml, build it first, and upload zipped lambda code before running backend_resources.yaml

**Symptom** API Gateway is returning status code 500, logs show it doens't have permissions to invoke lambdas
**Solution** Add a `AWS::Lambda::Permission` to the CFT that gives the API Gateway permissions to invoke each lambda

**Symptom** No cloudwatch logs are present for lambdas
**Solution** Add ManagedPolicyArns to the IAM role for the lambdas

**Symptom** Lambdas not updating via your script
**Solution** Configure the script to actually update all of your lambdas and not just one!

**Symptom** API Gateway endpoints return CORS errors
**Solution** Add an options method to each resource that configures the `Access-Control-Allow-Origin: '*'` header to be included in preflight and also manually add the `Access-Control-Allow-Origin: '*'` header to all lambda responses. Both steps are needed to resolve this issue
