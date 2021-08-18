import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.getByEmail(userEmail);

    const decryptPassword = compareSync(userPassword, user.password);

    if (user && decryptPassword) {
      const { _id, name, email } = user;
      return { id: _id, name, email };
    }

    return null;
  }
}
