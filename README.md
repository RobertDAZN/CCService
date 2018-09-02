# CCService

Stands for: Coding Challenge Service

# DAZN's pick of implementation

Andrea F. has chosen options 1-3 and 2-1 (green coloured path/boxes) from options graph at https://www.lucidchart.com/documents/view/12cdb8f0-ac59-4d1c-912a-ad9b9b8a1a48/0

The options chosen mean that:

- The source of truth is another microservice (the one which streams videos). This means that the "test microservice" (CCService) does not require a database as the "streaming microservice" will provide it (CCService) with the information about the number of streams currently being watched by the user.

This would mean that at the minimum the "test microservice" (CCService) would have just one endpoint which would do this:

- on a new video being requested, ask the "streaming microservice" about the number of videos the user is currently watching and if its three or more return a negative response and otherwise a positive one.
- if the "streaming microservice" is down then the "test microservice" should refuse requests for any new video user may want to stream

As you can tell there is no database involved.

# Assumptions

- Service just tells if video can be streamed or not
  - Service does not store number of videos being streamed currently by the user

# Simplifying decissions:

- I have used (to some extent) serverless template provided at https://serverless-stack.com
- I have ignored that requests can come out of order (not because lambda is called asynchronously which it isn't but because of possible network slow downs or whatever else)
- I have ignored attaching correlation id
- Limit of videos user can watch at the same time is configured through enviromental settings (not from any kind of external parameter store)
- I have ignored any logging but ideally we want logging. For example some debug type to understand what is happening in the system, error type when errors happen (especially these which are unexpected) and also some logging which can be intercepted by automated process which can manipulate lambda settings like timeout, etc.

# Documentation strategy (OpenAI)

- Ideally I could use OpenAPI (Swagger) documentation for this API as described here https://www.dropsource.com/blog/serverless-rest-api/ with some useage examples here https://github.com/deliveryhero/serverless-aws-documentation/blob/master/README.md (but I didn't)

# Installation

- Install NodeJS 8 (it is curently the highest version aws lambda supports)
- Install Serverless Framework per instructions at https://serverless.com/framework/docs/providers/aws/guide/installation/

- ... I didn't try to deploy it but if you'd like to below instructions should suffice ...

- Follow deployment instructions at https://serverless.com/framework/docs/providers/aws/guide/deploying/
- You can invoke function per instructions at https://serverless.com/framework/docs/providers/aws/cli-reference/invoke/
- You can also invoke it through API Gateway's interface at AWS Portal
