import { Container } from 'inversify';

import {
  IUserRepository,
  UserRepository,
} from '@core/db/repositories';
import Types from '@core/types';

import {
  UserController,
} from '@modules';
import { CreateUserUseCase, DeleteUserUseCase, GetAllUsersUseCase, GetUserUseCase, ICreateUserUseCase, IDeleteUserUseCase, IGetAllUsersUseCase, IGetUserUseCase, IUpdateUserUseCase, UpdateUserUseCase } from '@src/modules/user/use-cases';

const container: Container = new Container();

// Repositories
container
  .bind<IUserRepository>(Types.UserRepository)
  .to(UserRepository);

// User UseCases
container
  .bind<ICreateUserUseCase>(Types.CreateUserUseCase)
  .to(CreateUserUseCase);
container
  .bind<IUpdateUserUseCase>(Types.UpdateUserUseCase)
  .to(UpdateUserUseCase);
container
  .bind<IGetUserUseCase>(Types.GetUserUseCase)
  .to(GetUserUseCase);
container
  .bind<IGetAllUsersUseCase>(Types.GetAllUsersUseCase)
  .to(GetAllUsersUseCase);
  container
  .bind<IDeleteUserUseCase>(Types.DeleteUserUseCase)
  .to(DeleteUserUseCase);

// Controllers
container
  .bind(UserController)
  .toSelf();

export { container };