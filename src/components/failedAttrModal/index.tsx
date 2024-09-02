import * as Styles from './styles';
import X from '../../assets/icons/x.svg'
import checkMark from '../../assets/icons/multiply 1.svg'
import { useNavigate } from 'react-router-dom';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

function FailedAttrModal({ onClose, isOpen }: DeleteModalProps){
    const navigate = useNavigate();
    return(
        <Styles.MainContainer>
        <Styles.Overlay onClick={() => navigate('/home')} />
        <Styles.ModalContainer>
          <Styles.CloseButton onClick={() => navigate('/home')} src={X} />
          <Styles.Title>Falha ao atribuir!</Styles.Title>
          <Styles.FakeBorder></Styles.FakeBorder>
            <img src={checkMark} alt="Um círculo com sinal de falha." width={160} height={180} style={{ marginBottom: '2rem', marginTop: '2rem' }}/>
            <h2>Erro: 500</h2>
            <p>Informe esse código ao suporte!</p>
            <Styles.FakeBorder></Styles.FakeBorder>
          <Styles.Buttons>
            <Styles.ReturnBtn onClick={() => navigate('/home')}>
              OK!
            </Styles.ReturnBtn>
          </Styles.Buttons>
        </Styles.ModalContainer>
      </Styles.MainContainer>
    )
}

export default FailedAttrModal;