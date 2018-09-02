# CCService

For Coding Challenge Service

# Assumptions

- Service just tells if video can be streamed or not
  - Service does not store number of videos being streamed currently by the user

# Simplifying decissions:

- I have used (to some extent) serverless template provided at https://serverless-stack.com
- I have ignored that requests can come out of order (not because lambda is called asynchronously which it isn't but because of possible network slow downs or whatever else)
- I have ignored attaching correlation id
- Limit of videos user can watch at the same time is configured through enviromental settings (not from any kind of external parameter store)
- I have ignored any logging but ideally we want logging. For example some debug type to understand what is happening in the system, error type when errors happen (especially these which are unexpected) and also some logging which can be intercepted by automated process which can manipulate lambda settings like timeout, etc.

# Installation

- Install NodeJS 8 (it is curently the highest version aws lambda supports)
- Install Serverless Framework per instructions at https://serverless.com/framework/docs/providers/aws/guide/installation/

- ... I didn't try to deploy it but if you'd like to below instructions should suffice ...

- Follow deployment instructions at https://serverless.com/framework/docs/providers/aws/guide/deploying/
- You can invoke function per instructions at https://serverless.com/framework/docs/providers/aws/cli-reference/invoke/
- You can also invoke it through API Gateway's interface at AWS Portal
