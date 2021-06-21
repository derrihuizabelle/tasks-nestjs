class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(idx, 1);
  }
}

//tests

describe('FriendsList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes a friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('add friend to the list', () => {
    friendsList.addFriend('izabelle');

    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces a friendship', () => {
    friendsList.announceFriendship = jest.fn();

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Izabelle');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Izabelle');
  });

  describe('RemoveFriend', () => {
    it('Removes a friend from the list', () => {
      friendsList.addFriend('Roberto');
      expect(friendsList.friends[0]).toEqual('Roberto');
      friendsList.removeFriend('Roberto');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('Throws an error as friend does not exist', () => {
      expect(() => friendsList.removeFriend('Gabriel').toThrow(Error));
    });
  });
});
