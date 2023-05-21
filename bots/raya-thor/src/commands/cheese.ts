import command from '$commands/slash';

import { incCount } from '$services/users';
import { FILES_DOMAIN } from 'storage';

export default command(
  {
    desc: 'Cheese cat',
    options: {}
  },
  async i => {
    await i.deferReply();
    await i.deleteReply();
    await i.channel?.send(`https://${FILES_DOMAIN}/cheese/cheesecat.png`);
    await incCount(i.user.id, 'cheese');
  }
);