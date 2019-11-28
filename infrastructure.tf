# This tells Terraform we want to create a new infrastructure, 
# using AWS as the provider and using our credentials found under account details that we copied from AWS (workbench page),
# And the server region we want to use
provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

# Here we are creating the security group called "GameSecurityGroup"
# and setting its inbound and outbout rules.
# Inbound will allow TCP port 22 and 3000, outbound seems to be the default.
resource "aws_security_group" "game_security_group" {
  name = "GameSecurityGroup"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Here we are creating a new instance called "GameServer", using the KeyPair we created on AWS (EC2 Management console)
# AMI (Amazon Machine Image) is what operating system we want the AWS computer to use, 
# in this case Ubuntu Server 18.04 LTS (HVM), SSD Volume Type (according to ami key)
resource "aws_instance" "game_server" {
  ami                    = "ami-0ac019f4fcb7cb7e6"
  instance_type          = "t2.micro"
  key_name               = "GameKeyPair"
  vpc_security_group_ids = [aws_security_group.game_security_group.id]
  tags = {
    Name = "GameServer"
  }

    # A game initialization script is provided from our local computer and is copied over to the Instance server's destination
    # Then telling what connection type we want to use and what KeyPair we are using, in this case 'GameKeyPair.pem'
    # User 'ubuntu' is just the default user on the AWS system.
  provisioner "file" {
    source      = "scripts/initialize_game_api_instance.sh"
    destination = "/home/ubuntu/initialize_game_api_instance.sh"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # Similarly to the one above, we are providing the local docker-compose.yml file and copying over to the AWS server. 
  # using the same GameKeyPair as above.
  provisioner "file" {
    source      = "docker-compose.yml"
    destination = "/home/ubuntu/docker-compose.yml"

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }

  # This is used to run commands on the instance we just created.
  # Terraform does this by SSHing into the instance and then executing the commands.
  # Since it can take time for the SSH agent on machine to start up we let Terraform
  # handle the retry logic, it will try to connect to the agent until it is available
  # that way we know the instance is available through SSH after Terraform finishes.
  # TODO Comment 1-2 sentences.
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/initialize_game_api_instance.sh",
    ]

    connection {
      host        = coalesce(self.public_ip, self.private_ip)
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.aws/GameKeyPair.pem")
    }
  }
}

# This is to give the value to the command we call "terraform output public_ip", which is the game_server public ip address
output "public_ip" {
  value = aws_instance.game_server.public_ip
}