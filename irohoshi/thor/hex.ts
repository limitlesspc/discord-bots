import { MessageAttachment } from 'discord.js';
import { createCanvas } from 'canvas';

import { command } from '$shared/command';

const size = 16;

export default command(
  {
    name: 'hex',
    desc: 'Gives you a 16x16 image of a hex code',
    args: [
      {
        name: '#code',
        type: 'string',
        desc: 'The hex code to convert to an image'
      }
    ]
  },
  async ({ channel }, [hex]) => {
    if (!hex) return channel.send('You need to provide a hex code');

    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    if (hex.startsWith('#')) hex = hex.slice(1);
    if (![3, 4, 6, 8].includes(hex.length))
      return channel.send('Invalid hex code');

    ctx.fillStyle = `#${hex}`;
    ctx.fillRect(0, 0, size, size);

    return channel.send({
      files: [new MessageAttachment(canvas.toBuffer())]
    });
  }
);