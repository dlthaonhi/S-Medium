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
}

export {
  UserEntity,
  UserFollowEntity,
  UserService,
};
