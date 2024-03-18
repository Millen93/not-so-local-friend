# Start Local Friend 

## Dependencies
```json
To Run plugin you need
"engines": { "vscode": "^1.87.0" }
To Develop
"devDependencies": {
    "@types/mocha": "^10.0.1",
    "@types/node": "16.x",
    "@types/vscode": "^1.81.0",
    "@typescript-eslint/eslint-plugin": "^6.4.1",
    "@typescript-eslint/parser": "^6.4.1",
    "@vscode/test-electron": "^2.3.4",
    "eslint": "^8.47.0",
    "glob": "^10.3.3",
    "mocha": "^10.2.0",
    "ts-loader": "^9.4.4",
    "typescript": "^5.1.6",
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4"
  },
"dependencies": {
    "axios": "^1.6.7",
    "supports-color": "^9.4.0"
  }
```

## To enable local ai plugin 

### 0. Add some new models to plugin 

Install npm packages
```shell
npm install
```

Add some changes to integration.ts
```shell
cd not-so-local-friend
nano /src/integration.ts
```

Example 
```typescript
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
    } else {
        return 'Invalid model specified';
    }
}
```

Add option to choose new model at Settings
```shell
nano package.json
```

Example
```json
    "configuration": {
      "title": "not-so-local-friend",
      "properties": {
        "myPlugin.url": {
          "type": "string",
          "default": "codet5-large-ntp-py",
          "enum": ["codet5-large-ntp-py", "zephyr-7b-beta"],
          "description": "Choose your model"
        }
      }
    }
```

Build plugin
```shell
npm compile
npx vsce package
```

### 1. Run llm model 
```
cd code
#docker run
docker build . -t local-friend
docker run -p 7000:7000 local-friend 
#python run
pip install -r requirements.txt
python3 ./main.py
```
### 2. Import Local plugin that stored in local-friend/local-friend-0.0.1.vsix

You can manually install a VS Code extension packaged in a .vsix file. Using the Install from VSIX command in the Extensions view command dropdown, or the Extensions: Install from VSIX command in the Command Palette, point to the .vsix file.

You can also install using the VS Code --install-extension command-line switch providing the path to the .vsix file.

```
code --install-extension myextension.vsix
```

You may provide the --install-extension multiple times on the command line to install multiple extensions at once.

**Or you can install it from UI**
Manage/Extensions/Install From VSIX...
