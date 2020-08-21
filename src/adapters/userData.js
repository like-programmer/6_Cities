class UserData {
  parse(data) {
    return {
      id: data[`id`],
      email: data[`email`],
      name: data[`name`],
      avatarUrl: data[`avatar_url`],
      isPro: data[`is_pro`],
    };
  }

  // toRAW(data) {}
}

export default UserData;
