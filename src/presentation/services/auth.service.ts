import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";





export class AuthService {

    constructor() {}

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existsUser = await UserModel.findOne({
            username: registerUserDto.username
        });


        if (existsUser) throw CustomError.badRequest('Username already exists');

        try {

            const user = new UserModel(registerUserDto);

            //Encriptar contraseña
            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();


            const { password, ...rest } = UserEntity.fromObject(user);


            const token = await JwtAdapter.generateToken({ id: user.id })

            if (!token) throw CustomError.internalServer("Error while creating jwt");

            return {
                user: rest,
                token: token
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const existsUser = await UserModel.findOne({
            username: loginUserDto.username
        });

        if (!existsUser) throw CustomError.badRequest('Username or password not valid');

        const isMatching = bcryptAdapter.compare(loginUserDto.password, existsUser.password);

        if (!isMatching) throw CustomError.badRequest('Username or password not valid');

        const { password, ...userEntity } = UserEntity.fromObject(existsUser);

        const token = await JwtAdapter.generateToken({ id: userEntity.id })

        if (!token) throw CustomError.internalServer("Error while creating jwt");

        return {
            user: userEntity,
            token: token
        }

    }
}