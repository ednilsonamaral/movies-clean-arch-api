import { Container } from 'inversify';

import {
  IMovieRepository,
  IUserRepository,
  MovieRepository,
  UserRepository,
} from '@core/db/repositories';
import Types from '@core/types';

import {
  MovieController,
  UserController,
} from '@modules';
import { CreateUserUseCase, DeleteUserUseCase, GetAllUsersUseCase, GetUserUseCase, ICreateUserUseCase, IDeleteUserUseCase, IGetAllUsersUseCase, IGetUserUseCase, IUpdateUserUseCase, UpdateUserUseCase } from '@modules/user/use-cases';
import { GetAllMovieUseCase, GetMovieUseCase, IGetAllMovieUseCase, IGetMovieUseCase } from '@modules/movie/use-cases';

const container: Container = new Container();

// Repositories
container
  .bind<IUserRepository>(Types.UserRepository)
  .to(UserRepository);
container
  .bind<IMovieRepository>(Types.MovieRepository)
  .to(MovieRepository);

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

// Movie UseCases
container
  .bind<IGetAllMovieUseCase>(Types.GetAllMovieUseCase)
  .to(GetAllMovieUseCase);
container
  .bind<IGetMovieUseCase>(Types.GetMovieUseCase)
  .to(GetMovieUseCase);
  
// Controllers
container
  .bind(UserController)
  .toSelf();
container
  .bind(MovieController)
  .toSelf();

export { container };