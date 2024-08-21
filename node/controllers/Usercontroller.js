import bcrypt from "bcrypt";


export const autenticar = async (req, res) => {
    const { Cor_User, password } = req.body;

    // Comprobar si el user existe
    const user = await UserModel.findOne({
        where: { Cor_User: Cor_User }
    });

    if (!user) {
        const error = new Error("El user no existe o contraseña no valida!");
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar si el user esta confirmado
    if (!user.Confirmado) {
        const error = new Error("Tu cuenta no está confirmada!");
        return res.status(403).json({ msg: error.message });
    }

    // Comprobar password
    if (await user.comprobarPassword(password)) {
        const userString = user.Id_User.toString();
        const Id_UserHash = Buffer.from(userString).toString('base64');

        // console.log(Id_UserHash);

        res.json({
            Id_User: user.Id_User,
            Nom_User: user.Nom_User,
            Cor_User: user.Cor_User,
            token: generarJWT(Id_UserHash)
        });
    } else {
        const error = new Error("La contraseña es incorrecta o el correo no es valido!");
        return res.status(403).json({ msg: error.message });
    }
};