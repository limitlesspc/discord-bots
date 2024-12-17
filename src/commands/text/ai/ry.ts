import db, { eq, gte, and, desc } from "$lib/database/drizzle";
import { channels, context } from "$lib/database/schema";
import command from "$lib/discord/commands/text";
import logger from "$src/lib/logger";
import { description } from "./shared";
import { createOpenAI } from "@ai-sdk/openai";
import { throttle } from "@iz7n/std/async";
import { streamText } from "ai";
import { env } from "node:process";

const openai = createOpenAI({
  baseURL: "http://localhost:11434/v1",
  compatibility: "compatible",
});

const model = "llama.cpp";

export default command(
  {
    desc: "Talk to llama.cpp",
    optionalPrefix: true,
    args: {
      prompt: {
        type: "text",
        desc: "The prompt to send",
        max: 512,
      },
    },
    examples: ["do you love lean?", "what's 77 + 33?"],
  },
  async ({ message, args: { prompt } }) => {
    const { channelId, channel, guildId } = message;
    if (!("send" in channel)) {
      return;
    }

    if (prompt === "CLEAR") {
      await db.delete(channels).where(eq(channels.id, channelId));
      return message.reply("Context cleared");
    }

    const minCreatedAt = new Date();
    minCreatedAt.setMinutes(minCreatedAt.getMinutes() - 5);
    const previous = await db.query.context.findMany({
      columns: {
        question: true,
        answer: true,
      },
      where: and(
        gte(context.createdAt, minCreatedAt),
        eq(context.channelId, channelId),
      ),
      orderBy: desc(context.createdAt),
    });

    let reply = "";
    logger.info(`Running ${model}...`);
    const responseMessage = await channel.send("*Running...*");
    const send = throttle(async () => {
      if (reply) {
        await responseMessage.edit(reply);
      }
    }, 3000);
    const start = performance.now();
    const result = streamText({
      model: openai(""),
      prompt: `${await description()} Current time: ${new Date().toLocaleString()}

${previous
  .map(
    ({ question: q, answer: a }) => `You: ${q}
${env.NAME}: ${a}`,
  )
  .join("\n")}
You: ${prompt}
${env.NAME}:`,
      temperature: 0.9,
      maxTokens: 128,
      frequencyPenalty: 0.5,
      presencePenalty: 0.5,
      stopSequences: ["You:", "Assistant:"],
    });

    for await (const textPart of result.textStream) {
      reply += textPart;
      send();
    }
    const end = performance.now();
    const diff = end - start;
    logger.info(`${model} finished in ${(diff / 1000).toFixed(1)}s`);

    const channelExists = await db.query.channels.findFirst({
      columns: {
        id: true,
      },
      where: eq(channels.id, channelId),
    });
    if (!channelExists) {
      await db.insert(channels).values({
        id: channelId,
        guildId: guildId || "",
        nsfw: "nsfw" in channel ? channel.nsfw : false,
      });
    }

    return db.insert(context).values({
      channelId,
      question: prompt,
      answer: reply,
    });
  },
);
