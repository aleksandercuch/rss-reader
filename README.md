A lightweight RSS feed reader built with React and styled using Tailwind CSS. This application allows users to fetch and display RSS feeds from various sources directly in the browser.​


- Clone the repository:

git clone https://github.com/aleksandercuch/rss-reader.git

cd rss-reader


- Install dependencies:

npm install


- Start the development server:

npm start

The application will run at http://localhost:3000.


- CORS Proxy Requirement
RSS feeds are often hosted on servers that block cross-origin requests (CORS). To bypass this during development, this app uses the CORS Anywhere proxy.​

Important: Before using the application, you need to request temporary access to the demo server:​

https://cors-anywhere.herokuapp.com/corsdemo

Visit the link above and click "Request temporary access" to enable the proxy for your session.​


- Potential Issues and Considerations
CORS Limitations: The use of https://cors-anywhere.herokuapp.com/ is intended for development purposes only. For production, consider setting up your own proxy server or using a different method to handle CORS.​

Proxy Reliability: The public CORS Anywhere proxy may have rate limits or downtime. It's recommended to host your own instance if you plan to use this application extensively.​

Security: Always validate and sanitize the RSS feed URLs provided by users to prevent potential security vulnerabilitie
