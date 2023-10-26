#!/bin/bash

# Check that environment variables have been defined
if [[ -z "${REDIS_HOST+x}" ]]; then
  # var is not defined
  echo "Error: REDIS_HOST is not defined!"
  exit 1
fi

if [[ -z "${REDIS_PORT+x}" ]]; then
  # var is not defined
  echo "Error: REDIS_PORT is not defined!"
  exit 1
fi

if [[ -z "${REDIS_PASSWORD+x}" ]]; then
  # var is not defined
  echo "Error: REDIS_PASSWORD is not defined!"
  exit 1
fi

if [[ -z "${DEPLOYMENT_URL+x}" ]]; then
  # var is not defined
  echo "Error: DEPLOYMENT_URL is not defined!"
  exit 1
fi

# Read the JSON file
json_data=$(cat "/usr/src/app/config_template.json")

# Update the JSON file with the environment variables
json_data=$(jq --arg deployment_url "$DEPLOYMENT_URL" '.url = $deployment_url' <<< "$json_data")
json_data=$(jq --arg host "$REDIS_HOST" '.redis.host = $host' <<< "$json_data")
json_data=$(jq --arg port "$REDIS_PORT" '.redis.port = $port' <<< "$json_data")
json_data=$(jq --arg password "$REDIS_PASSWORD" '.redis.password = $password' <<< "$json_data")

# Write the updated JSON file to config.json
echo "$json_data" > "/usr/src/app/config.json"

cat /usr/src/app/config.json
