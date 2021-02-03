# Install git-secret (https://git-secret.io/installation), for instance, for debian:
echo "deb https://dl.bintray.com/sobolevn/deb git-secret main" | sudo tee -a /etc/apt/sources.list
wget -qO - https://api.bintray.com/users/sobolevn/keys/gpg/public.key | sudo apt-key add -
sudo apt-get update && sudo apt-get install git-secret
# Create private key file
echo $GPG_PRIVATE_KEY > ./private_key.gpg
# Import private key
gpg --import ./private_key.gpg
# Reveal secrets
git secret reveal
