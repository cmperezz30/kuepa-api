export class LoginUserDto {

    private constructor(
        public username: string,
        public password: string,
    ){}

    static create( object: { [key: string] : any } ): [string?, LoginUserDto?] {

        const { username, password } = object;

        if(!username) return ['Missing username'];

        if(!password) return ['Missing password'];

        return [undefined, new LoginUserDto(username, password)];

    }

}