import db, { and, desc, eq, gte } from "$lib/database/drizzle";
import { channels, context } from "$lib/database/schema";
import command from "$lib/discord/commands/text";
import logger from "$lib/logger";
import { description, uncensoredSystem } from "./shared";
import { throttle } from "@iz7n/std/async";
import ollama from "ollama";

const model = "llama3.2:1b";

export default command(
  {
    desc: "Talk to Ollama",
    optionalPrefix: true,
    args: {
      prompt: {
        type: "text",
        desc: "The prompt to send",
        max: 256,
      },
    },
    examples: ["hi", "what is the meaning of life?"],
  },
  async ({ message, args: { prompt } }) => {
    const { channelId, channel, guildId } = message;

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
    logger.info(`Starting ${model}...`);
    const responseMessage = await channel.send("*Starting...*");
    const send = throttle(async () => {
      if (reply) {
        await responseMessage.edit(reply);
      }
    }, 3000);
    const start = performance.now();
    const response = await ollama.chat({
      model,
      messages: [
        {
          role: "system",
          content: await uncensoredSystem(),
        },
        {
          role: "assistant",
          content: await description(),
        },
        ...previous.flatMap(
          ({ question: q, answer: a }) =>
            [
              { role: "user", content: q },
              { role: "assistant", content: a },
            ] as const,
        ),
        { role: "user", content: prompt },
      ],
      stream: true,
    });
    logger.info(`Running ${model}...`);
    await responseMessage.edit("*Running...*");
    for await (const part of response) {
      reply += part.message.content;
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
