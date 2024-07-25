import { Requester, Song, SongJSON } from "./shared";
import { createAudioResource } from "@discordjs/voice";
import chalk from "chalk-template";
import got from "got";
import logger from "logger";

export interface URLJSON extends SongJSON {
	type: "url";
	url: string;
}
export class URLSong extends Song {
	constructor(
		public url: string,
		requester: Requester,
	) {
		super({ title: url.split("/").pop() || url, duration: 0, requester });
	}

	get iconURL() {
		return "https://static.thenounproject.com/png/2391758-200.png";
	}

	log() {
		const { title, url } = this;
		logger.debug(chalk`🔗 {blue [URL]}
${title} (${url})`);
	}

	toString(): string {
		return `🔗 [URL] ${this.title} (${this.url})`;
	}

	toJSON(): URLJSON {
		const { url, title, duration } = this;
		return { type: "url", url, title, duration };
	}

	static fromJSON({ url }: URLJSON, requester: Requester): URLSong {
		return new URLSong(url, requester);
	}

	override getEmbed() {
		return super.getEmbed().setColor("Blue").setURL(this.url);
	}

	static fromURL(url: string, requester: Requester): URLSong {
		return new URLSong(url, requester);
	}

	async getResource({ seek, filters }: { seek?: number; filters?: string[] }) {
		const stream = got.stream(this.url);
		const { default: ytdl } = await import("discord-ytdl-core");

		const ytdlStream = ytdl.arbitraryStream(stream, {
			opusEncoded: true,
			seek,
			encoderArgs: filters?.length ? ["-af", filters.join(",")] : undefined,
		});
		const resource = createAudioResource(ytdlStream, {
			metadata: this,
		});
		return resource;
	}
}
