import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('listar')
  async listar(): Promise<Usuario[]> {
    return this.usuarioService.listar();
  }

  @Post("cadastrar")
  async cadastrar(@Body() data: UsuarioCadastrarDto): Promise<ResultadoDto> {
    console.log(data)
    return this.usuarioService.cadastrar(data)
  }
  @Post("delete/:id")
  async delete(@Param('id') id): Promise<ResultadoDto> {
    return this.usuarioService.delete(id)
  }

  @Post("login")
  async login(@Body() data: {email: string, password: string}): Promise<Usuario | null> {
    return this.usuarioService.login(data.email, data.password)
    
  }

}