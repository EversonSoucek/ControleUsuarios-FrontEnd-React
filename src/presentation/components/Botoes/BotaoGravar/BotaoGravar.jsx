import "./BotaoGravar.css"

export default function BotaoGravar({ children }) {
  return (
    <button 
      className={`botao-gravar`} 
      type='submit' 
    >
      {children}
    </button>
  );
}
