#!/bin/bash

# Recreate env file
rm -rf .env
touch .env

# Fill info from env vars 
echo "
REACT_APP_API_WEB=$REACT_APP_API_WEB
REACT_APP_AWS_S3=$REACT_APP_AWS_S3
REACT_APP_GOOGLE_ID=$REACT_APP_GOOGLE_ID
REACT_APP_FACEBOOK_ID=$REACT_APP_FACEBOOK_ID
" >> .env