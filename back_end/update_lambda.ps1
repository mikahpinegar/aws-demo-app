# run package
npm run package

# copy build zip
aws s3 cp c:\Users\mikah\OneDrive\Documents\repos\aws-demo-app\back_end\lambda-code.zip s3://lambda-code-bucket-021891616196-us-east-1/lambda-code.zip

# update lambda code
aws lambda update-function-code --function-name CreateUserLambda --s3-bucket lambda-code-bucket-021891616196-us-east-1 --s3-key lambda-code.zip
aws lambda update-function-code --function-name GetUsersLambda --s3-bucket lambda-code-bucket-021891616196-us-east-1 --s3-key lambda-code.zip
aws lambda update-function-code --function-name GetUserLambda --s3-bucket lambda-code-bucket-021891616196-us-east-1 --s3-key lambda-code.zip
aws lambda update-function-code --function-name UpdateUserLambda --s3-bucket lambda-code-bucket-021891616196-us-east-1 --s3-key lambda-code.zip
aws lambda update-function-code --function-name DeleteUserLambda --s3-bucket lambda-code-bucket-021891616196-us-east-1 --s3-key lambda-code.zip

