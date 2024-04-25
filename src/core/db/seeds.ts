import { getRepository, Repository } from 'typeorm';

import { CreateUserDTO } from '@src/modules/app/user/dtos';
import { CreateAdminDTO } from '@src/modules/backoffice/admin/dtos';
import { getFirstWordFromText } from '@src/shared/utils';

import { getEnv } from '@core/constants';
import { AuthContract, IAuthContract } from '@core/contracts';
import { AdminEntity, UserEntity } from '@core/db/entities';

import { AdminRole, AuthenticateType, RoleType } from '@shared/enumerators';
import { logInfo } from '@shared/logging/console';

const systemAdminToCreate: CreateAdminDTO = {
  name: getEnv().seeds_database_admin_backoffice.name,
  email: getEnv().seeds_database_admin_backoffice.email,
  password: getEnv().seeds_database_admin_backoffice.password,
  document: getEnv().seeds_database_admin_backoffice.document,
  phone: getEnv().seeds_database_admin_backoffice.phone,
  adminRole: AdminRole.MANAGER,
  changePassword: false,
};

const checkAdminSeed = async (id: string, email: string) => {
  const adminRepository: Repository<AdminEntity> = getRepository(AdminEntity);

  const systemUserExists = await adminRepository.findOne({
    where: {
      email,
    },
  });

  if (!systemUserExists) {
    systemAdminToCreate.id = id;
    await adminRepository.save(systemAdminToCreate);
  }
};

const seedAdmin = async () => {
  const authContract: IAuthContract = new AuthContract();

  const username = `${AuthenticateType.BACKOFFICE}_${getFirstWordFromText(systemAdminToCreate.name).toLowerCase()}_${systemAdminToCreate.email}`;

  const userKeycloak = await authContract.getUserByUsername({ username });

  if (!userKeycloak) {
    await authContract.createUser({
      name: systemAdminToCreate.name,
      email: systemAdminToCreate.email,
      password: systemAdminToCreate.password,
      origin: AuthenticateType.BACKOFFICE,
    });

    const { id } = await authContract.getUserByUsername({ username });
    await checkAdminSeed(id, systemAdminToCreate.email);
  }

  logInfo('💽 Database seeds for BACKOFFICE ADMIN has been created successfully!');
};

const systemUserAppToCreate: CreateUserDTO = {
  name: getEnv().seeds_database_user_app.name,
  email: getEnv().seeds_database_user_app.email,
  password: getEnv().seeds_database_user_app.password,
  document: getEnv().seeds_database_user_app.document,
  phone: getEnv().seeds_database_user_app.phone,
  RoleType: RoleType.COMMON,
};

const checkUserAppSeed = async (id: string, email: string) => {
  const userRepository: Repository<UserEntity> = getRepository(UserEntity);

  const systemUserExists = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (!systemUserExists) {
    systemUserAppToCreate.id = id;
    await userRepository.save({
      ...systemUserAppToCreate,
      changePassword: false,
    });
  }
};

const seedUserApp = async () => {
  const authContract: IAuthContract = new AuthContract();

  const username = `${AuthenticateType.APP}_${getFirstWordFromText(systemUserAppToCreate.name).toLowerCase()}_${systemUserAppToCreate.email}`;

  const userKeycloak = await authContract.getUserByUsername({ username });

  if (!userKeycloak) {
    await authContract.createUser({
      name: systemUserAppToCreate.name,
      email: systemUserAppToCreate.email,
      password: systemUserAppToCreate.password,
      origin: AuthenticateType.APP,
    });

    const { id } = await authContract.getUserByUsername({ username });
    await checkUserAppSeed(id, systemUserAppToCreate.email);
  }

  logInfo('💽 Database seeds for USER APP has been created successfully!');
};

export async function seedsDatabase (): Promise<void> {
  await seedAdmin();
  await seedUserApp();

  logInfo('💽 Database seeds has been created successfully!');
}