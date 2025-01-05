import axios from 'axios';
import * as dotenv from 'dotenv';
import {sendMessage} from './notify';

console.info(`Initialising`);
dotenv.config();
console.info(`Env configured`);

async function getPublicIP(): Promise<string> {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching public IP:', error);
    return '';
  }
}

async function updateNextDNSConfig(): Promise<void> {
  try {
    await axios.get('https://link-ip.nextdns.io/1145c4/1606169cc22faf05');
    console.log('NextDNS config updated successfully.');
  } catch (error) {
    console.error('Error updating NextDNS config:', error);
  }
}

let currentIP: string = '';
const updateIP = async () => {
  let newIP = await getPublicIP();
  if (currentIP !== newIP) {
    console.log(`Public IP changed: ${newIP}`);
    await updateNextDNSConfig();
    currentIP = newIP;
    sendMessage({
      message: `Public IP changed detected and Next notified: ${newIP}`,
    });
  } else {
    console.log('Public IP remains the same:', currentIP);
  }
};
updateIP();
setInterval(() => updateIP(), 5 * 60 * 1000);
