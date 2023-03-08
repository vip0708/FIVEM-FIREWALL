# FIREWALL-FOR FIVEM SERVER(LINUX)
A Node js Application that fetches users IPV4 form a DB(JSON) and add it to the IP-Table of a specified port.


**Dependency**
```
 Node js
```

**Installation**
```
Step 1 : npm i 

Step 2 : node App.js
```

**Configuration**
```
const webhookURL = '' --Define your Discord webhook URL.

const clientData = fs.readFileSync('Your IP JSON fil directory');   ---Define the path to your JSON file that contains the client IP addresses.
```

## Use

```
To start the script, run node App.js in your terminal. The script will automatically fetch the client IP addresses from the JSON file and update the IP tables every 30 seconds.
```

**TODO**
```
----
```

**Example**





<img  src="https://cdn.discordapp.com/attachments/976128325783261228/1082512553751629964/Screenshot_2023-03-07_092735.png">

