type UserEntity = {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

type UserFollowEntity = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  followings: string[] | string;
}

interface UserService {
  getOne(id: string): Promise<UserEntity>;
  followUser(userId: string, followId: string): Promise<UserFollowEntity>;
  unfollowUser(userId: string, unfollowId: string): Promise<UserFollowEntity>
}

export {
  UserEntity,
  UserFollowEntity,
  UserService,
};
