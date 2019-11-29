#!/bin/bash

OS="$(uname -srm)"
OS_CHECK=$(uname -srm | cut -d' ' -f1)
start="$(date)"

log_file=setup_local_dev_environment.log

print_output()
{
echo Welcome "$USER"
echo This script is going to install some packege you need and show you the version of the packege

# check what operation system you are running at
if [[ $OS_CHECK == "Darwin" ]]; then
    echo "Operating System:         $OS"
elif [[ $OS_CHECK == "Linux" ]]; then
    echo "Operating System:         $OS"
else
    echo "OS is not supported! Exiting script"
    echo
    exit 0
fi

sudo apt-get install build-essential curl file git
# install brew
if test ! $(which brew); then
    echo "Installing homebrew..."
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
fi

# install git
sudo apt-get install git -y

#install Node js
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
sudo apt install nodejs
sudo apt install npm







BREW_VERSION="$(brew --version)"
GIT_VERSION="$(git --version | grep -Po "(\d+\.)+\d+")"
NPM_VERSION="$(npm --v)"
NODE_VERSION="$(node -v)"
AWS_VERSION="$(aws --version)"

echo
# check verion af brew you have
if [ "$BREW_VERSION" ]
then
    echo "BREW version:              $BREW_VERSION"
else
    echo "BREW version:              NOT INSTALLED"
fi

# check what verion on NPM you have
if [ "$NPM_VERSION" ]
then
    echo "NPM version:              $NPM_VERSION"
else
    echo "NPM version:              NOT INSTALLED"
fi

# check what verion on git you have
if [ "$GIT_VERSION" ]
then
    echo "Git version:              $GIT_VERSION"
else
    echo "Git version:              NOT INSTALLED"
fi

# check what verion on Node you have
if [ "$NODE_VERSION" ]
then
    echo "NodeJS version:           $NODE_VERSION"
else
    echo "NodeJS version:           NOT INSTALLED"
fi

if [ "$AWS_VERSION" ]
then
    echo "AWS version:              $AWS_VERSION"
else
    echo "AWS version:              NOT INSTALLED"
fi



# show date and timewhen scipt started and ended
echo 
echo "Script started at:        $start
Ended at:                 $(date)" 
}

# Printing into terminal and into the output file
print_output 2>&1 | tee $log_file 