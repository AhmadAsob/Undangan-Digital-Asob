const fs = require('fs');
const source = "C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\57c8b08c-4cb3-48a6-8aba-a339da9cbf89\\ay_logo_text_only_1778939741186.png";
const dest = "d:\\Ahmad Shobari - Backend Developer\\Undangan  Digital Asob\\public\\logo.png";

try {
    fs.copyFileSync(source, dest);
    console.log("Success");
} catch (err) {
    console.error(err);
    process.exit(1);
}
