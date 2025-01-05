#!/bin/sh

# Execute the curl command using environment variables
response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${IMMICH_API}/api/libraries/${LIBRARY_ID}/scan" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "x-api-key: ${API_KEY}")

if [ "$response" -eq 200 ]; then
  echo "Scan started" 1>>/proc/1/fd/1
else
  echo "Error: Scan failed with status code $response" 1>>/proc/1/fd/1
fi
