import Input from '../Input/Input';
import AomudarInput from '../../../application/utils/AoMudarInput';
import SelectEstadoCidade from '../SelectEstadoCidade/SelectEstadoCidade';
import { Link } from 'react-router-dom';

export default function FormUsuarios({usuario = {}, setUsuario }) {
	return (
		<>
			<Input nome={"nome"} onChange={(e) => AomudarInput(e, usuario, setUsuario)} valor={usuario.nome}>Nome Completo</Input>
			<Input nome={"email"} onChange={(e) => AomudarInput(e, usuario, setUsuario)} valor={usuario.email}>E-mail</Input>
			<Input comprimentoExato={11} nome={"telefone"} mask="(99) 99999-9999" onChange={(e) => AomudarInput(e, usuario, setUsuario)} valor={usuario.telefone}>Telefone</Input>
			<SelectEstadoCidade usuario={usuario} setUsuario={setUsuario} />
			<Link to={"/"}>Cancelar</Link>
		</>
	);
}
