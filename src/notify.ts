import axios from 'axios';

type MessageOptions = {
  message: string;
};

export async function sendMessage({message}: MessageOptions): Promise<void> {
  const BOT_TOKEN = process.env.telegramBotKey; // Read bot token from environment variable
  const CHAT_ID = process.env.chatID; // Read chat ID from environment variable
  const URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const payload = {
    chat_id: CHAT_ID,
    text: message,
  };

  try {
    const response = await axios.post(URL, payload);
    console.log(`Message sent successfully to chat ID: ${CHAT_ID}`);
  } catch (error) {
    console.error(`Error sending message: ${error}`);
  }
}
