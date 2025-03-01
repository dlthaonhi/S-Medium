import { UserEntity, UserFollowEntity, UserService } from '../types';
import UserModel from '../../../../../internal/model/user';
import { ObjectId } from 'mongodb';

export class UserServiceImpl implements UserService {
  async getOne(id: string): Promise<UserEntity> {
    const user = await UserModel.findById(id);

    return {
      id: String(user._id),
      name: String(user.name),
      avatar: String(user.avatar),
      email: String(user.email),
    };
  }

  async followUser(userId: string, followId: string): Promise<UserFollowEntity> {
    if (userId == followId) {
      throw new Error("You cannot follow yourself.");
    }

    const user = await UserModel.findById(userId);
    const followUser = await UserModel.findById(followId);

    if (!user || !followUser) {
      throw new Error("User: not found.");
    }

    if (user.followings.includes(followUser.id)) {
      throw new Error("You are already following this user.");
    }

    user.followings.push(followUser.id);
    followUser.followers.push(user.id);

    await user.save();
    await followUser.save();

    return {
      id: String(user._id),
      name: String(user.name),
      avatar: String(user.avatar),
      email: String(user.email),
      followings: user.followings.map(following => String(following))
    };
  }

  async unfollowUser(userId: string, unfollowId: string): Promise<UserFollowEntity> {
    if (userId == unfollowId) {
      throw new Error("You cannot unfollow yourself.");
    }
    
    const user = await UserModel.findById(userId);
    const unfollowUser = await UserModel.findById(unfollowId);

    if (!user || !unfollowUser) {
      throw new Error("User: not found.");
    }

    user.followings = user.followings.filter(id => id !== unfollowUser.id);
    unfollowUser.followers = unfollowUser.followers.filter(id => id !== user.id);

    await user.save();
    await unfollowUser.save();
    return {
      id: String(user._id),
      name: String(user.name),
      avatar: String(user.avatar),
      email: String(user.email),
      followings: user.followings.map(following => String(following))
    };
  }
}