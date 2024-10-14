import db, { eq } from "$lib/database/drizzle";
import { chickens, users } from "$lib/database/drizzle/schema";
import command from "$lib/discord/commands/slash";
import logger from "$lib/logger";
import got from "got";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { env } from "node:process";
import { pipeline } from "node:stream/promises";

export default command(
  {
    desc: "Add a chicken",
    options: {
      file: {
        type: "attachment",
        desc: "The file to add",
      },
    },
  },
  async (i, { file: { name, proxyURL } }) => {
    const user = await db.query.users.findFirst({
      columns: {
        admin: true,
      },
      where: eq(users.id, i.user.id),
    });
    if (!user?.admin) {
      return i.reply("You are not an admin");
    }

    const request = got.stream(proxyURL);
    const subPath = `chicken/${name}`;
    const filePath = path.join(env.FILES_PATH, subPath);
    await pipeline(request, createWriteStream(filePath));

    await db.insert(chickens).values({
      name,
    });

    const fileURL = `https://${env.FILES_DOMAIN}/${subPath}`;
    logger.info(`Uploaded ${fileURL}`);

    return i.reply(`Chicken added
${fileURL}`);
  },
);
