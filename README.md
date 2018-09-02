# CCService

Stands for: Coding Challenge Service

# DAZN's pick of implementation

Andrea F. has chosen options 1-3 and 2-1 (green coloured path/boxes) from the options graph at https://www.lucidchart.com/documents/view/12cdb8f0-ac59-4d1c-912a-ad9b9b8a1a48/0

The options chosen mean that:

- The source of truth is another microservice (the one which streams videos). This means that the "test microservice" (CCService) does not require a database as the "streaming microservice" will provide it (CCService) with the information about the number of streams currently being watched by the user.

This would mean that at the minimum the "test microservice" (CCService) would have just one endpoint which would do this:

- on a new video being requested, ask the "streaming microservice" about the number of videos the user is currently watching and if its three or more return a negative response and otherwise a positive one.
- if the "streaming microservice" is down then the "test microservice" should refuse requests for any new video user may want to stream

As you can tell there is no database involved.

# Assumptions

- Service just tells if video can be streamed or not
  - Service does not store number of videos being streamed currently by the user

# Simplifications:

- I have used (to some extent) serverless template provided at https://serverless-stack.com
- I have ignored that requests can come out of order (not because lambda is called asynchronously which it isn't but because of possible network slow downs or whatever else)
- I have ignored attaching correlation id
- Limit of videos user can watch at the same time is configured through enviromental settings (not from any kind of external parameter store)
- I have ignored any logging but ideally we want logging. For example some debug type to understand what is happening in the system, error type when errors happen (especially these which are unexpected) and also some logging which can be intercepted by automated process which can manipulate lambda settings like timeout, etc.

# Documentation strategy (OpenAI)

- Ideally I could use OpenAPI (Swagger) documentation for this API as described here https://www.dropsource.com/blog/serverless-rest-api/ with some useage examples here https://github.com/deliveryhero/serverless-aws-documentation/blob/master/README.md (but I didn't)

# Test strategy

- I would consider mix of hexagonal, honeycomb and contract (or assumptions/data) testing strategies. We should get as much confidence as possible out of tests which can be run very quickly (in seconds) from the local developer's machine. Any other kind of tests should be designed to not fail for the same reasons other (quick) tests are failing. Thus they should be failing as rarelly as possible.
  - honeycomb: https://labs.spotify.com/2018/01/11/testing-of-microservices/
  - hexagonal: https://medium.freecodecamp.org/the-best-ways-to-test-your-serverless-applications-40b88d6ee31e
  - contract/pact: https://medium.com/nmc-techblog/scalable-integration-testing-for-microservices-deployments-e03e29dd1280
  - data/assumptions - no article

# Scallability strategy

- aws lambda scales by itself in general
- we should set timeout for most lambda calls
  - we should have timeout on aws lambda (something resonable in case lambda goes into some kind of infinite loop. Maybe equal to maximum time we are willing to wait for any lambda to finish, perhaps 5sec...)
  - we should have internal timeouts calculated with each request (something like what is described here by Yan Cui: https://theburningmonk.com/2018/01/aws-lambda-use-the-invocation-context-to-better-handle-slow-http-responses/)
  - this is necessary as user's experience is very important to us and users don't want to wait
- we should experiment with memory setting for lambda as higher memory settings let lambda execute/start faster (and reduce cold start of lambda)
- lambda cold start does not matter much in this case as this lambda is ment to run outside VPC and we are using NodeJS which has very short cold start with lambda
- as this is quite important logic we may want to reserve enough lambda concurrent executions for this function but by doing this lambda could get throthled in some cases (this may be good or bad thing)

# Installation

- Install NodeJS 8 (it is curently the highest version aws lambda supports)
- Install Serverless Framework per instructions at https://serverless.com/framework/docs/providers/aws/guide/installation/

- ... I didn't try to deploy it but if you'd like to below instructions should suffice ...

- Follow deployment instructions at https://serverless.com/framework/docs/providers/aws/guide/deploying/
- You can invoke function per instructions at https://serverless.com/framework/docs/providers/aws/cli-reference/invoke/
- You can also invoke it through API Gateway's interface at AWS Portal
