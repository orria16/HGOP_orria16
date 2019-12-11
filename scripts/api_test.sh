#!/bin/bash
cd /var/lib/jenkins/terraform/hgop/apitest
API_URL=http://$(terraform output public_ip):3000
cd -
API_URL=$API_URL npm run test:api
