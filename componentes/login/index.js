import InputPublico from "../inputPublico";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Botao from "../botao/index";
import { validarEmail, validarSenha } from "../../utils/validadores";
import imagemEnvelope from '../../public/imagens/envelope.svg';
import imagemChave from '../../public/imagens/chave.svg';
import imagemLogo from '../../public/imagens/logo.svg';
import UsuarioService from "../../services/UsuarioService";

const usuarioService = new UsuarioService();

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const validrFormulario = () => {
        return (
            validarEmail(email)
            && validarSenha
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if (!validrFormulario()) {
            return;
        }

        setEstaSubmetendo(true);

        try {
            await usuarioService.login({
                login: email,
                senha
            });

            //TODO: redirecionar o usuário para home
        } catch (error) {
            alert("Erro ao realizar o login! " + error?.response?.data?.erro);
        }

        setEstaSubmetendo(false);
    }

    return (
        <section className={`paginaLogin paginaPublica`}>
            <div className="logoContainer">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O endereço informado é inválido!"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao="Precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <Botao
                        texto="Login"
                        tipo="submit"
                        desabilitado={!validrFormulario() || estaSubmetendo}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastro">Faça seu cadastro agora.</Link>
                </div>

            </div>
        </section>
    );
}