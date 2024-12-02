import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { createUserDto } from './dtos/createUser.dto';
import { updateUserProfileDto } from './dtos/updateUser.dto';
import { updateUserRoleDto } from './dtos/updateUserRole.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../guard/auth.guard';
import { PaginationDto } from '../global/dtos/pagination.dto';
import { addUserDto } from './dtos/addUser.dto';
import { registerDto } from 'src/authentication/dtos/register.dto';

@ApiTags('User')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users (Admin)' })
  userList(@Param() pagination: PaginationDto) {
    return this.userService.getAllUsers(pagination);
  }



  @Get('/:id')
  @ApiOperation({ summary: 'Get shop single user (Admin/Pharmasist)' })
  getUserById(@Request() req, @Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create an user (Admin/Pharmasist)',
  })
  createUser(@Body() body: registerDto) {
    return this.userService.createUser(body);
  }

  @Patch('/update-profile')
  @ApiOperation({
    summary: 'Update an user profile (User)',
  })
  updateProfile(
    @Body() body: updateUserProfileDto,
    @Param('userId') userId: string,
  ) {
    return this.userService.updateUserProfile(userId, body);
  }

  @Patch('/update-role')
  @ApiOperation({
    summary: 'Update an user role (Admin)',
  })
  updateUser(@Body() body: updateUserRoleDto) {}

  @Delete('/delete-user/:userId')
  @ApiOperation({
    summary: 'Delete an user (Admin/soft)',
  })
  @ApiParam({ name: 'userId', example: '65fed1cb0b533a481d33a5db' })
  deleteUser(@Param('userId') userId) {
    //console.log(userId);
    if (!userId) throw new NotFoundException('User id is required');
    return userId;
  }

  @Get('/statictis')
  getUserStatictis() {
    return {};
  }

  @Patch('/disable-user')
  desableUser() {
    return '';
  }
}
