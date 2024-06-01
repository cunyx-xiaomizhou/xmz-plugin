async function handle (jsonString) {
  const Json = JSON.parse(jsonString);
  let list = Json.data.list;
  let userData = [];
  for (let index = 0; index < list.length; index++) {
    let jsonData = list[index];
    let money = jsonData.all_sum_amount;
    let user = jsonData.user;
    let userName = user.name;
    let userAvatar = user.avatar;
    let array = {
      name: userName,
      avatar: userAvatar
    }
    userData.push(array);
  }
  return userData;
}
export { handle } ;