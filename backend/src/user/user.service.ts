import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  // In-memory user list for demo purposes only
  private users: User[] = [];

  async register(createUserDto: CreateUserDto): Promise<Omit<User, 'passwordHash'>> {
    const existing = this.users.find(
      (u) => u.email.toLowerCase() === createUserDto.email.toLowerCase(),
    );
    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = this.hashPassword(createUserDto.password);

    const user = new User({
      email: createUserDto.email,
      passwordHash,
      createdAt: new Date(),
    });

    this.users.push(user);

    const { passwordHash: _, ...rest } = user;
    return rest;
  }

  async login(loginUserDto: LoginUserDto): Promise<Omit<User, 'passwordHash'>> {
    const user = this.users.find(
      (u) => u.email.toLowerCase() === loginUserDto.email.toLowerCase(),
    );

    if (!user) {
      throw new UnauthorizedException('Email not found. Please register first.');
    }

    const passwordHash = this.hashPassword(loginUserDto.password);
    if (passwordHash !== user.passwordHash) {
      throw new UnauthorizedException('Invalid password');
    }

    const { passwordHash: _, ...rest } = user;
    return rest;
  }

  private hashPassword(password: string): string {
    // Simple hash for demo – replace with bcrypt in real apps
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}
