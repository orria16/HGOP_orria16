#!/bin/bash
set -euxo pipefail

GIT_COMMIT=$1
env=$2

# We need to move some files around, because of the terraform state limitations.
mkdir -p /var/lib/jenkins/terraform/hgop/$env
mkdir -p /var/lib/jenkins/terraform/hgop/$env/scripts
rm -f /var/lib/jenkins/terraform/hgop/$env/scripts/initialize_game_api_instance.sh
cp scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/$env/scripts/initialize_game_api_instance.sh
rm -f /var/lib/jenkins/terraform/hgop/$env/scripts/docker_compose_up.sh
cp scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/$env/scripts/docker_compose_up.sh
rm -f /var/lib/jenkins/terraform/hgop/$env/docker-compose.yml
cp docker-compose.yml /var/lib/jenkins/terraform/hgop/$env/docker-compose.yml

# TODO: Delete all .tf files from /var/lib/jenkins/terraform/hgop/
rm -f /var/lib/jenkins/terraform/hgop/$env/*.tf
# TODO: Copy all .tf files from repository to /var/lib/jenkins/terraform/hgop/production
cp *.tf /var/lib/jenkins/terraform/hgop/$env


cd /var/lib/jenkins/terraform/hgop/$env
terraform init # In case terraform is not initialized.
terraform destroy -auto-approve -var enviroment=$env || exit
terraform apply -auto-approve -var enviroment=$env || exit
echo "Game API running at " + $(terraform output public_ip)

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT"

#TODO exit on error if deployment fails.

exit 0