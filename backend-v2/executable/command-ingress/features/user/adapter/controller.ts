import { BaseController } from '../../../shared/base-controller';
import { HttpRequest } from '../../../types';
import { UserService } from '../types';
import { Response, NextFunction } from 'express';

export class UserController extends BaseController {
  service: UserService;

  constructor(service: UserService) {
    super();
    this.service = service;
  }

  async getOne(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const { id } = req.params;
      const user = await this.service.getOne(id);
      res.status(200).json(user);
      return;
    });
  }

  async followUser(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const { id } = req.params;
      const followId = req.body.followId;
      const followed = await this.service.followUser(id, followId);
      res.status(200).json(followed);
      return;
    });
  }

  async unfollowUser(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const { id } = req.params;
      const unfollowId = req.body.followId;
      const unfollowed = await this.service.unfollowUser(id, unfollowId);
      res.status(200).json(unfollowed);
      return;
    });
  }
}