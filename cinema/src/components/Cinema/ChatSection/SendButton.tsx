interface SendButtonProps {
  onSubmit: () => void;
  isDisabled: boolean;
}

const SendButton = ({ onSubmit, isDisabled }: SendButtonProps) => {
  return (
    <button onClick={onSubmit} disabled={isDisabled} className="chat__send__btn">
      Send
    </button>
  );
};

export default SendButton;
