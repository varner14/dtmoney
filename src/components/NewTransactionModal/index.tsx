import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { UseTransaction } from '../../hooks/useTransactions';

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = UseTransaction();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    resetInputs();
    onRequestClose();
  }

  function resetInputs() {
    setTitle('');
    setAmount(0);
    setType('');
    setCategory('');
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="close" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2> Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          type="number"
        />

        <TransactionTypeContainer>
          <RadioBox
            isActive={type === 'deposit'}
            onClick={() => setType('deposit')}
            activeColor="green"
            type="button"
          >
            <img src={incomeImg} alt="entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            isActive={type === 'withdraw'}
            onClick={() => setType('withdraw')}
            activeColor="red"
            type="button"
          >
            <img src={outcomeImg} alt="saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Categoria "
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
