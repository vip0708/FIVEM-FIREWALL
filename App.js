const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');

// Define the Discord webhook URL
const webhookURL = ''; // Your WEBHOOK URL

// Create a Set to store the unique IP addresses
const uniqueIPs = new Set();

// Define a function to fetch the client IP addresses and update the IP tables
function updateIPTables() {
  // Read the JSON file that contains the client IP addresses
  const clientData = fs.readFileSync('');//Your JSON DB filepath
  const clients = JSON.parse(clientData);


  const newIPs = [];


  clients.forEach((client) => {
    const ipString = client.replace('ip:', '');
    const ip = ipString.trim();
    if (!uniqueIPs.has(ip)) {
      // Add the IP address to the IP tables for port 30120 for both TCP and UDP
      const command = `sudo iptables -A INPUT -p tcp --dport 30120 -s ${ip} -j ACCEPT -w && sudo iptables -A INPUT -p udp --dport 30120 -s ${ip} -j ACCEPT -w`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
      uniqueIPs.add(ip);
      newIPs.push(ip);
    }
  });

  // If any new IPs were added, send a Discord webhook with the list of new IPs
  if (newIPs.length > 0) {
    const embed = {
      title: 'New IPs added to firewall',
      description: newIPs.join('\n'),
      color: 0x00ff00,
      timestamp: new Date().toISOString(),
    };
    axios
      .post(webhookURL, {
        embeds: [embed],
      })
      .then((response) => {
        console.log(`Discord message sent with status code ${response.status}`);
      })
      .catch((error) => {
        console.error(`Failed to send Discord message: ${error}`);
      });
  }

  // Print the list of IP addresses in the IP tables
  exec('sudo iptables -L -n', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`IP tables: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

// Call the updateIPTables function every 30 seconds
setInterval(updateIPTables, 30000);

// Your code goes here

// Wipe all IP addresses in the iptables for port 30120
exec('sudo iptables -D INPUT -p tcp --dport 30120 -j ACCEPT -w', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
