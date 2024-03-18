import axios from "axios";

async function getBotResponse(prompt: string, model: any): Promise<string> {
    let apiUrl = '';

    if (model === 'codet5-large-ntp-py') {
        apiUrl = 'http://127.0.0.1:7000';
        try {
            const response = await axios.post(apiUrl, { prompt });
            return response.data.bot.trim();
        } catch (error) {
            console.error("Error Fetching response:", error);
            return 'Something Went wrong';
        }
    } else if (model === 'zephyr-7b-beta') {
        apiUrl = '';
        try {
            const headers = { 'Content-Type': 'application/json' };
            const data ={ "inputs": prompt };
            const response = await axios.post(apiUrl, data, {headers});
            return response.data.generated_text.trim();
        } catch (error) {
            console.error("Error Fetching response:", error);
            return (error as Error).toString();
        }
    } else {
        return 'Invalid model specified';
    }
}

export { getBotResponse };
