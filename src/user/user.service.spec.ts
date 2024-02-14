/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue({
        create: jest.fn((mockDto: CreateUserDto) => {
          return {
            ...mockDto,
            _id: 'id',
          };
        }),
        findById: jest.fn((id: string) => {
          return {
            authId: 'asdas',
            location: 'asdasd',
            name: 'Guido',
            pets: [{}],
            phone: 3764156622,
          };
        }),
        findByIdAndUpdate: jest.fn(
          (id: string, updateUserDto: UpdateUserDto) => {
            return true;
          },
        ),
        findByIdAndDelete: jest.fn((id: string) => {
          return true;
        }),
      })
      .compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create an User in database', async () => {
    const mockUser: CreateUserDto = {
      authId: 'asdas',
      location: 'asdasd',
      name: 'Guido',
      pets: [{}],
      phone: 3764156622,
    };
    jest.spyOn(userModel, 'create');
    const user = await service.create(mockUser);
    expect(userModel.create).toHaveBeenCalled();
    expect(user).toEqual({ userId: 'id' });
  });
  it('should pets of a user', async () => {
    jest.spyOn(userModel, 'findById');
    const pets = await service.findAllPetsByUserId('id');
    expect(userModel.findById).toHaveBeenCalled();
    expect(pets).toEqual({ pets: [{}] });
  });
  it('should return an User', async () => {
    const mockUser: CreateUserDto = {
      authId: 'asdas',
      location: 'asdasd',
      name: 'Guido',
      pets: [{}],
      phone: 3764156622,
    };
    jest.spyOn(userModel, 'findById');
    const user = await service.findOne('id');
    expect(userModel.findById).toHaveBeenCalled();
    expect(user).toEqual(mockUser);
  });
  it('should update an User', async () => {
    const update: UpdateUserDto = {
      location: 'los angeles',
    };
    jest.spyOn(userModel, 'findByIdAndUpdate');
    const response = await service.update('id', update);
    expect(userModel.findByIdAndUpdate).toHaveBeenCalled();
    expect(response).toEqual({ msg: 'Update success' });
  });
  it('should delete an User', async () => {
    jest.spyOn(userModel, 'findByIdAndDelete');
    const response = await service.remove('id');
    expect(userModel.findByIdAndDelete).toHaveBeenCalled();
    expect(response).toEqual({ msg: 'Delete success' });
  });
});
