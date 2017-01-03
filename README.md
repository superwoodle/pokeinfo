# pokeinfo

Call the https://pokeapi.co/ API with Alexa!

# Getting started

If you haven't, be sure to read through [Amazon's Custom Skill Kit documentation](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/understanding-custom-skills)


# Deploying to AWS

After you have [created your NodeJS Labmba Function](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/deploying-a-sample-skill-to-aws-lambda#preparing-a-nodejs-sample-to-deploy-in-lambda)

Download  and install dependencies `npm install` or `yarn`

Zip up `index.js`, `src`, and `node_modules`.

Upload the `.zip` to your AWS Lambda function.

You will also need to increase the timeout under Configuration > Advanced Settings > Timeout (At least 1 min 3 sec)
