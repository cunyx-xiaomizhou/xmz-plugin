export class example extends plugin {
  constructor() {
    super({
      name: '白名单自动解禁',
      dsc: 'unban',
      event: 'notice.group.ban',
      priority: -10,
      rule: [{fnc: 'ban'}]
    });
  }
  async ban(e) {
    if (e.duration === 0){return false}
    let msg = `\n你怎么不说话了 是因为不喜欢吗？`;
    if (e.sub_type === 'ban') {
      e.reply([
        segment.at(e.user_id),
        msg
      ]);
      return false;
    }
    return false;
  }
}