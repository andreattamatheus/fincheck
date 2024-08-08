### Setup EC2 Instance

sudo apt update
sudo apt upgrade

### Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### rsync

```bash
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \
-e "ssh -i ~/.ssh/your-key.pem" \
. ubuntu@ip-address:~/app
```

### Database

Postgres

```bash
sudo apt install postgresql postgresql-contrib

sudo systemctl start postgresql
sudo systemctl enable postgresql

sudo -i -u postgres

psql
CREATE DATABASE fincheck;
CREATE ROLE admin WITH LOGIN PASSWORD 'root';
GRANT ALL PRIVILEGES ON DATABASE fincheck TO admin;
```

### systemd

#### Step 1: Create the Environment File

Create a new file for your environment variables and open the file in Vim:

```bash
sudo vim /etc/app.env
```

In Vim, add your variables in the format VARIABLE=value. For example:

```bash
DB_PASSWORD=your_secure_password
```

Note
to save and exit vim, press esc then :wq then enter

Restrict the file permissions for security.

```bash
sudo chmod 600 /etc/app.env
sudo chown ubuntu:ubuntu /etc/app.env
```

#### Step 2: Create the systemd Service File

Navigate to the systemd directory and create a new service file, myapp.service.

```bash
sudo vim /etc/systemd/system/myapp.service
```

Define the service settings. Add the following content in Vim, modifying as needed for your application:

```bash
[Unit]
Description=Node.js App
After=network.target multi-user.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/app
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/etc/app.env
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=myapp

[Install]
WantedBy=multi-user.target
```

Reload systemd and start your service.

```bash
sudo systemctl daemon-reload
sudo systemctl enable myapp.service
sudo systemctl start myapp.service
```

Verify that the service is running properly.

```bash
sudo systemctl status myapp.service
```

### View Logs

```bash
sudo journalctl -u myapp.service
```

tail logs:

```bash
sudo journalctl -fu myapp.service
```
