 import { Injectable, Inject, Body } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  
  async login(email: string, password: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({where:{email}});
    if (usuario && bcrypt.compareSync(password, usuario.senha)) {
      return usuario;
    }
    return null;
  }



  async cadastrar( data: UsuarioCadastrarDto): Promise<ResultadoDto> {
    let usuario = new Usuario();
    usuario.nome = data.user;
    usuario.email = data.email;
    usuario.senha = bcrypt.hashSync(data.password, 8);

    return this.usuarioRepository.save(usuario)
    
    .then((result) => {
        return <ResultadoDto>{
            status: true,
            message: "Cadastrado com sucesso!",
        }
    }).catch((error) => {
        return <ResultadoDto>{
            status: false,
            message: "Houve um erro no cadastro!",
        }
    }  )
  }

  
  async delete(id: number): Promise<ResultadoDto> {
    return this.usuarioRepository.delete(id)
      .then((result) => {
          return <ResultadoDto>{
              status: true,
              message: "Deletado com sucesso!",
          }
      }).catch((error) => {
          return <ResultadoDto>{
              status: false,
              message: "Houve um erro na dele o!",
          }
      }  )
  }

}