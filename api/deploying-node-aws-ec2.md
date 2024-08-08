### Setup EC2 Instance

sudo apt update
sudo apt upgrade

### Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
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
sudo vim /app_folder/.env
```

In Vim, add your variables in the format VARIABLE=value. For example:

```bash
DB_PASSWORD=your_secure_password
```

Note
to save and exit vim, press esc then :wq then enter

Restrict the file permissions for security.

```bash
sudo chmod 600 /app_folder/.env
sudo chown ubuntu:ubuntu /app_folder/.env
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
WorkingDirectory=/app_folder/
ExecStart=/usr/bin/yarn run start:[prod|dev]
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/app_folder/.env
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

### Installing Nginx

#### Execute the following command to install Nginx

```bash
sudo apt install nginx
```

It is recommended that you enable the most restrictive profile that will still allow the traffic you’ve configured. Right now, we will only need to allow traffic on port 80.

```bash
sudo ufw allow 'Nginx HTTP'
```

To confirm Nginx has been correctly installed, use the following command.

```bash
sudo systemctl status nginx
```

navigate to sites-available inside the nginx folder.

```bash
cd /etc/nginx/sites-available/
```

#### Nginx configuration

```bash
server {
	listen 80;
    server_name example.com www.example.com; # change the doamin name
    root /var/www/html;
    index index.html index.htm;
    location / {
    	proxy_pass http://127.0.0.1:3000; # change the port
        proxy_read_timeout 60;
        proxy_connect_timeout 60;
        proxy_redirect off;

        # Allow the use of websockets
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Now, Create a symbolic link (symlink) in sites-enabled that points to your configuration file in sites-available. This step is crucial for enabling the new settings you've added for your application.

To create the symbolic link, execute the following command:

```bash
sudo ln -s /etc/nginx/sites-available/app1.conf /etc/nginx/sites-enabled/
```

Likewise, you can create multiple .conf files if you're managing multiple applications. Just ensure to modify the server_name and proxy_pass accordingly.

We can test the nginx config by running the following command.

```bash
sudo nginx -t
```

#### After completing the configuration, restart Nginx to apply the changes by executing the following command.

```bash
sudo systemctl restart nginx.service
```
