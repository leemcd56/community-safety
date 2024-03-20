FROM oven/bun

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package*.json ./
RUN bun install

COPY . .

# Start the bot.
CMD ["bun", "index.js"]