
type SetMessageInputProps = { message: string; setMessage(e: string): void; onSubmit(): void };

const SetMessageInput = ({ message, setMessage, onSubmit }: SetMessageInputProps) => {
  return (
    <input
      type="text"
      placeholder="Type here"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyUp={(e) => {
        if (e.code === "Enter") {
          onSubmit();
        }
      }}
      className="chat__send__input"
    />
  );
};

export default SetMessageInput;
