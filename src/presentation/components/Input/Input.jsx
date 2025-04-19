import { formatarTelefone } from "../../../application/utils/formatarTelefone";

export default function Input({ children, nome, onChange, valor }) {
    const handleChange = (e) => {
        let value = e.target.value;
        if (nome === "telefone") {
            value = formatarTelefone(value);
        }
        onChange({ target: { name: nome, value } });
    };

    return (
        <input
            placeholder={children}
            type="text"
            name={nome}
            onChange={handleChange}
            value={valor || ''}
            required
        />
    );
}
