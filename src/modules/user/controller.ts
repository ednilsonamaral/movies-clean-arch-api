import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  IHttpActionResult,
  interfaces,
} from 'inversify-express-utils';

import { UserEntity } from '@core/db/entities';
import { ICustomRequest } from '@core/models/custom-request';
import Types from '@core/types';

import { CreateUserDTO, UpdateUserDTO } from '@modules/user/dtos';
import { getUserFilter } from '@modules/user/helper';
import {
  ICreateUserUseCase, IDeleteUserUseCase, IGetUserUseCase, IGetAllUsersUseCase, IUpdateUserUseCase,
} from '@modules/user/use-cases';

import { validateDTO } from '@shared/middlewares';

@controller('/user')
export class UserController extends BaseHttpController implements interfaces.Controller {
  constructor (
    @inject(Types.CreateUserUseCase)
      private createUserUseCase: ICreateUserUseCase,
    @inject(Types.UpdateUserUseCase)
      private updateUserUseCase: IUpdateUserUseCase,
    @inject(Types.GetUserUseCase)
      private getUserUseCase: IGetUserUseCase,
    @inject(Types.GetAllUsersUseCase)
      private getAllUsersUseCase: IGetAllUsersUseCase,
    @inject(Types.DeleteUserUseCase)
      private deleteUserUseCase: IDeleteUserUseCase
  ) {
    super();
  }

  @httpPost(
    '/',
    validateDTO(CreateUserDTO)
  )
  public async create (req: ICustomRequest): Promise<UserEntity> {
    return this.createUserUseCase.execute(
      req.body as CreateUserDTO,
      req.session as UserEntity
    );
  }

  @httpGet('/all')
  public async getAllUsers (req: ICustomRequest): Promise<UserEntity[]> {
    const { searchParameter } = getUserFilter(req, false);
    return this.getAllUsersUseCase.execute(searchParameter);
  }

  @httpGet('/:id')
  public async getUserById (req: ICustomRequest): Promise<UserEntity> {
    return this.getUserUseCase.execute(req.params.id);
  }

  @httpPut(
    '/:id',
    validateDTO(UpdateUserDTO)
  )
  public async updateById (req: ICustomRequest): Promise<UserEntity> {
    return this.updateUserUseCase.execute(
      req.params.id,
      req.body as UpdateUserDTO,
      req.session as UserEntity
    );
  }

  @httpDelete('/:id')
  public async deleteById (req: ICustomRequest): Promise<IHttpActionResult> {
    await this.deleteUserUseCase.execute(
      req.params.id,
      req.session as UserEntity
    );

    return this.ok();
  }
}